inscriptionCollection = new Mongo.Collection('inscriptions');
activitesCollection = new Mongo.Collection('activites');
planningCollection = new Mongo.Collection('planning');
adherentsCollection = new Mongo.Collection('adherents');

if (Meteor.isClient) {

  
angular.module('inscriptionsApp',['angular-meteor', 'ui.router', 'ngMaterial', 'xeditable', 'ui.bootstrap', 'pascalprecht.translate','accounts.ui']);

Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });
accountsUIBootstrap3.setLanguage('fr');
  

angular.module('inscriptionsApp').run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

angular.module('inscriptionsApp').config(function($mdIconProvider) {
    $mdIconProvider
       .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
       .defaultIconSet('img/icons/sets/core-icons.svg', 24);
   });

angular.module('inscriptionsApp').factory('LocaleFactory', function ( $locale, $translate) {
var locales = {
    fr: {
      "DATETIME_FORMATS": {
        "AMPMS": [
          "AM",
          "PM"
        ],
        "DAY": [
          "dimanche",
          "lundi",
          "mardi",
          "mercredi",
          "jeudi",
          "vendredi",
          "samedi"
        ],
        "MONTH": [
          "janvier",
          "f\u00e9vrier",
          "mars",
          "avril",
          "mai",
          "juin",
          "juillet",
          "ao\u00fbt",
          "septembre",
          "octobre",
          "novembre",
          "d\u00e9cembre"
        ],
        "SHORTDAY": [
          "dim.",
          "lun.",
          "mar.",
          "mer.",
          "jeu.",
          "ven.",
          "sam."
        ],
        "SHORTMONTH": [
          "janv.",
          "f\u00e9vr.",
          "mars",
          "avr.",
          "mai",
          "juin",
          "juil.",
          "ao\u00fbt",
          "sept.",
          "oct.",
          "nov.",
          "d\u00e9c."
        ],
        "fullDate": "EEEE d MMMM y",
        "longDate": "d MMMM y",
        "medium": "d MMM y HH:mm:ss",
        "mediumDate": "d MMM y",
        "mediumTime": "HH:mm:ss",
        "short": "dd/MM/yy HH:mm",
        "shortDate": "dd/MM/yy",
        "shortTime": "HH:mm"
      },
      "NUMBER_FORMATS": {
        "CURRENCY_SYM": "\u20ac",
        "DECIMAL_SEP": ",",
        "GROUP_SEP": "\u00a0",
        "PATTERNS": [
          {
            "gSize": 3,
            "lgSize": 3,
            "macFrac": 0,
            "maxFrac": 3,
            "minFrac": 0,
            "minInt": 1,
            "negPre": "-",
            "negSuf": "",
            "posPre": "",
            "posSuf": ""
          },
          {
            "gSize": 3,
            "lgSize": 3,
            "macFrac": 0,
            "maxFrac": 2,
            "minFrac": 2,
            "minInt": 1,
            "negPre": "(",
            "negSuf": "\u00a0\u00a4)",
            "posPre": "",
            "posSuf": "\u00a0\u00a4"
          }
        ]
      },
      "id": "fr-fr",
      "pluralCat": function (n) {
        if (n >= 0 && n <= 2 && n != 2) {
          return PLURAL_CATEGORY.ONE;
        }
        return PLURAL_CATEGORY.OTHER;
      }
    },
    en: {
      "DATETIME_FORMATS": {
        "AMPMS": [
          "AM",
          "PM"
        ],
        "DAY": [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "MONTH": [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        "SHORTDAY": [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat"
        ],
        "SHORTMONTH": [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        "fullDate": "EEEE, MMMM d, y",
        "longDate": "MMMM d, y",
        "medium": "MMM d, y h:mm:ss a",
        "mediumDate": "MMM d, y",
        "mediumTime": "h:mm:ss a",
        "short": "M/d/yy h:mm a",
        "shortDate": "M/d/yy",
        "shortTime": "h:mm a"
      },
      "NUMBER_FORMATS": {
        "CURRENCY_SYM": "$",
        "DECIMAL_SEP": ".",
        "GROUP_SEP": ",",
        "PATTERNS": [
          {
            "gSize": 3,
            "lgSize": 3,
            "macFrac": 0,
            "maxFrac": 3,
            "minFrac": 0,
            "minInt": 1,
            "negPre": "-",
            "negSuf": "",
            "posPre": "",
            "posSuf": ""
          },
          {
            "gSize": 3,
            "lgSize": 3,
            "macFrac": 0,
            "maxFrac": 2,
            "minFrac": 2,
            "minInt": 1,
            "negPre": "(\u00a4",
            "negSuf": ")",
            "posPre": "\u00a4",
            "posSuf": ""
          }
        ]
      },
      "id": "en-us",
      "pluralCat": function (n) {
        if (n == 1) {
          return PLURAL_CATEGORY.ONE;
        }
        return PLURAL_CATEGORY.OTHER;
      }
    }};
    
     return {
        setLocale: function (key) {
            $translate.use(key);
            angular.copy(locales[key], $locale);
        }
    };
    
});

angular.module('inscriptionsApp').run(function (LocaleFactory) {
    LocaleFactory.setLocale('fr');
});

angular.module('inscriptionsApp').config(function($urlRouterProvider, $stateProvider, $locationProvider){
 
      $locationProvider.html5Mode(true);
 
      $stateProvider
        .state('inscrits', {
          url: '/inscritsSDM',
          templateUrl: 'templates/listeInscrits.html',
          controller: 'inscriptionsCtrl'
        })        
        .state('gestionActivites', {
          url: '/gestionActivites',
          templateUrl: 'templates/gestionActivites.html',
          controller: 'activitesCtrl'
        })
        .state('gestionPlanning', {
          url: '/gestionPlanning',
          templateUrl: 'templates/gestionPlanning.html',
          controller: 'planningCtrl'
        })
        .state('gestionAdherents', {
          url: '/gestionAdherents',
          templateUrl: 'templates/gestionAdherents.html',
          controller: 'adherentsCtrl'
        })
        .state('accueil', {
          url: '/',
          templateUrl: 'templates/accueil.html',
          controller: 'accueilCtrl'
        })
        .state('ficheAdherent', {
          url: '/ficheAdherent',
          templateUrl: 'templates/ficheAdherent.html',
          controller: 'ficheCtrl'
        })
 
      $urlRouterProvider.otherwise("/ficheAdherent");
    });
    
angular.module('inscriptionsApp').config(function($mdDateLocaleProvider) {
  // Example of a French localization.
  $mdDateLocaleProvider.months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet','août','septembre','octobre','novembre', 'décembre'];
  $mdDateLocaleProvider.shortMonths = ['janv', 'févr', 'mars', 'avril', 'mai','juin', 'juil','aout', 'sept','oct', 'nov', 'dec'];
  $mdDateLocaleProvider.days = ['dimanche', 'lundi', 'mardi', 'mercredi','jeudi','vendredi','samedi'];
  $mdDateLocaleProvider.shortDays = ['Di', 'Lu', 'Ma', 'Mer', 'Jeu', 'Ven', 'Sam'];
  // Can change week display to start on Monday.
  $mdDateLocaleProvider.firstDayOfWeek = 1;
   });
   
angular.module('inscriptionsApp').filter('upComing', function(){
    return function(items, field){
      var timeStart = Date.now();
        return items.filter(function(item){
        return (item[field] > timeStart);
      });
    }});
  
angular.module('inscriptionsApp').directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$window.getSelection().toString()) {
                    // Required for mobile Safari
                    this.setSelectionRange(0, this.value.length)
                }
            });
        }
    };
}]);

