import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../context/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    
    e.preventDefault();
  
    onUpdateUser({
      name,
      about: description
    });
  }
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  return (
      <PopupWithForm  title="Редактировать профиль" name="edit" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading}>
        <div className="popup__input">
          <input value={name}  onChange={handleChangeName} id="name" className="popup__field popup__field_type_name" name="name" type="text" placeholder="Введите имя" minLength="2" maxLength="40" required />
          <span className="popup__input-error name-error" />
        </div>
        <div className="popup__input">
          <input value={description} onChange={handleChangeDescription} id="about" className="popup__field popup__field_type_description" name="about" type="text" placeholder="Укажите кем работаете" minLength="2" maxLength="200" required />
          <span className="popup__input-error about-error" />
        </div>
      </PopupWithForm>
  );
}


export default EditProfilePopup;

