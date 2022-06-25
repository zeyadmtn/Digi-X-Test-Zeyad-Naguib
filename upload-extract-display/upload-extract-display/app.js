const inpFile = document.querySelector("#inpFile");
const imagesDiv = document.querySelector('.images-container');

(function test() {



  inpFile.addEventListener("change", (e) => {


        var jsZip = new JSZip();
 
        jsZip.loadAsync(inpFile.files[0]).then(function (zip) {
            Object.keys(zip.files).forEach(function (filename) {
              zip.files[filename].async('ArrayBuffer').then(function (fileData) {
                var arrayBufferView = new Uint8Array(fileData);
                var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                var urlCreator = window.URL || window.webkitURL;
                url = urlCreator.createObjectURL( blob );
                displayImg(url);
                
  
              })
            })
            
          })

  });
})();

 const displayImg = (url) => {
    let imgElement = document.createElement("img");
    imgElement.className = 'imgElement';
    imgElement.src = url;
    imagesDiv.appendChild(imgElement);
}
