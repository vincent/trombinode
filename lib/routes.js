/**
* This is a file where you can define various routes globally. It's better than
* defining those in server.js, but ideally you should be defining routes as part of
* modules. @see example "hello" module to get a taste of how this works.
*/

// Third party libraries
var express = require('express')
  , app = exports = module.exports = express();

// Local includes
var mod = require('./app');

/** Global ROUTES **/
app.get('/', mod.callbacks.index);

app.post('/content/new', mod.callbacks.post_new_content);
