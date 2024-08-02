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
let query = '';

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
  query = event.target.elements['query'].value.trim();
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
      buttonService.hide();
    } else {
      gallery.innerHTML = createGalleryMarkup(images);
      lightbox?.destroy();
      lightbox = new SimpleLightbox('.gallery-link', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      totalHits = images.length;
      buttonService.show();
      if (totalHits < 15) {
        buttonService.hide();
        showError("We're sorry, but you've reached the end of search results.");
      }
    }
  } catch (error) {
    showError('Failed to fetch images');
  } finally {
    loader.style.display = 'none';
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loader.style.display = 'flex';

  try {
    const images = await fetchImages(query, currentPage);

    if (images.length === 0) {
      buttonService.hide();
      showError('На жаль, ви досягли кінця результатів пошуку.');
    } else {
      gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(images));
      lightbox?.destroy();
      lightbox = new SimpleLightbox('.gallery-link', {
        captionsData: 'alt',
        captionDelay: 250,
      });

      const { height: cardHeight } = document
        .querySelector('.gallery-image')
        .getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      totalHits += images.length;
      if (totalHits >= 15 * currentPage) {
        buttonService.hide();
        showError('На жаль, ви досягли кінця результатів пошуку.');
      }
    }
  } catch (error) {
    showError('Не вдалося завантажити зображення');
  } finally {
    loader.style.display = 'none';
  }
});
