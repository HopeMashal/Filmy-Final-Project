import React, {useRef,useState,useEffect} from 'react'
import { useHistory } from 'react-router';
import BackEndAPI from '../../apis/api';

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

import './forgetPassword.css'

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

export default function ForgetPassword() {
  const history = useHistory();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const [curruser,setCurrUser] = useState(null);

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
