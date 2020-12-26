// ключ API
const keyApi = '18681025-f668a3aca189dfba87ba57015';

function fetchImages(searchQuery, currentPage) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${keyApi}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(responce => responce.json());
}

const api = {
  fetchImages,
};

export default api;
