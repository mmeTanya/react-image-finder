const baseUrl = 'https://pixabay.com/api';
const API_KEY = '24832608-305c442589436875a767f01eb';

export async function FetchImages(query, page) {
  try {
    const response = await fetch(
      `${baseUrl}/?q=${query}&page=${page}&key=${API_KEY}&per_page=12&image_type=photo&orientation=horizontal`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(new Error('Oops, something went wrong !'));
  }
}
