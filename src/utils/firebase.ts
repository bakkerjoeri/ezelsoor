import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import getFirebaseConfig from "./getFirebaseConfig";

const firebaseApp = initializeApp(getFirebaseConfig());
const auth = getAuth(firebaseApp);
const database = getFirestore(firebaseApp);

enableIndexedDbPersistence(database);

export { auth, database };
