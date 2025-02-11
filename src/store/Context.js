import { createContext, useState } from "react";
import {auth, db, storage} from "../firebase/config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,updateProfile } from "firebase/auth";
import { doc, setDoc} from 'firebase/firestore'

export const FirebaseContext  = createContext(null);

export const FirebaseProvider = ({children}) => {
    const registerUser = async (email, password, username, phone) => {
        const userCredential = await createUserWithEmailAndPassword(auth,email, password);

        const user = userCredential.user;
        await updateProfile(user,{displayName: username});
        
        await setDoc(doc(db,'users',user.uid),{
            uid: user.uid,
            username: username,
            email: email,
            phone: phone,
        })
        return user;
    };

    const loginUser = async (email,password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential.user;
    }

    const logoutUser = async() => {
        await signOut(auth);
    }

    return( 
        <FirebaseContext.Provider value={{auth,registerUser, storage, loginUser, logoutUser}}>
            {children}
        </FirebaseContext.Provider>
    )
}

export const AuthContext = createContext(null);

export default function Context ({children}) {
const [user,setUser] = useState(null);

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )

}