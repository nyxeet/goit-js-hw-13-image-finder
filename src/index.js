import './styles.css';
import apiService from './js/apiService';
import { debounce } from 'lodash';
import updateArticlesMarkup from './js/update-articles';
import LoadMoreBtn from './js/load-more-button';
import refs from './js/refs';

const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action = "load-more"]',
  hidden: true,
})

loadMoreBtn.refs.button.addEventListener('click', fetchImages);
refs.searchForm.addEventListener(
  'input',
  debounce(() => {
    searchFirstPageImages();
  }, 500),
);

function searchFirstPageImages(event) {
  apiService.query = refs.searchForm.value;
  clearImagesContainer();
  apiService.resetPage();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  apiService.fetchImages().then(hits => {
    updateArticlesMarkup(hits);
    loadMoreBtn.show();
    loadMoreBtn.enable();
  })
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}
