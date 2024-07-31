import { fetchImages } from './js/pixabay-api.js';
import { createGalleryMarkup, showError } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements['query'].value.trim();

  if (!query) {
    showError('Search field cannot be empty');
    return;
  }

  loader.style.display = 'flex';

  try {
    const images = await fetchImages(query);

    if (images.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      gallery.innerHTML = '';
    } else {
      gallery.innerHTML = createGalleryMarkup(images);
      lightbox?.destroy();
      lightbox = new SimpleLightbox('.gallery-link', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    }
  } catch (error) {
    showError('Failed to fetch images');
  } finally {
    loader.style.display = 'none';
    form.reset();
  }
});
