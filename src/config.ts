import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA55UUR8Uzx7wrJ41ryIfTWV7frTrgxQ84",
  authDomain: "quiz-5a6b9.firebaseapp.com",
  projectId: "quiz-5a6b9",
  storageBucket: "quiz-5a6b9.appspot.com",
  messagingSenderId: "556039044566",
  appId: "1:556039044566:web:36c1045d9ba2c153e53877",
  measurementId: "G-S3JS74ZZGE",
};
// Initialize Firebase
const firebaseInit = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseInit;
