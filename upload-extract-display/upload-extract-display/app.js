const inpFile = document.querySelector("#inpFile");
const imagesDiv = document.querySelector(".images-container");
const inpFileForm = document.querySelector(".inputFileForm");
const imagesDisplayed = document.querySelectorAll("imgElement");
const inpFormNoImagesFoundTxt = document.querySelector(
  ".append-images-here :nth-child(1)"
);
const imagesContainer = document.querySelector(".append-images-here");
// Select the necessary documents to use for later.

(function handleUploadedZip() {
  // Form submit listener is added instead of input change listener because we want the submit button to be the one that fires the function.
  inpFileForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page from refreshing unnecessarily

    /* Alert the user if the input file is not a zip.
    "Accept" attribute in the HTML is simply a suggestiona and does not stop the user from uploading non-zip formats
    Therefore this check is needed. */

    if (!inpFile.files[0].type.includes("zip")) {
      alert(
        "Error: only .Zip files are accepted, please upload the file with correct format!"
      );
      location.reload();
    }

    var jsZip = new JSZip(); // Using JSZip, a simple JS plugin that extracts ZIP files,

    /* Here, the loadAsync is a JSZIP function that loads the ZIP file gathered from HTML input form.
    It then extracts the zip file and extract the zip file keys into an ArrayBuffer, which is then
    converted to a jpeg img and stored in a blob.
    Then the displayImg function displays each image respectively. */

    jsZip.loadAsync(inpFile.files[0]).then(function (zip) {
      Object.keys(zip.files).forEach(function (filename) {
        zip.files[filename].async("ArrayBuffer").then(function (fileData) {
          var arrayBufferView = new Uint8Array(fileData);
          var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
          var urlCreator = window.URL || window.webkitURL;
          url = urlCreator.createObjectURL(blob);
          displayImg(url);
        });
      });
    });
  });
})();

/* This function was separated to allow for easier code readability.
   If the images were required to be used in some other way, then suggestion to use a
   a filesURL array and store each URL there, then wrap the unzip function in a promise or async
 Rather than sending the url to the display right away. */

const displayImg = (url) => {
  inpFormNoImagesFoundTxt.style.display = "none";
  let imgElement = document.createElement("img");
  imgElement.className = "imgElement";
  imgElement.src = url;
  imagesContainer.appendChild(imgElement);
};
