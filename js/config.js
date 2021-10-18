const firebaseConfig = {
  apiKey: "AIzaSyBNpI7ejzxtKCzyNv4J0Cm2cNiqCqubkuo",
  authDomain: "minhas-receitas-pwa.firebaseapp.com",
  projectId: "minhas-receitas-pwa",
  storageBucket: "minhas-receitas-pwa.appspot.com",
  messagingSenderId: "269761506605",
  appId: "1:269761506605:web:d64ced963d9a274993b7a4",
  measurementId: "G-V8KXDZYRGH"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
