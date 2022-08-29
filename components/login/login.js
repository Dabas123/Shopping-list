import styles from './login.module.css';
import { useState } from 'react';

export default function Login({ loginHandle }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    function handleInput(e) {
        if(e.target.name === "username"){
            setUserName(e.target.value);
        }
        else if(e.target.name === "password"){
            setPassword(e.target.value);
        }
    }  
    
    function handleInputCheckBox(e) {
        if(e.target.name === "showpassword"){
            setShowPassword(e.target.checked);
        }
    }  

    function handleLoginButton(e) {
        loginHandle(userName, password);
    }

    return (
        <div className={styles.appmain}>
            <label className={styles.caption}>Login</label>
            <div>
                <label>UserName</label>
                <input className={styles.username}
                type='text'
                    name='username'
                    value={userName}
                    onChange={handleInput}
                />
            </div>
            <div>
                <label>Password</label>
                    <input className={styles.password}
                type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={password}
                    onChange={handleInput}
                />
                <input className={styles.showpassword}
                    type="checkbox"
                    name='showpassword'
                    value={showPassword}
                    onChange={handleInputCheckBox} 
                />
            </div>
            <div>
                <button name="loginbtn" onClick={handleLoginButton}>Login</button>
            </div>
        </div>
    );
}