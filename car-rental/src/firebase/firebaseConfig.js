import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAwiqzMdJYkVqwh1aHitJaZemz45Xa3SS4",
  authDomain: "car-rental-4b1d1.firebaseapp.com",
  projectId: "car-rental-4b1d1",
  storageBucket: "car-rental-4b1d1.firebasestorage.app",
  messagingSenderId: "228937711171",
  appId: "1:228937711171:web:520cfdffe4f747281b9ef6"
};


const app = initializeApp(firebaseConfig);

export default app