import { PublicClientApplication } from '@azure/msal-browser';
export const configuration = {
  appId: 'aa9b76f3-f406-4669-904f-fff70fa660b2',
  redirectUri: '/',
  scopes: ['api://aa9b76f3-f406-4669-904f-fff70fa660b2/access_as_user'],
  authority: 'https://login.microsoftonline.com/e4202d55-d645-49e4-ae25-7ced9f98e618',
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
