import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB7V8B6JSHBGf46NUp261JK0Qi1YJQWC2I",
  authDomain: "crwn-db-b2965.firebaseapp.com",
  databaseURL: "https://crwn-db-b2965.firebaseio.com",
  projectId: "crwn-db-b2965",
  storageBucket: "crwn-db-b2965.appspot.com",
  messagingSenderId: "586363160492",
  appId: "1:586363160492:web:112ce045369ae4de569c09",
  measurementId: "G-9FTYKD2Y9R"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;