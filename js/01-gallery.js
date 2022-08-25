import { galleryItems } from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".gallery"),
  galleryItem: document.querySelector(".gallery__item"),
  galleryLink: document.querySelector(".gallery__link"),
  galleryImage: document.querySelector(".gallery__image"),
};

addMarkup(galleryItems);

function addMarkup(items) {
  refs.gallery.innerHTML = createMarkup(items);
}

function createMarkup(items) {
  return items.map((element) => createElementMarkup(element)).join("");
}

function createElementMarkup(element) {
  return `<div class="gallery__item">
  <a class="gallery__link" href="${element.original}">
    <img
      class="gallery__image"
      src="${element.preview}"
      data-source="${element.original}"
      alt="${element.description}"
    />
  </a>
</div>`;
}

refs.gallery.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(evt) {
  if (!evt.target.closest(".gallery__link")) {
    return;
  }
  evt.preventDefault();
  const largeImageRef = evt.target.dataset.source;
  openModal(largeImageRef);
}

const content = `<img src="" width="800" height="600" class="modal__image">`;
const options = {
  onShow: () => document.addEventListener("keydown", closeModal),
  onClose: () => document.removeEventListener("keydown", closeModal),
};
const modal = basicLightbox.create(content, options);

function openModal(largeImageRef) {
  modal.show();
  const modalImage = document.querySelector(".modal__image");
  modalImage.setAttribute("src", `${largeImageRef}`);
}

function closeModal(evt) {
  if (evt.key === "Escape") {
    modal.close();
  }
}
