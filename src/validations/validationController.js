/*import { useRef, useState, useEffect } from "react";

const USER_REGEX =  /^[a-zA-Z][a-zA-Z-0-9]{3,16}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8-32}$/;

const Register = () => { 
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState (false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState (false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState (false);

    const [errMsg, setErrMsg] = useState ('');
    const [success, setSuccess] = useState (false);

    useEffect (() => {
        useRef.current.focus(); 
    }, [])

    useEffect (() => {
        const result = USER_REGEX.test(user);
        console.log(result); 
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect (() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result); 
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect (() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    return (
        <div>

        </div>
    )
}
export default Register;
*/