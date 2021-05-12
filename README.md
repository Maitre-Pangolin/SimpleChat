# Simple Chat App

Small project to learn about [Express](https://expressjs.com/fr/), [Socket.io](https://socket.io/) and [Heroku](https://www.heroku.com/home) deployment process.

Goal is to build a real-time chat application with basic functionnality :

- Mandatory name logging prior posting 
- Broadcasting to everybody connected
- List of logged users
- No room functionnality
- No data persistance
- Random username generation via own npm library

## Deployment

Deployment is done via Heroku from main branch of this repository at the following adress : https://maitre-pangolin-simple-chat.herokuapp.com/

## Running locally

Make sure you have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed

    $ git clone https://github.com/Maitre-Pangolin/SimpleChat.git
    $ cd SimpleChat
    $ npm install
    $ npm start

App should be accessible on local port 3000.



## What was learned

### Back-end

- Basic implementation of socket.io with an express server
- Socket emit and broadcast event behavior on server and client side

### Front-end

- First use of flex display (trial and error)
- Basic use of HTML forms.