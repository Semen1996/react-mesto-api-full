import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

function Header({userEmail}) {
  const locationPath = useLocation().pathname;

  const isSignIn= locationPath === '/sign-in';
  const isSignUp= locationPath === '/sign-up';

  const history = useHistory();

  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }
  
  return (
    <header className="header">
      <div className="header__logo logo"></div>
      { 
        isSignIn ? <Link className="header__button" to="/sign-up">Регистрация</Link> 
        : isSignUp ? <Link className="header__button" to="/sign-in">Войти</Link> 
        : 
        <div className="header__button-email">
          <p className="header__button">{userEmail}</p>
          <button className="header__button" onClick={signOut}>Выйти</button>
        </div>
      }
    </header>
  );
}
  
export default Header;
