import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4W5OAUeafRbu8HPI8gZ_uLpfW0i1NTUA",
    authDomain: "findspy-app.firebaseapp.com",
    projectId: "findspy-app",
    storageBucket: "findspy-app.appspot.com",   // ← KORRIGJIMI
    messagingSenderId: "277759569226",
    appId: "1:277759569226:web:752895872bfb1f8b4ee5b3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
