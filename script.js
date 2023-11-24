// JavaScript to toggle gallery visibility
const showGalleryBtn = document.getElementById('showGalleryBtn');
const gallery = document.getElementById('gallery');
let galleryVisible = false; // Track gallery visibility

showGalleryBtn.addEventListener('click', function() {
  galleryVisible = !galleryVisible; // Toggle gallery visibility
  if (galleryVisible) {
    gallery.style.display = 'block';
    loadImages();
    showGalleryBtn.textContent = 'Hide Gallery';
  } else {
    gallery.style.display = 'none';
    showGalleryBtn.textContent = 'Show Gallery';
  }
});

// Function to load images dynamically (unchanged)
function loadImages() {
  const imagePaths = [
    'Pictures/20221004_120102_52451203335_o.jpg',
    'Pictures/20230724_175008_53069450409_o.jpg',
    // Add more image paths as needed
  ];

  const galleryContainer = document.getElementById('gallery');
  galleryContainer.innerHTML = '';

  imagePaths.forEach(path => {
    const img = document.createElement('img');
    img.src = path;
    galleryContainer.appendChild(img);
  });
}
