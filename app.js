var express = require("express"),
    app = express(),
    path = __dirname + '/views/',
    router = express.Router(),
    bodyParser = require('body-parser'),
    firebase = require('firebase');

var config = {
  apiKey: "AIzaSyC-Sd37f6e6Ml6ymgy40dgB9y9G3gywu-g",
  authDomain: "aarohan2017-61ac6.firebaseapp.com",
  databaseURL: "https://aarohan2017-61ac6.firebaseio.com/",
  storageBucket: "aarohan2017-61ac6.appspot.com",
};

var schooldetails = {
    schoolname: null,
    facultyname: null,
    facultyemail: null,
    facultyphonono: null
};

firebase.initializeApp(config);
var database = firebase.database();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));   // to support URL-encoded bodie


app.set('port', (process.env.PORT || 8000));
app.use(express.static( __dirname + '/public'));
app.set('views', path);
app.set('view engine', 'ejs');
app.get("/",router);

router.get("/", function(req, res) {
  res.render('home.ejs', {schooldetails});
});

app.post("/reg_school", function(req, res) {
	schooldetails = {
        schoolname: req.body.school_name,
        facultyname: req.body.faculty_name,
        facultyemail: req.body.faculty_email,
        facultyphonono: req.body.faculty_phoneno
    };
    console.log(schooldetails)
    res.redirect('/');
});


router.get("/About",function(req,res){
  res.sendFile("./about.html");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function writeSchoolData(userId, name, email, imageUrl) {
  firebase.database().ref('Schools/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}