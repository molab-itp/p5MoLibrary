// mo-storage-console
// explore firebase storage api - display info in console
// basic library interface in index.html

let my = {};

function setup() {
  console.log('mo-storage setup');

  my.dbase_rootPath = '-mo-1-@w-';
  my.type = 'image/png'; // png image type preserves white background
  // my.type = 'image/jpeg'; // jpeg give black background
  my.ext = '.png';
  // my.ext = '.jpg';
  my.quality = 1;

  my.width = 400;
  my.height = 200;

  pixelDensity(1);
  my.cnv = createCanvas(my.width, my.height);

  my.len = int(width / 20);

  createButton('SignIn').mousePressed(function () {
    demo_signIn();
  });

  createButton('ListAll').mousePressed(function () {
    demo_listAll(my.dbase_rootPath);
    // demo_listAll('');
    // demo_listAll('oVFxc052pOWF5qq560qMuBmEsbr2');
  });

  createButton('List').mousePressed(function () {
    // demo_list(my.dbase_rootPath)
    demo_list('');
    // demo_list('oVFxc052pOWF5qq560qMuBmEsbr2');
  });

  createButton('Download').mousePressed(function () {
    // demo_getDownloadURL('oVFxc052pOWF5qq560qMuBmEsbr2/129.jpeg');
    // demo_getDownloadURL('/-mo-1-@w-/mY5kp2xDNRWJG7dYAWXOFfwIwZD3/001');
    // demo_getDownloadURL('-mo-1-@w-/y29ShmiYYNST4KUKK7G76db6k4H2/001.png');
    // -mo-1-@w-/y29ShmiYYNST4KUKK7G76db6k4H2
    demo_getDownloadURL();
  });

  createButton('Upload').mousePressed(function () {
    demo_upload();
  });

  createElement('br');

  createDiv('press mouse and drag to draw');
  createDiv('buttons to upload and download canvas to firebase');
  // show all
  // demo_listAll('');
  // show all items for this id
  // demo_listAll('oVFxc052pOWF5qq560qMuBmEsbr2');
}

function draw() {
  if (!mouseIsPressed) return;
  if (mouseX < 0 || mouseX > width) return;
  if (mouseY < 0 || mouseY > height) return;
  let cl = random(['red', 'green', 'yellow']);
  stroke(cl);
  let sw = 4;
  strokeWeight(sw);
  noFill();
  let w = my.len;
  let x = mouseX - (mouseX % w);
  let y = mouseY - (mouseY % w);
  circle(x, y, w - sw);
}

function demo_signIn() {
  let { signInAnonymously, auth } = fireb_;
  signInAnonymously(auth)
    .then(() => {
      console.log('signInAnonymously OK');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode', errorCode);
      console.log('errorMessage', errorMessage);
    });
}

// https://firebase.google.com/docs/storage/web/upload-files?authuser=0#upload_from_a_blob_or_file

function demo_upload() {
  console.log('demo_upload');

  canvas.toBlob(
    (blob) => {
      demo_upload_blob(blob);
    },
    my.type,
    my.quality
  ); // JPEG at 95% quality
}

function default_imagePath() {
  return `${my.dbase_rootPath}/${fireb_.auth.currentUser.uid}/001${my.ext}`;
}
function demo_upload_blob(blob) {
  console.log('demo_upload_blob', blob);
  let { storage, ref, uploadBytes } = fireb_;

  // let path = `/-mo-1/${fireb_.auth.currentUser.uid}/000`;
  my.imagePath = default_imagePath();
  console.log('demo_upload_blob my.imagePath', my.imagePath);
  const storageRef = ref(storage, my.imagePath);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, blob)
    .then((snapshot) => {
      console.log('snapshot.metadata.fullPath', snapshot.metadata.fullPath);
      // console.log('snapshot', snapshot);
      // console.log('Uploaded path', path);
    })
    .catch((error) => {
      // Handle any errors
      console.log('demo_upload_blob error', error);
    });
}

// https://stackoverflow.com/questions/38004917/how-to-render-a-blob-on-a-canvas-element
// HTMLCanvasElement.prototype.renderImage = function(blob) {

let d_img;

function renderBlobToCanvas(blob) {
  let canvas = my.cnv.elt;
  var ctx = canvas.getContext('2d');
  var img = new Image();
  d_img = img;

  img.onload = function () {
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(img.src);
  };
  img.src = URL.createObjectURL(blob);
}

let d_blob;

