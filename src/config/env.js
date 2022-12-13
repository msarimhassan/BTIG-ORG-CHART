import { create } from 'apisauce';

export const SEQSERVERURL = 'https://seq-dev.btig.corp/';
export const SEQSERVERAPIKEY = 'wCP3b8ye3O6YULE5hm6D';

let baseURL = null;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //Development
  baseURL = 'https://org-chart.btig.dev/api/';
} else {
  //Production
  baseURL = 'http://org-chart-backend.btig.svc.cluster.local/';
}

const client = create({
  baseURL,
});

export const config = async () => {
  const token = localStorage.getItem('org-token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };
};
export const authConfig = async (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };
};

export const multipartConfig = async () => {
  const token = localStorage.getItem('AC-Token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'multipart/form-data',
    },
  };
};

const responseMonitor = (response) => {
  if (response.status === 401) {
    localStorage.clear();
    alert('Unauthorized');
    window.location.href = '/';
  }
};

client?.addMonitor(responseMonitor);

export default client;
