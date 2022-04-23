import React,{useState,useContext} from 'react';

import { login } from '../../apis/apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router';

import { useTranslation } from 'react-i18next'

import './login.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  const { t } = useTranslation()

  const handleClick=(e)=>{
    e.preventDefault();
    login({ email, password }, dispatch);
  }
  const buttonClick =() =>{
    history.push("/register")
  }

  const ForgetClick =() =>{
    history.push("/forget")
  }

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <div className='loginLeftIcon'>
            <img className='LoginIcon' src="/logo-icon-light.svg"  alt="LoginIcon"/>
          </div>
          <div className='loginLeftText'>
            <h3 className='loginLogo'>{t('app_title')}</h3>
            <p className='loginDesc'>
              {t('disc-logo-text')}
            </p>
          </div>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input type="email" required onChange={(e) => setEmail(e.target.value)} placeholder={t('enter-email')} className='loginInput'/>
            <input type="password" minLength="8" required onChange={(e) => setPassword(e.target.value)} placeholder={t('enter-password')} className='loginInput'/>
            <button className='loginButton' type="submit">{t('login-text')}</button>
            <span className='loginForgot' onClick={ForgetClick}>{t('forgot-pass-text')}</span>
            <hr className='HrLogin'/>
            <button className='loginRegisterButton' onClick={buttonClick}>{t('create-acc-text')}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
