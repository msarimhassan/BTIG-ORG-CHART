import client from './env';

const Network = {
  get: async (url, headers, data) => {
    client.setHeaders(headers);
    return await client.get(url, data);
  },
  post: async (url, data, headers) => {
    client.setHeaders(headers);
    return await client.post(url, data);
  },
  put: async (url, data, headers) => {
    client.setHeaders(headers);
    return await client.put(url, data);
  },
  patch: async (url, data, headers) => {
    client.setHeaders(headers);
    return await client.patch(url, data);
  },
  delete: async (url, data, headers) => {
    client.setHeaders(headers);
    return await client.delete(url, data);
  },
};

export default Network;