angular.module('inscriptionsApp').controller('inscriptionsCtrl', ['$scope', '$meteor',
    function ($scope, $meteor) {
      $scope.flagInscrit=-1;
 
      $scope.inscriptions = $scope.$meteorCollection(inscriptionCollection);
      $scope.adherents = $scope.$meteorCollection(adherentsCollection);
      
      $scope.inscriptionsEnfant = $scope.$meteorCollection(function() {
        query = { enfant: true };
        return inscriptionCollection.find(query);
      });
      
      $scope.inscriptionsAdulte = $scope.$meteorCollection(function() {
        query = { adulte: true };
        return inscriptionCollection.find(query);
      });
      
      $scope.addAdherent = function(nom, prenom){
        query = { $and:[{nom: nom}, {prenom: prenom}] };
        dejaAdherent = adherentsCollection.find(query).count()-1;
        if(dejaAdherent<0) {
        $scope.adherents.push( {
          nom: nom,
          prenom: prenom,
          createdAt: new Date() }
        );
        }
        
      };
      
           $scope.addInscription = function (nouvelleInscription) {
            $scope.flagInscrit=1;
         $scope.inscriptions.push( {
          nom: nouvelleInscription.nom,
          prenom: nouvelleInscription.prenom,
          mail: nouvelleInscription.mail,
          enfant: nouvelleInscription.enfant,
          adulte: nouvelleInscription.adulte,
          gateau: nouvelleInscription.gateau,
          createdAt: new Date() }
        );
        
              
              $mailInscrit=nouvelleInscription.mail;
              
              $flagEnfant=0;$flagAdulte=0;$flagGateau=0;
              $textMail="Votre inscription a bien été enregistrée. Pour rappel, vos choix :<br /><ul>";
              if (nouvelleInscription.enfant) {$textMail=$textMail+"<li>Un enfant inscrit</li>";$flagEnfant=1;}
              if (nouvelleInscription.adulte) {$textMail=$textMail+"<li>un adulte inscrit</li>";$flagAdulte=1;}
              if (nouvelleInscription.gateau=="Oui") {$textMail=$textMail+"<li>Vous apportez un gâteau</li>";$flagGateau=1} else {$textMail=$textMail+"<li>Vous n'apportez pas de gâteau</li>";}
              
              $prix=(10-5*$flagGateau)*($flagAdulte+$flagEnfant);
              
              $textMail=$textMail+"</ul><p>Votre participation s'élève à "+$prix+" €. Plus 5€ d'adhésion à l'association la Bonne Fabrique.";
              $textMail+="<p>Si ces choix sont erronés, n'hésitez pas à nous contacter par retour de ce mail.</p>";
              $textMail+= "<br /><br />A samedi<br />La Salle des Machines.";
              
              Meteor.call('sendEmail',
              nouvelleInscription.mail,
              'atelierdusappey@gmail.com',
              'Inscription confirmée',
              $textMail
              );
              
      };
     }]);
     
