/* const customFetch = (url, options, body = {}) => {
  return fetch(url, options, body)
    .then((res) => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log);
} */

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }



  getCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
    };

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then((res) => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  };

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  };

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  };

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  };

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
    };

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'ca5a3c83-c808-4b2d-aa04-cb48fd881373',
    'Content-Type': 'application/json'
  }
});
