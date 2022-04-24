import React, {useRef} from 'react'
import { useHistory } from 'react-router';
import BackEndAPI from '../../apis/api';
import { useParams } from 'react-router';

import { useTranslation } from 'react-i18next'

import './restPassword.css'

export default function RestPassword() {
  const history = useHistory();
  const password = useRef();
  const passwordAgain = useRef();
  const token=useParams().token;

  const { t } = useTranslation()
  
  const handleClick= async (e)=>{
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("PASSWORDS DONT MATCH!!!")
    } else {
      try{
        const userInf ={
          password : password.current.value
        }
        await BackEndAPI.put("/users/resetPassword/"+token , userInf);
        history.push("/login")
      } catch (e){
        console.log(e)
      }
    }
  }

  return (
    <div className='rest'>
      <div className='restWrapper'>
        <div className='restLeft'>
          <div className='restLeftIcon'>
            <img className='restIcon' src="/logo-icon-light.svg" alt="LoginIcon"/>
          </div>
          <div className='restLeftText'>
            <h3 className='restLogo'>{t('app_title')}</h3>
            <p className='restDesc'>
            {t('disc-logo-text')}
            </p>
          </div>
        </div>
        <div className="restRight">
          <form className="restBox" onSubmit={handleClick}>
            <h1 style={{'text-align': 'center'}}>{t('password-reset')}</h1>
            <input type="password" placeholder={t('enter-new-password')} minLength="8" required ref={password} className='restInput'/>
            <input type="password" placeholder={(t('enter-new-repeat-pass'))} required ref={passwordAgain} className='restInput'/>
            <button className='restButton' type="submit">{t('change-pass')}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

