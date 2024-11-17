// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBl118UAWOx_DWxmRN77C4U2d45m82EnyY",
//   authDomain: "document-app-45d38.firebaseapp.com",
//   projectId: "document-app-45d38",
//   storageBucket: "document-app-45d38.firebasestorage.app",
//   messagingSenderId: "574492595157",
//   appId: "1:574492595157:web:d7dac822dccc1d1667235c"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db=getFirestore(app);
// export {db};
// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Add this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl118UAWOx_DWxmRN77C4U2d45m82EnyY",
  authDomain: "document-app-45d38.firebaseapp.com",
  projectId: "document-app-45d38",
  storageBucket: "document-app-45d38.appspot.com", // Corrected the storageBucket URL
  messagingSenderId: "574492595157",
  appId: "1:574492595157:web:d7dac822dccc1d1667235c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the database instance
export { db };



