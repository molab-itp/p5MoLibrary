//
// firebase-storage
// Expose firebase api to non-import code p5js script.js
// via variable fb_.xxxx
// fb_.fstore.storage
// ...

// console.log('fb_fstore');

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  list,
  listAll,
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js';

const storage = getStorage();

// Export from module to window global for p5js access
window.fb_.fstore = {
  storage,
  ref,
  getDownloadURL,
  uploadBytes,
  list,
  listAll,
};
//
