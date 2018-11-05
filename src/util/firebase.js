import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAvJsq5XOE4fSPuROrwORtJEG3tU8F-F8M",
  authDomain: "showdictionary-eaa3c.firebaseapp.com",
  databaseURL: "https://showdictionary-eaa3c.firebaseio.com",
  projectId: "showdictionary-eaa3c",
  storageBucket: "showdictionary-eaa3c.appspot.com",
  messagingSenderId: "1004206610400"
};
firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch(function(error) {
  console.log(error.code, error.message)
});

export default firebase;