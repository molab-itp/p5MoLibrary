function ui_init() {
  createButton('SignIn').mousePressed(function () {
    store_signIn();
  });

  // createButton('ListAll').mousePressed(function () {
  //   // store_listAll(my.rootPath);
  //   store_listAll('');
  //   // store_listAll('oVFxc052pOWF5qq560qMuBmEsbr2');
  // });

  createButton('List').mousePressed(function () {
    store_list(my.rootPath);
    // store_list('');
    // store_list('oVFxc052pOWF5qq560qMuBmEsbr2');
  });

  createButton('Download').mousePressed(function () {
    // store_getDownloadURL('oVFxc052pOWF5qq560qMuBmEsbr2/129.jpeg');
    // store_getDownloadURL('/-mo-1-@w-/mY5kp2xDNRWJG7dYAWXOFfwIwZD3/001');
    // store_getDownloadURL('-mo-1-@w-/y29ShmiYYNST4KUKK7G76db6k4H2/001.png');
    // -mo-1-@w-/y29ShmiYYNST4KUKK7G76db6k4H2
    store_getDownloadURL();
  });

  createButton('Upload').mousePressed(function () {
    store_upload();
  });

  createElement('br');
}
