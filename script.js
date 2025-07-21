// JavaScript to toggle gallery visibility
const galleryButton = document.querySelector('.galleryButton');
const gallery = document.getElementById('gallery');
let galleryVisible = false; // Track gallery visibility

galleryButton.addEventListener('click', toggleGallery);

function toggleGallery() {
  galleryVisible = !galleryVisible; // Toggle gallery visibility
  if (galleryVisible) {
    gallery.style.display = 'block';
    loadImages();
    galleryButton.textContent = 'Hide Gallery';
  } else {
    gallery.style.display = 'none';
    galleryButton.textContent = 'Show Gallery';
  }
}

// Function to load images dynamically
function loadImages() {
  const imagePaths = [
    'Pictures/Laptop1.jpg',
    'Pictures/Laptop2.jpg',
    'Pictures/PXL_20250323_160322465.jpg',
    'Pictures/7C3D60D1.png',
    'Pictures/90F0C5E6.png',
    'Pictures/20221004_120102_52451203335_o.jpg',
    'Pictures/20230724_175008_53069450409_o.jpg',
    'Pictures/345395045_170564368972787_6665234763286219141_n.jpg',
    'Pictures/355629772_244930084928187_1855928167094146817_n..jpg',
    'Pictures/fb_20150313_18_04_30_saved_picture_51326593041_o.jpg',
    'Pictures/fb_20150313_18_05_11_saved_picture_51326796233_o.jpg',
    'Pictures/fb_20150313_18_05_19_saved_picture_51326796243_o.jpg',
    'Pictures/fb_20150313_18_05_27_saved_picture_51326593076_o.jpg',
    'Pictures/fb_20150313_18_05_35_saved_picture_51327586415_o.jpg',
    'Pictures/fb_20150313_18_05_44_saved_picture_51327586465_o.jpg',
    'Pictures/fb_20150313_18_05_48_saved_picture_51326593111_o.jpg',
    'Pictures/fb_20150313_18_05_53_saved_picture_51325859672_o.jpg',
    'Pictures/fb_20150313_18_06_08_saved_picture_51326593121_o.jpg',
    'Pictures/fb_20150313_18_06_11_saved_picture_51326593136_o.jpg',
    'Pictures/fb_20150313_18_06_15_saved_picture_51326593146_o.jpg',
    'Pictures/fb_20150313_18_06_26_saved_picture_51327316319_o.jpg',
    'Pictures/fb_20150313_18_06_31_saved_picture_51327586520_o.jpg',
    'Pictures/fb_20150313_18_06_57_saved_picture_51327586525_o.jpg',
    'Pictures/fb_20150313_18_07_05_saved_picture_51327586535_o.jpg',
    'Pictures/fb_20150313_18_07_13_saved_picture_51325859702_o.jpg',
    'Pictures/img_1673_51326796338_o.jpg',
    'Pictures/img_20190525_152829_51327316514_o.jpg',
    'Pictures/img_20190525_155627_51327586745_o.jpg',
    'Pictures/img_20220607_074132_52129919165_o.jpg',
    'Pictures/img_9608_51326796353_o.jpg',
    'Pictures/img_9609_51327586580_o.jpg',
    'Pictures/mclsulb_51326802273_o.jpg',
    'Pictures/my-laptop_52017362697_o.jpg',
    'Pictures/pxl_20211129_013117201_51815277150_o.jpg',
    'Pictures/pxl_20211204_181140704_51813597007_o.jpg',
    'Pictures/pxl_20220607_001435630_52129919140_o.jpg',
    'Pictures/pxl_20220607_002716509_52129919150_o.jpg',
    'Pictures/PXL_20221202_204454125.jpg',
    'Pictures/PXL_20221203_051025900.jpg',
    'Pictures/PXL_20221203_160930924.jpg',
    'Pictures/PXL_20221228_222816583~2.jpg',
    'Pictures/pxl_20230508_003704126_53069653555_o.jpg',
    'Pictures/pxl_20230508_003709543_53069758848_o.jpg',
    'Pictures/pxl_20230508_004156096_53069451774_o.jpg',
    'Pictures/pxl_20230508_004200396_53069257256_o.jpg',
    'Pictures/PXL_20230514_003432146.jpg',
    'Pictures/PXL_20230618_214610864.jpg',
    'Pictures/rivulq9_51327322214_o.jpg',
    'Pictures/tweaked-the-crap-out-of-the-atom-ide_52018444358_o.png',
    'Pictures/unknown-1_51713771065_o.png',
    'Pictures/v__2f3b_51327586785_o.jpg',
    'Pictures/v__e513_51327316384_o.jpg',
    'Pictures/wp_20150317_001_51326593391_o.jpg',
    'Pictures/wp_20160905_17_25_44_pro_51327316409_o.jpg',
    'Pictures/wp_20160905_17_26_42_rich_51326796458_o.jpg',
    'Pictures/wp_20160905_17_26_57_rich_51327586695_o.jpg',
    'Pictures/wtavvym_51326802258_o.jpg',
    'Pictures/xfce-my-retro-ms-dos-theme-for-xubuntu_52017360277_o.jpg',
  ];
  
  
const galleryContainer = document.getElementById('gallery');
  galleryContainer.innerHTML = '';

  imagePaths.forEach(path => {
    const img = document.createElement('img');
    img.src = path;
    img.classList.add('gallery-image'); // Add a class for easier selection
    galleryContainer.appendChild(img);

    // Add click event listener to each image
    img.addEventListener('click', function() {
      toggleFullSizeImageDisplay(img, path); // Function to toggle full-size image display
    });
  });
}

// Function to toggle display of full-size image
function toggleFullSizeImageDisplay(imgElement, path) {
  window.open(path, '_blank'); // Open the image in a new tab/window
}

