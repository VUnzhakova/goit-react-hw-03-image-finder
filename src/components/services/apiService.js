import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '26822477-37777a4b7ae353e09425d001d',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const apiService = async (page = 1, q = '') => {
  const { data } = await instance.get('/', {
    params: {
      page,
      q,
    },
  });
  return data;
};
