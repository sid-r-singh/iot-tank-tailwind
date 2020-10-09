// Import stylesheets
import './style.css';
// Write Javascript code!
var cnt=document.getElementById("count"); 
var water=document.getElementById("water");
var percent=cnt.innerText;
var prev_value=0;
var interval;

var firebaseConfig = {
  apiKey: "AIzaSyBFhmFjnzZslcHs7rJFKoHJQrgzfTVYVeY",
  authDomain: "mt-iot-brn.firebaseapp.com",
  databaseURL: "https://mt-iot-brn.firebaseio.com",
  projectId: "mt-iot-brn",
  storageBucket: "mt-iot-brn.appspot.com",
  messagingSenderId: "414738283359",
  appId: "1:414738283359:web:6c7f71b4c0db262e9dd4ea",
  measurementId: "G-36H6XGSRE4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var ref = database.ref("Tanks/tank1");

ref.on("value", function(snap){

interval=setInterval(function(){ 
  if (prev_value<snap.val()){
percent++; 
  }
  else if(prev_value>snap.val()){
percent--; 
  }
  
  cnt.innerHTML = percent; 
  water.style.transform='translate(0'+','+(100-percent)+'%)';
  if(percent==snap.val()){
    clearInterval(interval);
    prev_value=snap.val();
  }
},60);

console.log(snap.val()*2);
console.log("prev value=");
console.log(prev_value);
});

