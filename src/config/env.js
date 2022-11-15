import { create } from 'apisauce';

const baseURL = ' https://fake-app-backend.herokuapp.com/api/';

const client = create({
    baseURL,
});

export const config = async () => {
    return {
        headers: {
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

export const multipartConfig = async (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'multipart/form-data',
        },
    };
};

export default client;
