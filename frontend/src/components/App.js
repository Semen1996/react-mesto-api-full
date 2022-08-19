import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup  from './EditProfilePopup';
import EditAvatarPopup  from './EditAvatarPopup';
import AddPlacePopup  from './AddPlacePopup';

import api from '../utils/Api.js';
import {CurrentUserContext} from '../context/CurrentUserContext';

import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import {register, authorize, validationToken} from '../utils/auth.js'

function App() {

  const [currentUser,setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const history = useHistory();

  React.useEffect( () => {
    if (loggedIn) {
      Promise.all( [api.getUserInfo(), api.getInitialCards()] )
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      }
  },[loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  },[]);

  // Попап редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(userInfo) {

    setIsLoading(true);

    api.editUserInfo(userInfo)
      .then((userData)=>{
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Попап редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleUpdateAvatar(userAvatar) {

    setIsLoading(true);

    api.updateAvatar(userAvatar)
      .then((userData)=>{
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Попап добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Попап картинки
  function handleSelectedCard(card) {
    setSelectedCard(card);
  }

  // Закрытие всех попапов 
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  // Работа с карточками
  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    ( isLiked ? api.deleteLikeCard(card._id) : api.addLikeCard(card._id) )
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  function handleCardDelete(card) {

    api.deleteCard(card._id)
      .then(() => {
        const deleteCards = cards.filter((c) => c._id !== card._id);
        setCards(deleteCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  } 

  function handleAddPlaceSubmit(newCard) {

    setIsLoading(true);

    api.addCard(newCard)
      .then((newCard)=>{
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      validationToken(jwt)
      .then((res) => {
        if (res){
          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  function onRegister(email,password) {
    register(email,password)
      .then((res) => {
        console.log(res)
        if(res) {
          setMessage(true);
          history.push('/sign-in');
        }
      })
      .catch(() => {
        setMessage(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function onLogin(email,password) {
    authorize(password, email)
    .then((data) => {
      if(data.token) {
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/');
      } else {
        setMessage(false);
        setIsInfoTooltipOpen(true);
      }
    })
    .catch(err => {
      console.log(err);
      setMessage(false);
      setIsInfoTooltipOpen(true);
    });
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={userEmail}/>
        <Switch>
          <ProtectedRoute
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleSelectedCard}
            cards={cards}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            component={Main}
            exact path="/"
            loggedIn={loggedIn}
          />
          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
          <Route exact path= "/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} /> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} isLoading={isLoading} /> 
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} /> 
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} status={message} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

