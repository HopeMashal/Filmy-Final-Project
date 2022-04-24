import React, {useRef} from 'react'
import BackEndAPI from '../../apis/api';

import { useTranslation } from 'react-i18next'

import './forgetPassword.css'

export default function ForgetPassword() {
  const useremail = useRef();

  const { t } = useTranslation()
  
  const handleClick= async (e)=>{
    e.preventDefault();
      const email =useremail.current.value;
      try{
        const userInf ={
          email : email,
        }
        await BackEndAPI.post("/users/forgotPassword" , userInf); 
        const box=document.querySelector('.forgetRight');
        box.innerHTML=`<div class='forgetBox' style='text-align: center;'><h1>${t('check-email')}</h1></div>`
      } catch (e){
        console.log(e)
      }
  }

  return (
    <div className='forget'>
      <div className='forgetWrapper'>
        <div className='forgetLeft'>
          <div className='forgetLeftIcon'>
            <img className='forgetIcon' src="/logo-icon-light.svg" alt="LoginIcon"/>
          </div>
          <div className='forgetLeftText'>
            <h3 className='forgetLogo'>{t('app_title')}</h3>
            <p className='forgetDesc'>
            {t('disc-logo-text')}
            </p>
          </div>
        </div>
        <div className="forgetRight">
          <form className="forgetBox" onSubmit={handleClick}>
            <h1 style={{'text-align': 'center'}}>{t('password-reset')}</h1>
            <input placeholder={t('enter-email')} required ref={useremail}  className='forgetInput'/>
            <h6>{t('share-email')}</h6>
            <button className='forgetButton' type="submit">{t('submit')}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
