import { keys } from "key-values";

export const environment = {
  production: false,
  firebaseConfig: {
    projectId: keys.projectId,
    appId: keys.appId,
    databaseURL: keys.databaseURL,
    storageBucket: keys.storageBucket,
    apiKey: keys.apiKey,
    authDomain: keys.authDomain,
    messagingSenderId: keys.messagingSenderId,
    measurementId: keys.measurementId,
  },
};