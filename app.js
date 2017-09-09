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

var studentdetails = {
    id: null,
    name: null,
    school: null,
    category: null,
    gender: null
};

var selectoption = {
    choice: 1
};



firebase.initializeApp(config);
var database = firebase.database();

var ref = database.ref("Schools/");

var schools = [];
var i = 0;


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));   // to support URL-encoded bodie


app.set('port', (process.env.PORT || 8000));
app.use(express.static( __dirname + '/public'));
app.set('views', path);
app.set('view engine', 'ejs');
//app.get("/",router);

app.get("/", function(req, res) {
    console.log("main");
    console.log(schools);
  res.render('home.ejs', {schooldetails, selectoption, schools});
    console.log(schools);
});

app.get("/school_reg", function(req, res){
    selectoption.choice = 1;
    schooldetails = {
        schoolname: null,
        facultyname: null,
        facultyemail: null,
        facultyphonono: null
    };
    res.redirect('/');
});

app.get("/student_reg", function(req, res){
    console.log("student_reg");
    selectoption.choice = 2;
    studentdetails = {
        schoolname: null,
        facultyname: null,
        facultyemail: null,
        facultyphonono: null    
    };
    schools = new Array();
    ref.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
      // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                schools.push(key);
            });
    });
    res.redirect('/');
});

app.get("/event_reg", function(req, res){
    selectoption.choice = 3;
    eventdetails = {
        schoolname: null,
        facultyname: null,
        facultyemail: null,
        facultyphonono: null
    };
    res.redirect('/');
});

app.post("/reg_school", function(req, res) {
	schooldetails = {
        schoolname: req.body.school_name,
        facultyname: req.body.faculty_name,
        facultyemail: req.body.faculty_email,
        facultyphonono: req.body.faculty_phoneno
    };
    console.log(schooldetails)
    writeSchoolData()
    res.redirect('/');
});

app.post("/reg_student", function(req, res) {
	studentdetails = {
        id: req.body.uid,
        name: req.body.name,
        category: req.body.category,
        gender: req.body.gender,
        school: req.body.school
    };
    console.log(studentdetails)
    writeStudentData();
    res.redirect('/');
});


router.get("/About",function(req,res){
  res.sendFile("./about.html");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function writeSchoolData() {
  firebase.database().ref('Schools/' + schooldetails.schoolname).set({
    faculty: {
        name: schooldetails.facultyname,
        email: schooldetails.facultyemail,
        phoneno: schooldetails.facultyphonono
    },
  });
}



function writeStudentData() {

}

function readSchoolData() {
    schools = [];
    schools.push("Rishi");
    
    
    console.log(schools.length);
}