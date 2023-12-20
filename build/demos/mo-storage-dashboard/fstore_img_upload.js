// https://firebase.google.com/docs/storage/web/upload-files?authuser=0#upload_from_a_blob_or_file

function fstore_img_upload() {
  // console.log('fstore_img_upload');
  let count = my.count;
  my.layer.elt.toBlob(
    (blob) => {
      fstore_img_upload_blob(blob, count);
    },
    my.imageType,
    my.imageQuality
  );
}

function fstore_img_upload_blob(blob, count) {
  // console.log('fstore_img_upload_blob', blob);
  let { storage, ref, uploadBytes } = fb_.fstore;
  // let path = `/-mo-1/${fb_.auth.currentUser.uid}/000`;
  my.imagePath = next_imagePath(count);
  // ui_log('fstore_img_upload_blob my.imagePath', my.imagePath);
  const storageRef = ref(storage, my.imagePath);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, blob)
    .then((snapshot) => {
      // ui_log('snapshot.metadata.fullPath ' + snapshot.metadata.fullPath);
      // console.log('snapshot', snapshot);
      // console.log('Uploaded path', path);
      ui_log('upload ', my.imagePath);
    })
    .catch((error) => {
      // Handle any errors
      ui_error('fstore_img_upload_blob error', error);
    });
}

function next_imagePath(count) {
  // console.log('next_imagePath');
  let str = (count + my.count_base + 1).toString().padStart(my.image_seq_pad, '0');
  return `${my.dbStoreRootPath}/${my.clipsName}/${str}${my.imagExt}`;
}
