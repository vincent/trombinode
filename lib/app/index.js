/**
* This is a self-contained module that defines its routes, callbacks, models and views
* all internally. Such approach to code organization follows the recommendations of TJ:
*
* http://vimeo.com/56166857
*
*/

// Third-party libraries
var _ = require('underscore')
  , CONF = require('config')
  , express = require('express')
  , cv = require('opencv')
  , gm = require('gm')
  , async = require('async')
  , app = exports = module.exports = express();

// Don't just use, but also export in case another module needs to use these as well.
exports.callbacks    = { //require('./controllers/hello');
  index: function(req, res) {
    res.render('../lib/app/views/index');
  },
  post_new_content: function(req, res) {
    var trombi = gm(10, 400, "#FFF"),
          sep = gm(10, 400, "#FFF");
    for (var name in req.files) {
      cv.readImage(req.files[name].path, function(err, im){
        im.detectObject(cv.FACE_CASCADE, {}, function(error, faces){
          async.each(faces,
            function(face, next) {
              var face_image = gm(req.files[name].path).crop(face.width, face.height, face.x, face.y).scale(null, 400),
                    face_image_file = ["/tmp/face", face.width, face.height, face.x, face.y,".png"].join('_');

              face_image.write(face_image_file, function(err){
                console.log("req.files[name].path+faces[i] = ", face_image_file, err);
                trombi.append(face_image_file, true);
                next(null);
              });
            },
            function(err){
                trombi.write(__dirname + '/../../public/'+name+'.jpg', function(err){
                  res.send('/'+name+'.jpg');
                });
              });
        });
      });
    }
  }
}
//exports.models       = require('./models');

//-- You could also serve templates with local paths, but using shared layouts and partials may become tricky
//var hbs = require('hbs');
//app.set('views', __dirname + '/views');
//app.set('view engine', 'handlebars');
//app.engine('handlebars', hbs.__express);

// Module's Routes
//app.get('/hello', exports.callbacks.sayHello);
