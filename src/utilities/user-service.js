import * as usersAPI  from './users-api';

export async function signUp(userData) {
  // Delete the network request code to the
  // users-api.js module which will ultimately
  // return the JWT
  const token = await usersAPI.signUp(userData);
  // Persist the token to localStorage
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  // Persist the token to localStorage
  localStorage.setItem('token', token);
  return getUser();
}

export function getToken() {
  const token = localStorage.getItem('token');
  // getItem will return null if no key
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's expiration is expressed in seconds, not miliseconds
  if (payload.exp < Date.now() / 1000) {
    // Token has expired
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
  localStorage.removeItem('token');
}
















/*
export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem("token")
  if (!token) return null
  // Obtain the payload of the token


  // const tokenPayloadStr = token.split('.')[1]
  // const decodedPayload = atob(tokenPayloadStr)
  // const parsedPayload = JSON.parse(decodedPayload)
  const payload = JSON.parse(atob(token.split('.')[1]));

  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token')
    return null
  }
  return token
}


export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
  localStorage.removeItem('token')
}

export function checkToken() {
  // Just so that you don't forget how to use .then
  return usersAPI.checkToken()
    // checkToken returns a string, but let's
    // make it a Date object for more flexibility
    .then(dateStr => new Date(dateStr));
}

//Add Service & API Modules for the Client
/**
 * Utility modules: Modules that hold general purpose functions, for example, a formatTime(seconds)function. These modules are reusable in multiple projects.
Service modules: Service modules are where we can organize application specific logic such as functions for 
signing-up or logging in a user. Service modules often use and depend upon API modules...
API modules: API modules are for abstracting logic that make network requests such as AJAX calls to the backend 
or third-party APIs. This abstraction makes it easier to refactor code to use different techniques, libraries, etc. 
For example, we are going to be using fetchfor our AJAX communications, however, refactoring to use a library such as Axios would 
be made easy thanks to the use of API modules.
 */

// users-service.js

// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from
/*import * as usersAPI from './users-api'

export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)

    const token = await usersAPI.signUp(userData);
    // Baby step by returning whatever is sent back by the server

    // Persist the "token"
    localStorage.setItem('token', token)
    return getUser()
  }

  export async function login(credentials) {

    const token = await usersAPI.login(credentials)
  
    localStorage.setItem("token", token)
    return getUser()
  }


  export function getToken() {
    // getItem returns null if there's no string

   const token = localStorage.getItem('token');
      if (!token) return null;
// Obtain the payload of the token
  const payload = JSON.parse(atob(token.split('.')[1]));
// A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
  // Token has expired - remove it from localStorage
      localStorage.removeItem('token');
    return null;
    }
    return token;
}

    export function getUser() {
    const token = getToken();
// If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }

  export function logOut() {
    localStorage.removeItem('token')
  }

  export function checkToken() {
    // Just so that you don't forget how to use .then
    return usersAPI.checkToken()
      // checkToken returns a string, but let's
      // make it a Date object for more flexibility
      .then(dateStr => new Date(dateStr));
  }
  */