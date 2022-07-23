import Axios from 'axios';

const apiClient = Axios.create({
  baseURL: 'https://market-final-project.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 1000 * 10,
});
// test tetet
export default apiClient;
