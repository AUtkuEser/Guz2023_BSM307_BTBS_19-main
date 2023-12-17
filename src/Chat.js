import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import withAuth from './withAuth';


const Chat = ({ username }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    setSocket(socket);

    socket.on('receiveGroupMessage', ({ message }) => {
      updateMessages(message);
    });

    socket.on('receivePrivateMessage', ({ message }) => {
      updateMessages(message);
    });

    socket.on('updateUserList', ({ userList }) => {
      setOnlineUsers(userList);
      console.log(userList);
    });

    return () => {
      socket.disconnect();
    };
  }, [username]);

  const updateMessages = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      if (selectedUser) {
        const recipient = selectedUser;
        socket.emit('privateMessage', { recipient, message: messageInput });
      } else {
        socket.emit('groupMessage', { room: 'defaultRoom', message: messageInput });
      }

      updateMessages(`You: ${messageInput}`);
      setMessageInput('');
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <div id="sidebar">
        <h2>Online Users</h2>
        <ul id="online-users">
          {onlineUsers.map((user) => (
            <li
              key={user}
              className={user === selectedUser ? 'active' : ''}
              onClick={() => handleUserClick(user)}
            >
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div id="chat-container">
        <div id="messages">
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div id="message-input">
          <input
            type="text"
            id="message"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Chat);
