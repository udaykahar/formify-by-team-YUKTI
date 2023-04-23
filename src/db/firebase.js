import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBaPaLObrzurYtKE6Lf5Ao7ItuCVYDi92M",
    authDomain: "taglinegenerator.firebaseapp.com",
    projectId: "taglinegenerator",
    storageBucket: "taglinegenerator.appspot.com",
    messagingSenderId: "352461476176",
    appId: "1:352461476176:web:bef9e93cc2971c15a41c55",
    measurementId: "G-H7MV0929N6"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()