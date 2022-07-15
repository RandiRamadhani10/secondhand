import MockAdapter from 'axios-mock-adapter';
import apiClient from '../../src/services/api';
import {userData} from '../../src/utils/LoginData';
import {productsData} from '../../src/utils/ProductData';
import {NotifData} from '../../src/utils/NotificationData';

describe('API Integration Test', () => {
  const URL = 'https://market-final-project.herokuapp.com/';

  const dataUser = {
    email: 'johndoe@mail.com',
    password: '123456',
  };

  it('Auth Register', async () => {
    const mock = new MockAdapter(apiClient);
    mock.onPost(`${URL}auth/register`).reply(200, userData);

    const response = await apiClient.post(`${URL}auth/register`, dataUser);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(userData);
  });

  it('Auth Login', async () => {
    const mock = new MockAdapter(apiClient);
    mock.onPost(`${URL}auth/login`).reply(200, userData);

    const response = await apiClient.post(`${URL}auth/login`, {
      email: dataUser.email,
      password: dataUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.data).toEqual(userData);
  });

  it('Product List', async () => {
    const mock = new MockAdapter(apiClient);
    mock.onGet(`${URL}seller/product`).reply(200, productsData);

    const response = await apiClient.get(`${URL}seller/product`);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(productsData);
  });

  it('Get Product Name Sepatu', async () => {
    let mock = new MockAdapter(apiClient);

    mock.onGet(`${URL}seller/product?name=sepatu&limit=1`).reply(200, productsData[0]);
    const response = await apiClient.get('/seller/product?name=sepatu&limit=1');

    expect(response.status).toEqual(200);
    expect(response.data).toEqual(productsData[0]);
  });

  it('Notification List', async () => {
    const mock = new MockAdapter(apiClient);
    mock.onGet(`${URL}notification`).reply(200, NotifData);

    const response = await apiClient.get(`${URL}notification`);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(NotifData);
  });
});
