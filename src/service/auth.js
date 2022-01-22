import firebase from '../Config/firebase-config';

//Methode d'authentification utilisant firebase de Google
const socialMediaAuth = (provider) => {
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
            return res.user;
        })
        .catch((er) => {
            return er;
        })
};

export default socialMediaAuth; 