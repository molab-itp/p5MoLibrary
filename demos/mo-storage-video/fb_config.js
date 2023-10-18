//
// Expose firebase api to non-import code p5js script.js
// via variable fb_.xxxx
// fb_.ref
// fb_.database
// fb_.onValue
// ...

// Documentation starting reference
// <!-- https://firebase.google.com/docs/web/alt-setup?authuser=0&hl=en -->

console.log('fb_config');

import {
  initializeApp, //
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js'

// Add Firebase products that you want to use
import {
  getAuth, //
  signInAnonymously,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDLxi_fvCG2kzD2eJ4MxEZbOJ_GFSpIVe0',
  authDomain: 'molab-485f5.firebaseapp.com',
  databaseURL: 'https://molab-485f5-default-rtdb.firebaseio.com',
  projectId: 'molab-485f5',
  storageBucket: 'molab-485f5.appspot.com',
  messagingSenderId: '219508380677',
  appId: '1:219508380677:web:b5d846a150e7d60368b86c',
  measurementId: 'G-40F0BN8L7L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
// signInAnonymously(auth)
//   .then(() => {
//     console.log('signInAnonymously OK');
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log('errorCode', errorCode);
//     console.log('errorMessage', errorMessage);
//   });

window.fb_ = {
  app, // export api for non-module scripts
  auth,
  signInAnonymously,
};
