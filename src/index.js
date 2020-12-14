import './styles.css';
import imageService from './js/image-service';
import _, { debounce } from 'lodash';
import updateArticlesMarkup from './js/update-articles';
import refs from './js/refs';


refs.searchForm.addEventListener(
  'input',
  _.debounce(() => {
    searchFormSubmitHandler();
  }, 500),
);

function searchFormSubmitHandler(event) {
  imageService.query = refs.searchForm.value;
  clearImagesContainer();
  imageService.resetPage();
  fetchImages();
}

function fetchImages() {
  imageService.fetchImages().then(data => updateArticlesMarkup(data.hits))
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}
