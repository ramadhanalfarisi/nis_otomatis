var mysql = require('mysql');

var con = mysql.createConnection({
  host: "180.250.162.213",
  // host:"localhost",
  user: "root",
  // password:"",
  password: "",
  database: "siakad_moklet"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;