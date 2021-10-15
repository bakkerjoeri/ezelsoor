import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import getFirebaseConfig from "./getFirebaseConfig";

console.log(getFirebaseConfig());

const firebaseApp = initializeApp(getFirebaseConfig());
const auth = getAuth(firebaseApp);
const database = getFirestore(firebaseApp);

export { auth, database };
