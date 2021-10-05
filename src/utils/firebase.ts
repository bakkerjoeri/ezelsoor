import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({});

const auth = firebase.auth();
const database = firebase.firestore();
database.enablePersistence();

export { auth, database };
