import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCb8Z2Tw7rglyJ9BbA7Iu73celNP7ceCT0",
    authDomain: "cms-ticlet-sale.firebaseapp.com",
    projectId: "cms-ticlet-sale",
    storageBucket: "cms-ticlet-sale.appspot.com",
    messagingSenderId: "793027181053",
    appId: "1:793027181053:web:8a8e48e9a339f56dee4194"
  };

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);