//
// Expose firebase api to non-import code p5js script.js
// via variable fb_.xxxx
// fb_.app
// fb_.auth
// fb_.signInAnonymously
// ...

// Documentation starting reference
// <!-- https://firebase.google.com/docs/web/alt-setup?authuser=0&hl=en -->

// console.log('fb_config');

import {
  initializeApp, //
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';

import {
  getAuth, //
  signInAnonymously,
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

// Your web app's Firebase configuration
// jht9629
const firebaseConfig_jht9629 = {
  apiKey: 'AIzaSyDLxi_fvCG2kzD2eJ4MxEZbOJ_GFSpIVe0',
  authDomain: 'molab-485f5.firebaseapp.com',
  databaseURL: 'https://molab-485f5-default-rtdb.firebaseio.com',
  projectId: 'molab-485f5',
  storageBucket: 'molab-485f5.appspot.com',
  messagingSenderId: '219508380677',
  appId: '1:219508380677:web:b5d846a150e7d60368b86c',
  measurementId: 'G-40F0BN8L7L',
};
// jht1493
const firebaseConfig_jht1493 = {
  apiKey: 'AIzaSyBl4dTlon41lMW1b3CgJ7LphBH_fi6RETo',
  authDomain: 'molab-2022.firebaseapp.com',
  databaseURL: 'https://molab-2022-default-rtdb.firebaseio.com',
  projectId: 'molab-2022',
  storageBucket: 'molab-2022.appspot.com',
  messagingSenderId: '1007268220063',
  appId: '1:1007268220063:web:a69f608f35ca3f8d9a26aa',
};
let configs = {
  jht9629: firebaseConfig_jht9629,
  jht1493: firebaseConfig_jht1493,
};
// Initialize Firebase
// const app = initializeApp(firebaseConfig_jht9629);

function init(config) {
  // config = config || firebaseConfig_jht1493;
  // typeof stringVariable === "string"
  if (typeof config == 'string') {
    // console.log('fb_config config string', config);
    config = configs[config];
  }
  config = config || firebaseConfig_jht9629;
  // console.log('fb_config config', config);
  // console.log('fb_config config.projectId', config.projectId);
  fb_.app = initializeApp(config);
  fb_.auth = getAuth();
  fb_.fbase.init();
  fb_.fstore.init();
  return config;
}

import { fstore } from './fb_fstore.js?v=041';

import { fbase } from './fb_fbase.js?v=041';

// export api for non-module script
const fb_ = {
  init,
  signInAnonymously,
  fstore,
  fbase,
};

window.fb_ = fb_;
