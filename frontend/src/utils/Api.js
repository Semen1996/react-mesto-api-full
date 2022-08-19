class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Проверка на ошибку со связью с сервером
  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  // Получение с сервера начальных карточек, которые есть на сервере
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
      })
      .then(res => this._parseResponse(res));
  }

  // Получение с сервера информации о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'GET',
    headers: this._headers
    })
    .then(res => this._parseResponse(res));
  }

  // Редактирование информации о пользователе на сервере
  editUserInfo(dataForm) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataForm.name,
        about: dataForm.about
      })
    })
    .then(res => this._parseResponse(res));
  }

  // Добавление карточки на сервер
  addCard(dataForm) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: dataForm.name,
          link: dataForm.link
        })
      })
      .then(res => this._parseResponse(res));
  }
  
  // Удалить карточку на сервере
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._parseResponse(res));
  }

  addLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res => this._parseResponse(res));
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._parseResponse(res));
  }

  updateAvatar(dataForm) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataForm.avatar
      })
    })
      .then(res => this._parseResponse(res));
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '92685e82-98a8-415b-ab9c-1926b21a9a8f',
    'Content-Type': 'application/json'
  }
});

export default api;

