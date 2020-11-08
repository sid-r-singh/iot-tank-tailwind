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
var ref2 = database.ref("Tanks/tank2");
var ref3 = database.ref("Tanks/tank3");

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

console.log("value*2="+snap.val()*2);
console.log("prev value="+prev_value);

});
ref2.on("value", function(snap){
  var per = snap.val()+"%";
  document.getElementById("tank2").innerHTML = per;
  document.getElementById("tank2_m").style.width = per;
});
ref3.on("value", function(snap){
  var per = snap.val()+"%";
  document.getElementById("tank3").innerHTML=snap.val()+"%";
   document.getElementById("tank3_m").style.width = per;
});



//Modal control
var openmodal = document.querySelectorAll('.modal-open')
    for (var i = 0; i < openmodal.length; i++) {
      openmodal[i].addEventListener('click', function(event){
    	event.preventDefault()
    	toggleModal()
      })
    }
    
    const overlay = document.querySelector('.modal-overlay')
    overlay.addEventListener('click', toggleModal)
    
    var closemodal = document.querySelectorAll('.modal-close')
    for (var i = 0; i < closemodal.length; i++) {
      closemodal[i].addEventListener('click', toggleModal)
    }
    
    document.onkeydown = function(evt) {
      evt = evt || window.event
      var isEscape = false
      if ("key" in evt) {
    	isEscape = (evt.key === "Escape" || evt.key === "Esc")
      } else {
    	isEscape = (evt.keyCode === 27)
      }
      if (isEscape && document.body.classList.contains('modal-active')) {
    	toggleModal()
      }
    };
    
    
    function toggleModal () {
      const body = document.querySelector('body')
      const modal = document.querySelector('.modal')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-active')
    }
