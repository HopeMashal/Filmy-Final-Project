import React,{useEffect, useRef} from 'react';
import { useHistory } from 'react-router';
import BackEndAPI from '../../apis/api';

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

import './register.css'

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    country_code: 'sa',
  },
  {
    code: 'hr',
    name: 'עִברִית',
    dir: 'rtl',
    country_code: 'il',
  },
]


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation()

  useEffect(() => {
    console.log('Setting page stuff')
    document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])

  const handleClick= async (e)=>{
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("PASSWORDS DONT MATCH!!!")
    } else {
      const user ={
        name : username.current.value,
        email : email.current.value,
        password : password.current.value
      }
      try{
        await BackEndAPI.post("/users", user);
        history.push("/login")
      } catch (e){
        console.log(e)
      }
    }
  }
  const buttonClick =() =>{
    history.push("/login")
  }
  return (
    <div className='register'>
      <div className='registerWrapper'>
        <div className='registerLeft'>
          <div className='registerLeftIcon'>
            <img className='registerIcon' src="/logo-icon-light.svg" alt="LoginIcon"/>
          </div>
          <div className='registerLeftText'>
            <h3 className='registerLogo'>{t('app_title')}</h3>
            <p className='registerDesc'>
              {t('disc-logo-text')}
            </p>
          </div>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input placeholder={t('enter-name')} required ref={username} className='registerInput'/>
            <input type="email" placeholder={t('enter-email')} required ref={email} className='registerInput'/>
            <input type="password" placeholder={t('enter-password')} minLength="8" required ref={password} className='registerInput'/>
            <input type="password" placeholder={t('enter-repeat-pass')} required ref={passwordAgain} className='registerInput'/>
            <button className='registerButton' type="submit">{t('signup-text')}</button>
            <button className='registerLoginButton' onClick={buttonClick}>{t('log-into-account-text')}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
