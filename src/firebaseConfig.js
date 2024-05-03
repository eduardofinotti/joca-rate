import { initializeFirebase } from "refine-firebase";
import {
    FirebaseDatabase,
    FirestoreDatabase,
    
} from "refine-firebase";

export const firebaseConfig = {
    apiKey: "AIzaSyBWmhbm9BMJzX4y-NtuZNzHizWkFH_pK2s",
    authDomain: "jocaapp-33214.firebaseapp.com",
    projectId: "jocaapp-33214",
    storageBucket: "jocaapp-33214.appspot.com",
    messagingSenderId: "451752334569",
    appId: "1:451752334569:web:00b45ba47e189fd9860c78",
    measurementId: "G-VRKG42ZZJF"
};
export const firebaseApp = initializeFirebase(firebaseConfig);

export const firestoreDatabase = new FirestoreDatabase();
