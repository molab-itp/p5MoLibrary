// mo-storage

function setup() {
  console.log('mo-storage setup');

  demo_getDownloadURL();

  // demo_listAll();
}

let a_blob;

function demo_getDownloadURL() {
  const storage = fb_.getStorage();
  fb_
    .getDownloadURL(fb_.ref(storage, 'GNhzoQknS1OHY8DA1Fvygmltr902/1.jpeg'))
    .then((url) => {
      // `url` is the download URL for '1.jpeg'
      console.log('demo_listAll url', url);

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
        a_blob = blob;
        console.log('demo_listAll blob', blob);
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
      console.log('demo_listAll error', error);
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
function demo_listAll() {
  const storage = fb_.getStorage();
  // Create a reference under which you want to list
  const listRef = fb_.ref(storage, 'GNhzoQknS1OHY8DA1Fvygmltr902');
  // const listRef = fb_.ref(storage, '');
  // Find all the prefixes and items.
  fb_
    .listAll(listRef)
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
