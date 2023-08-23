//
// Expose firebase api to non-import code p5js script.js
// via variable fb_.xxxx
// fb_.ref
// fb_.database
// fb_.onValue
// ...

// Documentation starting reference
// <!-- https://firebase.google.com/docs/web/alt-setup?authuser=0&hl=en -->

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
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

import {
  child,
  get,
  getDatabase,
  increment,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
  ref,
  set,
  update,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

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

const database = getDatabase();
// console.log('database', database);

const dbRef = ref(getDatabase());

const fb_ = {
  app, // export api for non-module scripts
  auth,
  child,
  database,
  dbRef,
  get,
  increment,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
  ref,
  set,
  signInAnonymously,
  update,
};
window.fb_ = fb_;

// -- History

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#atomic_server-side_increments

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// Extracted to own file fb_firebase.js and use
//  <script type="module" src="firebase.js"></script>
// to load from index.html
// This step was to verify that script module import works in p5js editor

// Initial version that does not use module import
// https://editor.p5js.org/jht1493/sketches/5LgILr8RF
// Firebase-createImg-board
// Display images from Firebase storage as a bill board
