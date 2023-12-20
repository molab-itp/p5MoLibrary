// https://firebase.google.com/docs/storage/web/list-files#list_all_files
function fstore_listAll(bucket) {
  // console.log('fstore_listAll bucket', bucket);
  let { storage, ref, listAll } = fb_.fstore;
  bucket = bucket || my.dbStoreRootPath;
  console.log('fstore_listAll bucket', bucket);
  // Create a reference under which you want to list
  // const listRef = ref(storage, 'oVFxc052pOWF5qq560qMuBmEsbr2');
  // const listRef = ref(storage, '');
  const listRef = ref(storage, bucket);
  // console.log('listRef', listRef);
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
      ui_error('fstore_listAll error', error);
    });
}

// https://firebase.google.com/docs/storage/web/list-files#paginate_list_results
function fstore_list(bucket) {
  console.log('fstore_list bucket', bucket);
  let { storage, ref, list } = fb_.fstore;
  bucket = bucket || my.dbStoreRootPath;
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
      ui_error('fstore_list error', error);
    });
}
