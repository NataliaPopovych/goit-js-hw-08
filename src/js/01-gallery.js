
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('ul.gallery');
const gallaryItem = createGallaryItem(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', gallaryItem);

galleryContainer.addEventListener('click', ongalleryContainerClick);

// Create the gallary
const gallery = new SimpleLightbox('.gallery__item a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function createGallaryItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
			<li class="gallery__item">
				<a class="gallery__link" href="${original}">
				<img class="gallery__image" src="${preview}" alt="${description}"/>
				</a>
			</li>
			`;
    })
    .join('');
}

function ongalleryContainerClick(evt) {
  // Canceling standard actions
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  // Close and refresh the gallary
  gallery.on('closed.simplelightbox', () => {
    gallery.refresh();
  });
}
