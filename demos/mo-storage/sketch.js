// mo-storage

let my = {};

function setup() {
  console.log('mo-storage setup');

  my.cnv = createCanvas(200, 100);

  my.len = int(width / 20);

  demo_getDownloadURL();

  createButton('Upload').mousePressed(function () {
    demo_upload();
  });
  // show all
  // demo_listAll('');
  // show all items for this id
  // demo_listAll('oVFxc052pOWF5qq560qMuBmEsbr2');
}

function draw() {
  let cl = random(['red', 'green', 'yellow']);
  stroke(cl);
  strokeWeight(4);
  noFill();
  let w = my.len;
  let x = mouseX - (mouseX % my.len);
  let y = mouseY - (mouseY % my.len);
  circle(x, y, w);
}

// https://firebase.google.com/docs/storage/web/upload-files?authuser=0#upload_from_a_blob_or_file

function demo_upload() {
  console.log('demo_upload');

  let type = 'image/jpeg';
  let quality = 1;

  canvas.toBlob(
    (blob) => {
      demo_upload_blob(blob);
    },
    type,
    quality
  ); // JPEG at 95% quality
}

function demo_upload_blob(blob) {
  console.log('demo_upload_blob', blob);
  // import { getStorage, ref, uploadBytes } from "firebase/storage";

  let { getStorage, ref, uploadBytes } = fb_;

  let path = `/-mo-1/${fb_.auth.currentUser.uid}/000`;

  const storage = getStorage();
  const storageRef = ref(storage, path);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, blob)
    .then((snapshot) => {
      console.log('Uploaded a blob or file!');
      console.log('snapshot', snapshot);
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

function demo_getDownloadURL() {
  let { getStorage, ref, getDownloadURL } = fb_;
  const storage = getStorage();
  // getDownloadURL(ref(storage, 'GNhzoQknS1OHY8DA1Fvygmltr902/1.jpeg'))
  getDownloadURL(ref(storage, 'oVFxc052pOWF5qq560qMuBmEsbr2/386.jpeg'))
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
// https://stackoverflow.com/users/saves/22601444/all

// fix cors with
// https://firebase.google.com/docs/storage/web/download-files#cors_configuration

// demo_listAll url https://firebasestorage.googleapis.com/v0/b/molab-485f5.appspot.com/o/GNhzoQknS1OHY8DA1Fvygmltr902%2F1.jpeg?alt=media&token=acea55e8-08ba-45d9-9858-73eb604cf38a

// Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/v0/b/molab-485f5.appspot.com/o/GNhzoQknS1OHY8DA1Fvygmltr902%2F1.jpeg?alt=media&token=acea55e8-08ba-45d9-9858-73eb604cf38a'
// from origin 'http://127.0.0.1:5502' has been blocked by CORS policy:
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
//
// sketch.js?v=9:30     GET https://firebasestorage.googleapis.com/v0/b/molab-485f5.appspot.com/o/GNhzoQknS1OHY8DA1Fvygmltr902%2F1.jpeg?alt=media&token=acea55e8-08ba-45d9-9858-73eb604cf38a
// net::ERR_FAILED 200

// https://firebase.google.com/docs/storage/web/list-files#list_all_files
function demo_listAll(bucket) {
  let { getStorage, ref, listAll } = fb_;
  const storage = getStorage();
  // Create a reference under which you want to list
  // const listRef = ref(storage, 'oVFxc052pOWF5qq560qMuBmEsbr2');
  // const listRef = ref(storage, '');
  const listRef = ref(storage, bucket);
  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        console.log('folderRef', folderRef);
        // console.log('folderRef.path', folderRef.path); // Defined
        console.log('bucket', folderRef.bucket);
        console.log('fullPath', folderRef.fullPath);
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log('itemRef', itemRef);
        console.log('fullPath', itemRef.fullPath);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log('demo_listAll error', error);
    });
}

// fullPath GNhzoQknS1OHY8DA1Fvygmltr902/1.jpeg
// itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// sketch.js?v=9:31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/1.jpeg
// sketch.js?v=9:30 itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// sketch.js?v=9:31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/1z.jpeg
// sketch.js?v=9:30 itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// sketch.js?v=9:31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/2.jpeg
// sketch.js?v=9:30 itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// sketch.js?v=9:31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/2z.jpeg
// sketch.js?v=9:30 itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// sketch.js?v=9:31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/3.jpeg
// sketch.js?v=9:30 itemRef Reference {_service: FirebaseStorageImpl, _location: Location}
// sketch.js?v=9:31 fullPath GNhzoQknS1OHY8DA1Fvygmltr902/3z.jpeg
