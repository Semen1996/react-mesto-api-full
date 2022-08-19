export const BASE_URL = 'https://auth.nomoreparties.co';

// Проверка на ошибку со связью с сервером
function parseResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email,password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password,email})
    })
    .then(res => { return parseResponse(res) });
  };

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
    .then((response => response.json()))
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      return data;
    })
    .catch(err => console.log(err))
};

export const validationToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then( res => { return parseResponse(res) });
}