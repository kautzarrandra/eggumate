// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKLi-crNikeVFcYAEYt3TiAmaS4E7Pnbc",
  authDomain: "eggumate.firebaseapp.com",
  databaseURL: "https://eggumate-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eggumate",
  storageBucket: "eggumate.firebasestorage.app",
  messagingSenderId: "785025784023",
  appId: "1:785025784023:web:fe0830064c6508204c7892"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();