import React, {useRef,useState} from 'react'
import { useHistory } from 'react-router';
import BackEndAPI from '../../apis/api';

import { useTranslation } from 'react-i18next'

import './forgetPassword.css'

export default function ForgetPassword() {
  const history = useHistory();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const [curruser,setCurrUser] = useState(null);

  const { t } = useTranslation()
  
  const handleClick= async (e)=>{
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("PASSWORDS DONT MATCH!!!")
    } else {
      const user =username.current.value;

      try{
        const res=await BackEndAPI.get("/users?username="+user); //! Fixed it
        setCurrUser(res.data)
        const Id=curruser._id;
        const userInf ={
          userId : Id,
          password : password.current.value
        }
        await BackEndAPI.put("/users/"+Id , userInf); //! Fixed it
        history.push("/login")
      } catch (e){
        console.log(e)
      }
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
            <input placeholder={t('enter-name')} required ref={username}  className='forgetInput'/>
            <input type="password" placeholder={t('enter-new-password')} minLength="8" required ref={password} className='forgetInput'/>
            <input type="password" placeholder={(t('enter-new-repeat-pass'))} required ref={passwordAgain} className='forgetInput'/>
            <button className='forgetButton' type="submit">{t('change-pass')}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
