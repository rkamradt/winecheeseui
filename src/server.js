/*
 * Copyright 2015 randalkamradt.
 *
 */

export default class Server {
  constructor(accessToken) {
    this.accessToken = accessToken
  }

  readList() {
      fetch(process.env.REACT_APP_SERVER_URL + '/api', {
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json',
          authorization: `Bearer ${this.accessToken}`
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      })
      .then(function(response) {
        const contentType = response.headers.get("Content-Type")
        if(contentType && contentType.includes("application/json")) {
          return response.json()
        }
        throw new TypeError("Oops, we haven't got JSON!")
      })
      .then(json => console.log(json))
      .catch(error => this.controller.error('error getting list from server error = ' + error, 'could not contact server'))
    }
}
