import React from 'react';
import {CurrentUserContext} from '../context/CurrentUserContext';


function Card({card, onCardClick, onCardLike, onCardDelete}) {


  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const handleLikeClick = () => {
    onCardLike(card);
  };


  const handleDeleteClick = () => {
    onCardDelete(card);
  };

    const handleClick = () => {
        onCardClick(card);
    }

  return (
          <div id="element">
            <article className="element">
              <img className="element__picture" src={card.link} alt={card.name} onClick={handleClick} />
              { isOwn && 
                (<button className="element__dump" type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>)
              }
              <div className="element__menu">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__likes">
                  <button className={ `element__like ${isLiked && `element__like_active`}` } type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
                  <p className="element__number-of-likes">{card.likes.length}</p>
                </div>
              </div>
            </article>
          </div>
  );
}

export default Card;
