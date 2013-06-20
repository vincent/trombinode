;(function(){

var Trombinode = function(){
  this.initUploader();
  this.faces = {};
};

Trombinode.prototype.removeImage = function(face_image_id) {
  delete Trombinode.faces[face_image_id];
  $('#' + face_image_id).remove();
};

Trombinode.prototype.onSuccess = function(id, response) {
  if (response && response.faces && response.faces.length > 0) {
    Trombinode.faces = [];
    $('.call-action').append('<ul class="persons">'
      + $.map(response.faces, function(face){
        Trombinode.faces.push(face);
        return '<li id="' + face.face_image_id + '" class="clearfix">'
          + '<img src="' + face.data + '">'
          + '<input size="20" id="person' + face.num + '" name="person[' + face.num + ']" type="text" class="person"><br/>'
          + '<input size="30" id="person_title' + face.num + '" name="person_title[' + face.num + ']" type="text" class="person_title"><br/>'
          + '<a class="action" href="#" onclick="Trombinode.removeImage(\'' + face.face_image_id + '\'); return false;">supprimer cette image</a>'
          + '</li>';
      }).join('')
      + '</ul>');

    var submit = $('<button type="submit" class="btn">Trombiner</button>');
    $('.call-action').append(submit);

    //submit.click(this.buildPDF);
    submit.click(function(){
      window.Trombinode.buildPDF();
    });

    setTimeout(function() {
      $('.feature-icon.gears').removeClass('animated');
      $('.person').first().focus();
    }, 300);

  } else {
    $('.call-action').append('<div class="alert alert-error">Oh non ! Aucun visage trouvé  :(</div>');
  }
};

Trombinode.prototype.onSending = function(file) {
  $('#uploader').hide();
  $('.feature-icon.gears').addClass('animated');
  $('.call-action').html('<div class="progress progress-success progress-striped"><div class="bar" style="width: 0%"></div></div>');
};

Trombinode.prototype.onProgress = function(file, progress, bytesSent){
  $('.progress .bar').css({width: progress+'%'});
};

Trombinode.prototype.onComplete = function(file, progress, bytesSent){
  $('.progress').hide();
};

Trombinode.prototype.initUploader = function() {
  var uploadZone = new Dropzone("#uploader", {
    url: "/content/new",
    paramName: "image",
    clickable: true,
    previewsContainer: '#preview',
    success: this.onSuccess
  });
  uploadZone.on('sending', this.onSending);
  uploadZone.on('uploadprogress', this.onProgress);
  uploadZone.on('complete', this.onComplete);
};

Trombinode.prototype.buildPDF = function() {
  var doc = new jsPDF();
  doc.setFontSize(40);
  for (var i=0; i < Trombinode.faces.length; i++) {
    var x = 10,
          y_image = (30 * (i+1)) + 10,
          y_text = (30 * (i+1)) + 25;
    doc.text(x + 30, y_text, $('#person'+i).val());
    doc.addImage(Trombinode.faces[i].data, 'JPEG', x, y_image, 25, 25);
  };
  //doc.save('Test.pdf');
  doc.output('datauri');
};

window.Trombinode = new Trombinode();
})();


