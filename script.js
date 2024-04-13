const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Unsplash API
let imageCount = 5;
const apiKey = "jT2deC92ioe1km2Yn43KXQasp7iQzfeMcyoQYW8WSB4";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}&orientation=landscape&color=black_and_white`;

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
  } catch (error) {}
}
getPhotos();

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.map((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    /*
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    */
    // with helper function
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> for each photo
    const img = document.createElement("img");
    /*
    img.setAttribute("src", photo.urls.full);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    */
    // with helper function
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imageCount = 30;
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
