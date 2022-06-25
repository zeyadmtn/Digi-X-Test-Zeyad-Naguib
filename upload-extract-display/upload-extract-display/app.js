(function test() {
  const inpFile = document.querySelector("#inpFile");


  inpFile.addEventListener("change", (e) => {


    var files = [];
    


    var jsZip = new JSZip();
    jsZip.loadAsync(inpFile.files[0]).then(function (zip) {
        Object.keys(zip.files).forEach(function (filename) {
          zip.files[filename].async('ArrayBuffer').then(function (fileData) {
            var arrayBufferView = new Uint8Array(fileData);
            var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
            var urlCreator = window.URL || window.webkitURL;
            files.push(urlCreator.createObjectURL( blob ));
            console.log(files);
          })
        })
      })

      

  });
})();
