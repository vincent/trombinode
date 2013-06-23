
var translations = {
  "Trombino - Créez vos trombinoscopes": {
    en: "Trombino - Create face books from group photos"
  },
  "A propos": {
    en: "About"
  },
  "Trombino est une expérimentation du framework NodeJS": {
    en: "Trombino is a NodeJS experiment"
  },
  "Fabriqué avec": {
    en: "Built with"
  },
  "par": {
    en: "by"
  },
  "Ce service est proposé \"tel quel\", sans aucune garantie. Si vous rencontrez un bug, ou vous souhaiteriez une nouvelle fonctionnalité, écrivez moi.": {
    en: "This service is proposed \"as it is\" with no garanty. If you find a bug or if you want a new feature, please write me."
  },
  "Suivez-moi sur Twitter": {
    en: "Follow me on Twitter"
  },
  "ou Github": {
    en: "or Github"
  },
  "Transformez vos photos de groupe en trombinoscope": {
    en: "Turn your group photo into face book PDFs"
  },
  "Glissez votre photo ici": {
    en: "Drag and drop your photo here"
  },
  "Transférez une photo de groupe": {
    en: "Upload your photo"
  },
  "Nette, floue, en extérieur ou en intérieur, peu importe ! Fonctionne avec n'importe quelle photo de type <abbr>JPEG</abbr>, <abbr>GIF</abbr> ou <abbr>PNG</abbr>.": {
    en: "Sharp, blured, outside or inside, does'nt matter ! Works with any kind of photography in <abbr>JPEG</abbr>, <abbr>GIF</abbr> or <abbr>PNG<abbr> format."
  },
  "chercher une image pour tester": {
    en: "find a photo to experiment"
  },
  "Visages détectés, découpés.": {
    en: "Faces are detected and cropped"
  },
  "Nous détectons les visages, même derrière d'autres personnes. Cela se fait en quelque instants.": {
    en: "We detect all faces, event behind other people, in a few seconds."
  },
  "Nommez, imprimez !": {
    en: "Name, and print !"
  },
  "Nommer chaque visage extrait, si une découpe ne convient pas, vous pouvez la supprimer.<br>Vous récupérez un PDF prêt à imprimer.": {
    en: "Name every faces we found. If a specific crop is wrong, you can delete it.<br>You get a PDF, ready to print."
  },
  "voir un exemple": {
    en: "see an example"
  }
};

function _t(text, lang) {
  if (translations[text] && translations[text][lang]) return translations[text][lang];
  else {
    console.log(text, 'is not translated');
    return text;
  }
}