angular.module('inscriptionsApp').controller('adherentsCtrl',['$scope', '$meteor',
    function ($scope, $meteor) {
    $scope.adherents = $scope.$meteorCollection(adherentsCollection);
    $scope.plannings = $scope.$meteorCollection(planningCollection);
      
    $scope.retraitInscription = function (adherent, id) {
      retour=[];
      listeInscriptions = adherent.inscriptions;
      console.log(listeInscriptions);
      for (let inscription of listeInscriptions) {
        if(inscription.id!=id) {retour=retour.concat({id: inscription.id, creneau: inscription.crenau});}
      }
      console.log(retour);
       adherentsCollection.update(adherent._id, {$set : {inscriptions : retour}})
      
    }
    
        }]);
    
angular.module('inscriptionsApp').controller('activitesCtrl', ['$scope', '$meteor',
    function ($scope, $meteor) {
      
      $scope.activites=$scope.$meteorCollection(activitesCollection);
      
      $scope.addActivite = function (nouvelleActivite) { 
         $scope.activites.push( {
          titre: nouvelleActivite.titre,
          createdAt: new Date() }
        );
      };
  
  }]);
  
angular.module('inscriptionsApp').controller('planningCtrl', ['$scope', '$meteor',
    function ($scope, $meteor) {

      $scope.plannings = $scope.$meteorCollection(planningCollection);
      $scope.activites=$scope.$meteorCollection(activitesCollection);
 

      $scope.ajoutEvenement = function(){
          $scope.plannings.push( {
          titre: 'Titre de l\'activité',
          date: new Date(),
          places: 8,
          lieu: "La Bonne fabrique",
          horaires: [{creneau:"14h00-15h30", inscrits:0}],
          createdAt: new Date() }
        );
        };
      
      $scope.ajoutCreneau = function(creneau){
        query = { _id: creneau._id };
        evenement =  planningCollection.find(query).fetch();
        evenement[0].horaires=evenement[0].horaires.concat({creneau:"14h05-15h30", inscrits:0});
        planningCollection.update(evenement[0]._id, {$set : {horaires : evenement[0].horaires}})
      };
      
      $scope.retraitCreneau = function(creneau, horaire, inscrits){
        if(inscrits==0) {
        query = { _id: creneau._id };
        evenement =  planningCollection.find(query).fetch();
        retrait = {creneau : horaire, inscrits: inscrits};
        planningCollection.update(evenement[0]._id, {$pull : {horaires : retrait}})
        }
      };


  }]);
  
