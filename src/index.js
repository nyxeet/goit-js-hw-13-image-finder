import './styles.css';
import imageService from './js/image-service';
import _, { debounce } from 'lodash';
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
  _.debounce(() => {
    searchFirstPageImages();
  }, 500),
);

function searchFirstPageImages(event) {
  imageService.query = refs.searchForm.value;
  clearImagesContainer();
  imageService.resetPage();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  imageService.fetchImages().then(hits => {
    updateArticlesMarkup(hits);
    loadMoreBtn.show();
    loadMoreBtn.enable();
  })
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}
