import firebase from './firebase-config';

//export const microsoftProvider = new firebase.auth.MicrosoftAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();