import { create } from 'apisauce';

let baseURL = null;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //Development
  baseURL = 'https://org-chart-api.btig.dev/';
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

export default client;
