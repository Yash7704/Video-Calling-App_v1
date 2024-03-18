import './style.css';

import firebase from 'firebase/app';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "video-calling-app-59c44.firebaseapp.com",
  projectId: "video-calling-app-59c44",
  storageBucket: "video-calling-app-59c44.appspot.com",
  messagingSenderId: "328448515810",
  appId: "1:328448515810:web:58ae289d7d1134360b88bb",
  measurementId: "G-385Q53ESL5"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}


const servers ={
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

//Global state

let pc = new RTCPeerConnection(servers);
let localStream = null;  // Our Webcam Stream
let remoteStream = null; // Our friend's Webcam Stream

const webcamButton = document.getElementById('webcamButton');
const webcamVideo = document.getElementById('webcamVideo');
const callButton = document.getElementById('callButton');
const callInput = document.getElementById('callInput');
const answerButton = document.getElementById('answerButton');
const remoteVideo = document.getElementById('remoteVideo');
const hangupButton = document.getElementById('hangupButton');

webcamButton.onclick = async() => {
  localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true}); // Getting the access for webcam and audio
  remoteStream = new MediaStream(); // Creating a new media stream for the remote video
  
  // Pushing the tracks from localStream to remoteStream

  localStream.getTracks().forEach((track) =>{
    pc.addTrack(track, localStream);
  });

  // pulling the tracks from remoteStream to remoteVideo
  pc.ontrack = event =>{
    event.streams[0].getTracks().forEach((track) =>{
      remoteStream.addTrack(track);
    });
  };

  webcamVideo.srcObject = localStream; // Displaying the localStream in the webcamVideo
  remoteVideo.srcObject = remoteStream; // Displaying the remoteStream in the remoteVideo
}
