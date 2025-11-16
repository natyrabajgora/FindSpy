// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4W5OAUeafRbu8HPI8gZ_uLpfW0i1NTUA",
    authDomain: "findspy-app.firebaseapp.com",
    projectId: "findspy-app",
    storageBucket: "findspy-app.firebasestorage.app",
    messagingSenderId: "277759569226",
    appId: "1:277759569226:web:752895872bfb1f8b4ee5b3",
    measurementId: "G-KEGB55K3CS"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);