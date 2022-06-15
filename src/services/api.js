import Axios from 'axios';

const apiClient = Axios.create({
  baseURL: 'https://market-final-project.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default apiClient;
