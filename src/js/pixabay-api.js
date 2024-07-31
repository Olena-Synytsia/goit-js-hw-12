import axios from 'axios';

const API_KEY = '45098988-0aca0e44808ea00320f5f0e3c';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data.hits;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}
