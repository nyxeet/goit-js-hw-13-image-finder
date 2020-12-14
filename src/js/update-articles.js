import countryTpl from '../templates/full-country.hbs';
import refs from './refs';
import { info, error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

function updateArticlesMarkup(images) {
  console.log(images)
  const markup = countryTpl(images);
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);

}

export default updateArticlesMarkup;
