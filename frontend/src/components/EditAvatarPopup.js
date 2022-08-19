import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../context/CurrentUserContext';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const currentUser = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = React.useState(currentUser.avatar);

  const avatarInputRef = React.useRef(null);
  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]); 

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value
    });
  }

  return (
    <PopupWithForm  title="Обновить аватар" name="updateAvatar" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} >
      <div className="popup__input">
        <input id="avatar" className="popup__field popup__field_type_avatar" name="avatar" type="url" placeholder="Ссылка на картинку" required ref={avatarInputRef} />
        <span className="popup__input-error avatar-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

