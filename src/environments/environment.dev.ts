import { keys } from '../../key-values';

export const environment = {
  production: false,
  firebase: {
    projectId: keys.projectId,
    appId: keys.appId,
    databaseURL: keys.databaseURL,
    storageBucket: keys.storageBucket,
    apiKey: keys.apiKey,
    authDomain: keys.authDomain,
    messagingSenderId: keys.messagingSenderId,
    measurementId: keys.measurementId,
  },
  FB_CONFIG: {
    appId: 'your-app-id',
    xfbml: true,
    version: 'v18.0'
  }
};