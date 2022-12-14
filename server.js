const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// Always require and configure near the top
require('dotenv').config()
require('./config/database')
//express uses require to communicate within backend werver because it is the server

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route

app.use('/api/users', require('./routes/api/users'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log(`Express app running on port ${PORT}`)
})

/**
 * Note: Since this route is a "catch all" that matches every GETrequest, be sure to mount API or other routes before it!

Now the "catch all" route will serve the index.html whenever:

A user types a path into the address bar and presses enter.
The user refreshes the browser.
An "external" link in an email, included on another web page, etc. to the MERN-Stack app is clicked.
For example, if we slack the following link to a friend: https://sei-cafe.herokuapp.com/orders/new. The friend clicks on it, initiating an HTTP request to our server.

However, the /orders/newpart of the URL is supposed to be for the client router - not the server! But there it is, and the server has to deal with it...

The server deals with it by, thanks to the "catch all" route, sending back index.html - which is what we want.

After index.html loads in the browser, the React app's client-side routing will render components based upon the /orders/newpath in the address bar.
 */