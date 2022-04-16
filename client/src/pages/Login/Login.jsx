import React,{useRef,useContext} from 'react';

import { loginCall } from '../../apis/apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from "@material-ui/core"
import { useHistory } from 'react-router';

import { useTranslation } from 'react-i18next'

import './login.css'

export default function Login() {
  const email = useRef();
  const password = useRef();
  const history = useHistory();
  const {user,isFetching,dispatch} = useContext(AuthContext)

  const { t } = useTranslation()

  const handleClick=(e)=>{
    e.preventDefault();
    loginCall({email:email.current.value, password:password.current.value},dispatch)
  }
  const buttonClick =() =>{
    history.push("/register")
  }

  const ForgetClick =() =>{
    history.push("/forget")
  }

  console.log(user)
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
            <input type="email" required ref={email} placeholder={t('enter-email')} className='loginInput'/>
            <input type="password" minLength="8" required ref={password} placeholder={t('enter-password')} className='loginInput'/>
            <button className='loginButton' type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px"/> : `${t('login-text')}`}</button>
            <span className='loginForgot' onClick={ForgetClick}>{t('forgot-pass-text')}</span>
            <hr className='HrLogin'/>
            <button className='loginRegisterButton' onClick={buttonClick}>{isFetching ? <CircularProgress color="inherit" size="20px"/> : `${t('create-acc-text')}`}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
