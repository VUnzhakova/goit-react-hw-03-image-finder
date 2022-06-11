import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '26822477-37777a4b7ae353e09425d001d';

const fetchImages = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
  const params = {
    key: KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: pageSize,
  };

  return axios({ params }).then(response => response.data);
};
export default fetchImages;
