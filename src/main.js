import { fetchImages } from './js/pixabay-api.js';
import { createGalleryMarkup, showError } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
let lightbox;
let currentPage = 1;
let totalHits = 0;

class ButtonService {
  constructor(buttonEl, hiddenClass) {
    this.buttonEl = buttonEl;
    this.hiddenClass = hiddenClass;
  }
  hide() {
    this.buttonEl.classList.add(this.hiddenClass);
  }
  show() {
    this.buttonEl.classList.remove(this.hiddenClass);
  }
  disable() {
    this.buttonEl.disabled = true;
  }
  enable() {
    this.buttonEl.disabled = false;
  }
}

const buttonService = new ButtonService(loadMoreBtn, 'is-hidden');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements['query'].value.trim();
  currentPage = 1;

  if (!query) {
    showError('Search field cannot be empty');
    return;
  }

  loader.style.display = 'flex';
  buttonService.hide();

  try {
    const images = await fetchImages(query, currentPage);

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
      totalHits = images.length;
      buttonService.show();
    }
  } catch (error) {
    showError('Failed to fetch images');
  } finally {
    loader.style.display = 'none';
    form.reset();
  }
});

console.log(buttonService);
console.dir(loadMoreBtn);
