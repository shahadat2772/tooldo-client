// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //   apiKey: process.env.REACT_APP_apiKey,
  //   authDomain: process.env.REACT_APP_authDomain,
  //   projectId: process.env.REACT_APP_projectId,
  //   storageBucket: process.env.REACT_APP_storageBucket,
  //   messagingSenderId: process.env.REACT_APP_messagingSenderId,
  //   appId: process.env.REACT_APP_appId,

  apiKey: "AIzaSyCJg0DL-pgc_YUD6r8FddPkBJbkO-d3ptU",
  authDomain: "assignment-12-29c23.firebaseapp.com",
  projectId: "assignment-12-29c23",
  storageBucket: "assignment-12-29c23.appspot.com",
  messagingSenderId: "122765750426",
  appId: "1:122765750426:web:75ed4bfb2e9523f43a6f23",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
