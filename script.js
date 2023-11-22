// Function to open/close the gallery on click
function toggleGallery() {
  var dropdown = document.getElementById("myDropdown");
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}

// Function to open full-size image in overlay
function openImage(imageSrc) {
  document.getElementById("fullImage").src = imageSrc;
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("fullImageContainer").style.display = "block";
}

// Function to close full-size image overlay
function closeImage() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("fullImageContainer").style.display = "none";
}

