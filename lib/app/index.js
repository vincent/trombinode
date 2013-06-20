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
  , util = require('util')
  , gm = require('gm')
  , async = require('async')
  , app = exports = module.exports = express();

// Don't just use, but also export in case another module needs to use these as well.
exports.callbacks    = { //require('./controllers/hello');
  index: function(req, res) {
    res.render('../lib/app/views/index');
  },
  post_new_content: function(req, res) {
    var trombi = gm(0, 0, "#FFF"),
          face_height = 100;
    for (var name in req.files) {
      cv.readImage(req.files[name].path, function(err, im){
        im.detectObject(cv.FACE_CASCADE, {}, function(error, faces){
          var tolerance = 50, num = 0;
          async.map(faces,
            function(face, next) {
              face_height = Math.min(face.height, 100);
              var face_image = gm(req.files[name].path)
                                            .crop(face.width + tolerance*2, face.height + tolerance*2, face.x - tolerance, face.y - tolerance)
                                            .scale(null, face_height)
                                            .borderColor("#FFFF")
                                            .border(0, 0),
                    face_image_file = [face.width, face.height, face.x, face.y, num].join('_');

              console.dir(face_image);

              //face_image.write("public/faces/" + face_image_file + ".png", function(err){
              face_image
                .toBuffer('jpeg', function(err, data){
                var b64 = data.toString('base64');
                console.log(data, "req.files[name].path+faces[i] = ", face_image_file, err);
                face.face_image_file = face_image_file + ".jpg";
                face.face_image_id = face_image_file;
                face.data = 'data:image/jpeg;base64,' + b64;
                face.num = num++;
                next(err, face);
              });
            },
            function(err, results){
                //trombi.write(__dirname + '/../../public/'+name+'.png', function(err){
                  res.send({
                    faces: results,
                    faces_side_by_side: '/'+name+'.jpg'
                  });
                //});
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
