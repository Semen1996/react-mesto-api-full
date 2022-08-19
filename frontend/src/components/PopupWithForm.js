import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, children, onSubmit, isLoading}) {
    
  return (
    <div id="editButton" className={`popup popup_${name} ${isOpen && 'popup_opened'}`} >
      <form className={`popup__container popup__container_${name}`} name="profile-form" onSubmit={onSubmit} noValidate>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="popup__submitButton" type="submit">{isLoading ? 'Сохранить...' : 'Сохранить'}</button>
        <button className="popup__close" type="button" aria-label="Закрыть попап"  onClick={onClose}></button>
      </form>
    </div>
  );
}
  
export default PopupWithForm;
