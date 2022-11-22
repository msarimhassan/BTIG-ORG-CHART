import { PublicClientApplication } from '@azure/msal-browser';
export const configuration = {
    appId: 'eead2ff1-122d-4397-bcef-13de993bc8cc',
    redirectUri: '/',
    scopes: ['api://eead2ff1-122d-4397-bcef-13de993bc8cc/access_via_approle_assignments'],
    authority: 'https://login.microsoftonline.com/0d4e2c53-ba4c-40c7-9648-f59d221da571',
};

const publicClientApplication = new PublicClientApplication({
    auth: {
        clientId: configuration.appId,
        redirectUri: configuration.redirectUri,
        authority: configuration.authority,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true,
    },
});

export default publicClientApplication;