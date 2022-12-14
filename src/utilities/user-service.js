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
import * as usersAPI from './users-api'

export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)

    const token = await usersAPI.signUp(userData);
    // Baby step by returning whatever is sent back by the server
    return token;
  }