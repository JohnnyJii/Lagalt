import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'

import ProfilePage from '../profile-page/ProfilePage'
import GoogleLogin from './GoogleLogin'

firebase.initializeApp({
    apiKey: "AIzaSyA--ECU9qYpiANv4sCcW0PWXTxGdAj807M",
    authDomain: "lagalt-firebase-chat.firebaseapp.com",
    projectId: "lagalt-firebase-chat",
    storageBucket: "lagalt-firebase-chat.appspot.com",
    messagingSenderId: "690938952034",
    appId: "1:690938952034:web:918b0d9720727ac766d43b"
})

const auth = firebase.auth();

function GoogleAuthentication() {
    const [user] = useAuthState(auth);

    return(
        <div className="FirebaseChat">
            <section>
                {user ?
                    <ProfilePage /> :
                    <GoogleLogin
                        auth={auth}
                        firebase={firebase}
                    />
                }
            </section>
        </div>
    )
}

export default GoogleAuthentication