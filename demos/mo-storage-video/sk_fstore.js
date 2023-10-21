// https://firebase.google.com/docs/storage/web/upload-files?authuser=0#upload_from_a_blob_or_file

function fstore_upload() {
  // console.log('fstore_upload');
  my.layer.elt.toBlob(
    (blob) => {
      fstore_upload_blob(blob);
    },
    my.type,
    my.imageQuality
  );
}

function next_imagePath(seq) {
  // return `${my.rootPath}/${fb_.auth.currentUser.uid}/001${my.ext}`;
  let nums = (my[seq] + 1).toString().padStart(my.image_seq_pad, '0');
  my[seq] = (my[seq] + 1) % my.image_seq_max;
  return `${my.rootPath}/${nums}${my.ext}`;
}
function fstore_upload_blob(blob) {
  // console.log('fstore_upload_blob', blob);
  let { storage, ref, uploadBytes } = fb_.fstore;

  // let path = `/-mo-1/${fb_.auth.currentUser.uid}/000`;
  my.imagePath = next_imagePath('image_seq_up');
  console_dlog('fstore_upload_blob my.imagePath ' + my.imagePath);
  const storageRef = ref(storage, my.imagePath);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, blob)
    .then((snapshot) => {
      // console_dlog('snapshot.metadata.fullPath ' + snapshot.metadata.fullPath);
      // console.log('snapshot', snapshot);
      // console.log('Uploaded path', path);
    })
    .catch((error) => {
      // Handle any errors
      console.log('fstore_upload_blob error', error);
    });
}

// https://stackoverflow.com/questions/38004917/how-to-render-a-blob-on-a-canvas-element
// HTMLCanvasElement.prototype.renderImage = function(blob) {

function renderBlobToCanvas(blob) {
  let canvas = my.canvas.elt;
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(img.src);
  };
  img.src = URL.createObjectURL(blob);
}

function fstore_download(path) {
  // console.log('fstore_getDownloadURL path', path);
  if (!path) {
    path = next_imagePath('image_seq_down');
  }
  console.log('fstore_download next_imagePath ' + path);
  let { storage, ref, getDownloadURL } = fb_.fstore;
  getDownloadURL(ref(storage, path))
    .then((url) => {
      // `url` is the download URL for '1.jpeg'
      // console_dlog('fstore_download url', url);

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
        // console_dlog('fstore_download blob ' + blob);
        renderBlobToCanvas(blob);
      };
      xhr.open('GET', url);
      xhr.send();

      // Or inserted into an <img> element
      // let img = createImg(url, 'img test');
      // img.setAttribute('src', url);
    })
    .catch((error) => {
      // Handle any errors
      console.log('fstore_getDownloadURL error', error);
    });
}

function fstore_getDownloadURL(path) {
  // console.log('fstore_getDownloadURL path', path);
  if (!path) {
    path = next_imagePath('image_seq_down');
    console.log('fstore_getDownloadURL next_imagePath', path);
  }
  let { storage, ref, getDownloadURL } = fb_.fstore;
  getDownloadURL(ref(storage, path))
    .then((url) => {
      // `url` is the download URL for '1.jpeg'
      console.log('fstore_getDownloadURL url', url);

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
        console.log('fstore_getDownloadURL blob', blob);
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
      console.log('fstore_getDownloadURL error', error);
    });
}

// https://firebase.google.com/docs/storage/web/list-files#list_all_files
function fstore_listAll(bucket) {
  console.log('fstore_listAll bucket', bucket);
  let { storage, ref, listAll } = fb_.fstore;
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
      console.log('fstore_listAll error', error);
    });
}

// https://firebase.google.com/docs/storage/web/list-files#paginate_list_results
function fstore_list(bucket) {
  console.log('fstore_list bucket', bucket);
  let { storage, ref, list } = fb_.fstore;
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
      console.log('fstore_list error', error);
    });
}
