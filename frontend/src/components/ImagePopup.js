import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className= {`popup popup_image ${card !== null && 'popup_opened'}`}>
      <figure className="popup__figure">
        <img className="popup__picture" src={card !== null ? card.link : '' } alt={card !== null ? card.name : ''} />
        <figcaption className="popup__figcaption">{card !== null ? card.name :  '' }</figcaption>
        <button className="popup__close popup__close_image" type="button" aria-label="Закрыть попап" onClick={onClose}></button>
      </figure>
    </div>
  );
}
  
export default ImagePopup;