angular.module('inscriptionsApp').controller('accueilCtrl',['$scope', '$meteor', '$mdDialog',
    function ($scope, $meteor, $mdDialog) {
    $scope.inscriptionFaite = false;
    $scope.recapitulatif=false;
    $scope.plannings = $scope.$meteorCollection(planningCollection);
    $scope.adherents = $scope.$meteorCollection(adherentsCollection);
    $scope.inscription = {nom: "", prenom: "", mail: ""};
    $scope.listeInscriptions = listeInscriptionsFonction();
    $scope.mailEnvoye = false;
     $scope.showAlert = showAlert;
    
$scope.selectAll = function (form) {
    var input = form.$editables[0].inputEl;
    setTimeout(function () { input.select(); }, 50);
    };

$scope.inscriptionActivite = function(inscription, id, horaire) {
    query = {nom: inscription.nom, prenom: inscription.prenom};
    trouveAdherent = adherentsCollection.find(query);
    if (trouveAdherent.count()==0) {
      $scope.adherents.push({
      nom: inscription.nom,
      prenom: inscription.prenom,
      mail: inscription.mail,
      inscriptions: [{id: id, horaire: horaire}],
      createdAt: new Date()}
        );
    } else {
    adherent=trouveAdherent.fetch();
    adherent[0].inscriptions=adherent[0].inscriptions.concat({id: id, horaire: horaire});
    adherentsCollection.update(adherent[0]._id, {$set : {inscriptions :  adherent[0].inscriptions}})
    $scope.inscriptionFaite = true;
      }

    query={_id: id};
    trouveActivite = planningCollection.find(query);
    if (trouveActivite.count()>=0) {
     activite=trouveActivite.fetch();
     nouveauHoraires=[];
     for (let creneau of activite[0].horaires) 
     {
       if (creneau.creneau == horaire) {
         creneau.inscrits+=1;
         }
         nouveauHoraires=nouveauHoraires.concat({creneau: creneau.creneau, inscrits: creneau.inscrits});
      }
      planningCollection.update(id, {$set : {horaires : nouveauHoraires}});

  }

  }
  
$scope.estInscrit = function(inscription, id, horaire) {
    flagInscrit = false;
    query = {nom: inscription.nom, prenom: inscription.prenom};
    trouveAdherent = adherentsCollection.find(query);
    adherent=trouveAdherent.fetch();
    if (trouveAdherent.count()==1) {
        for (let inscription of adherent[0].inscriptions) {
          if (inscription.id==id && inscription.horaire==horaire) {flagInscrit=true;$scope.inscriptionFaite = true;}
        };
    }
    return flagInscrit;
}

$scope.desinscriptionActivite = function (inscription, id, horaire){
  query = {nom: inscription.nom, prenom: inscription.prenom};
  trouveAdherent = adherentsCollection.find(query);
  adherent=trouveAdherent.fetch();
  adherentsCollection.update(adherent[0]._id, {$pull : {inscriptions:  {id: id, horaire: horaire}}})
  
      query={_id: id};
    trouveActivite = planningCollection.find(query);
    if (trouveActivite.count()>=0) {
     activite=trouveActivite.fetch();
     nouveauHoraires=[];
     for (let creneau of activite[0].horaires) 
     {
       if (creneau.creneau == horaire) {
         creneau.inscrits-=1;
         }
         nouveauHoraires=nouveauHoraires.concat({creneau: creneau.creneau, inscrits: creneau.inscrits});
      }
      planningCollection.update(id, {$set : {horaires : nouveauHoraires}});
      query={"date" : { $gte : new Date() }};
      estInscrit=adherentsCollection.find(query);
      if (estInscrit.count()==0) {$scope.inscriptionFaite = false;}

  }
}

$scope.inscritAutreCreneau = function(inscription,id, validation) {
  flagDisabled = false;
  if (validation){
  query = {nom: inscription.nom, prenom: inscription.prenom};
  trouveAdherent = adherentsCollection.find(query);
  adherent=trouveAdherent.fetch();
  if (trouveAdherent.count()==1) {
        for (let inscription of adherent[0].inscriptions) {
          if (inscription.id==id) {flagDisabled=true;}
     };
    }
    return flagDisabled;
  } else return false;
  
}

$scope.recapitulons = function(passeInscription){
  if ($scope.recapitulatif) {
    $scope.recapitulatif=false;
    $scope.listeInscriptions = listeInscriptionsFonction();
  } else {
    $scope.recapitulatif=true;
    $scope.listeInscriptions = listeInscriptionsFonction();
  }
}

function listeInscriptionsFonction() {
    listeInscrits=[];
    query = {nom: $scope.inscription.nom, prenom: $scope.inscription.prenom};
    trouveAdherent = adherentsCollection.find(query);
    if (trouveAdherent.count()!=0) {
      adherent=trouveAdherent.fetch();
      for (let singleInscription of adherent[0].inscriptions) {
      query = {_id: singleInscription.id};
      trouveActivite = planningCollection.find(query);
      activite=trouveActivite.fetch();

      listeInscrits = listeInscrits.concat({titre: activite[0].titre, lieu: activite[0].lieu, horaire: singleInscription.horaire, date: activite[0].date});
      }
    }
    return listeInscrits;
}


function showAlert() {
      alert = $mdDialog.alert()
        .title('Mail envoyé')
        .content('Si vous ne le recevez pas, vérifiez votre dossier spam.')
        .ok('Fermer');

      $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });
    }

$scope.envoieMail = function () {
              $textMail="<p>Votre ou vos inscription(s) a (on) bien été enregistrée(s). Pour rappel, "+$scope.inscription.prenom+" est inscrit :</p><ul>";
              for (let singleInscription of $scope.listeInscriptions)
              {
                $textMail+="<li>"+singleInscription.titre+" : le "+singleInscription.date+" ; horaire : "+singleInscription.horaire+" ; lieu :"+singleInscription.lieu+"</li>"
              }
            
              $textMail+="</ul><p>Si vous souhaitez changer de créneau horaire, vous pouvez à nouveau passer par l'interface d'inscription. En entrant à nouveau les coordonnées, vous aurez la possibilité de changer vos choix.</p>";
              $textMail+="<p>Pour toute question, n'hésitez pas à nous contacter à cette adresse</p>";
              $textMail+= "<br /><br />A bientôt<br />La Salle des Machines.";
              
              Meteor.call('sendEmail',
              $scope.inscription.mail,
              'atelierdusappey@gmail.com',
              'Inscription(s) confirmée(s)',
              $textMail
              );
}

    }]);
    