function demo_getDownloadURL(path) {
  console.log('demo_getDownloadURL path', path);
  if (!path) {
    path = default_imagePath();
    console.log('demo_getDownloadURL path', path);
  }
  let { storage, ref, getDownloadURL } = fireb_;
  // getDownloadURL(ref(storage, 'GNhzoQknS1OHY8DA1Fvygmltr902/1.jpeg'))
  let refPath = ref(storage, path);
  getDownloadURL(refPath)
    // oVFxc052pOWF5qq560qMuBmEsbr2/120.jpeg
    // oVFxc052pOWF5qq560qMuBmEsbr2/119.jpeg
    .then((url) => {
      // `url` is the download URL for '1.jpeg'
      console.log('demo_getDownloadURL url', url);

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
        d_blob = blob;
        console.log('demo_getDownloadURL blob', blob);
        renderBlobToCanvas(blob);
      };
      xhr.open('GET', url);
      xhr.send();

      // Or inserted into an <img> element
      // const img = document.getElementById('myimg');
      let img = createImg(url, 'img test');
      // img.setAttribute('src', url);
    })
    .catch((error) => {
      // Handle any errors
      console.log('demo_getDownloadURL error', error);
    });
}

// fixed cors using online gsutil
// https://stackoverflow.com/questions/37760695/firebase-storage-and-access-control-allow-origin
// https://console.cloud.google.com/welcome?project=molab-2022
// top right button "Activate Cloud Shell"
// [
//   {
//     "origin": ["*"],
//     "method": ["GET"],
//     "maxAgeSeconds": 3600
//   }
// ]
// gsutil cors set cors.json gs://molab-2022.appspot.com
// https://console.firebase.google.com/project/molab-2022/storage/molab-2022.appspot.com/files

// fix cors with
// https://firebase.google.com/docs/storage/web/download-files#cors_configuration

// demo_listAll url https://firebasestorage.googleapis.com/v0/b/molab-485f5.appspot.com/o/GNhzoQknS1OHY8DA1Fvygmltr902%2F1.jpeg?alt=media&token=acea55e8-08ba-45d9-9858-73eb604cf38a

// Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/v0/b/molab-485f5.appspot.com/o/GNhzoQknS1OHY8DA1Fvygmltr902%2F1.jpeg?alt=media&token=acea55e8-08ba-45d9-9858-73eb604cf38a'
// from origin 'http://127.0.0.1:5502' has been blocked by CORS policy:
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
//
// GET https://firebasestorage.googleapis.com/v0/b/molab-485f5.appspot.com/o/GNhzoQknS1OHY8DA1Fvygmltr902%2F1.jpeg?alt=media&token=acea55e8-08ba-45d9-9858-73eb604cf38a
// net::ERR_FAILED 200

let d_error;

// https://firebase.google.com/docs/storage/web/list-files#list_all_files
function demo_listAll(bucket) {
  console.log('demo_listAll bucket', bucket);
  let { storage, ref, listAll } = fireb_;
  // Create a reference under which you want to list
  // const listRef = ref(storage, 'oVFxc052pOWF5qq560qMuBmEsbr2');
  // const listRef = ref(storage, '');
  const listRef = ref(storage, bucket);
  console.log('listRef', listRef);
  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        // console.log('folderRef', folderRef);
        // console.log('folderRef.path', folderRef.path); // Defined
        // console.log('bucket', folderRef.bucket);
        console.log('prefix fullPath', folderRef.fullPath);
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        // console.log('itemRef', itemRef);
        console.log('item fullPath', itemRef.fullPath);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log('demo_listAll error', error);
      d_error = error;
    });
}

// https://firebase.google.com/docs/storage/web/list-files#paginate_list_results
function demo_list(bucket) {
  console.log('demo_list bucket', bucket);
  let { storage, ref, list } = fireb_;
  // Create a reference under which you want to list
  // const listRef = ref(storage, 'oVFxc052pOWF5qq560qMuBmEsbr2');
  // const listRef = ref(storage, '');
  const listRef = ref(storage, bucket);
  console.log('listRef', listRef);
  // Find all the prefixes and items.
  list(listRef, { maxResults: 100 })
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        // console.log('folderRef', folderRef);
        // console.log('folderRef.path', folderRef.path); // Defined
        // console.log('bucket', folderRef.bucket);
        console.log('prefix fullPath', folderRef.fullPath);
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        // console.log('itemRef', itemRef);
        console.log('item fullPath', itemRef.fullPath);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log('demo_list error', error);
      d_error = error;
    });
}

// fullPath GNhzoQknS1OHY8DA1Fvygmltr902/1.jpeg
// itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// 31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/1.jpeg
// 30 itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// 31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/1z.jpeg
// 30 itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// 31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/2.jpeg
// 30 itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// 31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/2z.jpeg
// 30 itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// 31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/3.jpeg
// 30 itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// 31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/3z.jpeg
