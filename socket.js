
module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

socket.on('message', ({ data, username }) => {
  console.log(data, username);
  io.emit('message', `${username.substring(0, 5)}: ${data}`);
});

socket.on('privateMessage', handlePrivateMessage(socket, io));

socket.on('groupMessage', handleGroupMessage(socket, io));

socket.on('setUsername', handleSetUsername(socket));

socket.on('disconnect', handleDisconnect(socket));

async function handlePrivateMessage(socket, io) {
  return async ({ recipient, message }) => {
    try {
      const recipientSocket = await findOneRecipient(recipient);

      if (recipientSocket) {
        recipientSocket.emit('receivePrivateMessage', { sender: socket.username, message });
      } else {
        console.warn(`Recipient ${recipient} not found`);
      }
    } catch (error) {
      console.error('Error handling private message:', error);
    }
  };
}

function findOneRecipient(recipient) {
  return new Promise((resolve) => {
    const recipientSocket = Object.values(io.sockets.sockets).find((s) => s.username === recipient);
    resolve(recipientSocket || null);
  });
}

function handleGroupMessage(socket, io) {
  return ({ room, message }) => {
    io.to(room).emit('receiveGroupMessage', { user: socket.username, message });
  };
}

function handleSetUsername(socket) {
  return ({ username }) => {
    socket.username = username;
  };
}

function handleDisconnect(socket) {
  return () => {
    console.log(`${socket.id} disconnected`);
  };
}
});
};