angular.module('inscriptionsApp').controller('ficheCtrl', ['$scope', '$meteor',
   function ($scope, $meteor) {
nbMembres=0;

$scope.selectAll = function (form) {
    var input = form.$editables[0].inputEl;
    setTimeout(function () { input.select(); }, 50);
    };

$meteor.autorun($scope, function(){
if (Meteor.user()) {
console.log(Meteor.user());
$scope.ficheAdherent = Meteor.user().profile;
};
});

$scope.ajoutMembre = function () {
  nbMembres+=1;
ide = new Meteor.Collection.ObjectID()._str;
if($scope.ficheAdherent.membres) {
  $scope.ficheAdherent.membres=$scope.ficheAdherent.membres.concat({id: ide, prenom: "Nouveau membre "+nbMembres});
} else {
  $scope.ficheAdherent.membres=[{id:ide, prenom: "Nouveau membre "+nbMembres}]
}
$scope.miseaJour();
}

$scope.effacerMembre = function(id) {
  nbMembres-=1;
  listeMembres=[];
  for (let membre of $scope.ficheAdherent.membres) {
        if(membre.id!=id) {listeMembres=listeMembres.concat({id: membre.id, prenom: membre.prenom});}
      }
      $scope.ficheAdherent.membres=listeMembres;
  $scope.miseaJour();
}

$scope.miseaJour = function() {
  Meteor.users.update(Meteor.userId(), {$set: {profile: $scope.ficheAdherent}});
}

$scope.effaceProfile = function(){
  $scope.ficheAdherent={nom: "Nom du profile"};
  $scope.miseaJour();
}

  }]);
  
}

if (Meteor.isServer) {
  
  Meteor.startup(function () 
  {
    // code to run on server at startup
    process.env.MAIL_URL = "smtp://postmaster@sandboxf12eef0343804013bfb9eb81b9a1fded.mailgun.org:594b596a603d23f1c4db40efda99f1a6@smtp.mailgun.org:587";

  });
  Meteor.methods
  (
{
  sendEmail: function (to, from, subject, text) 
  {
     console.log("*** sendEmail ***");

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      html: text
    });
  }
  
}
);
}
