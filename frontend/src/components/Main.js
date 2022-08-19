import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../context/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, handleCardLike, handleCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} >
            <div className="profile__hover"></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__editButton" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div> 
        <button className="profile__addButton" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>
      <section className="elements">

      { cards.map((card) => (
          <Card  key={card._id} card={card} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        )) 
      }

      </section>
    </main>
  );
}

export default Main;
