import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBwe7XZHJjqOp2F779REb4wFZ-Xwc5RpzM",
  authDomain: "granplan-database.firebaseapp.com",
  databaseURL: "https://granplan-database.firebaseio.com",
  projectId: "granplan-database",
  storageBucket: "granplan-database.appspot.com",
  messagingSenderId: "809306430652",
};

const fire = firebase.initializeApp(config);
export default fire;
