import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './FirebaseChat.css'

import { useState, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import FirebaseChatSignIn from '../firebase-chat-components/firebase-chat-auth/FirebaseChatSignIn'
import FirebaseChatRoom from '../firebase-chat-components/firebase-chat-messaging/FirebaseChatRoom'

firebase.initializeApp({
    apiKey: "AIzaSyA--ECU9qYpiANv4sCcW0PWXTxGdAj807M",
    authDomain: "lagalt-firebase-chat.firebaseapp.com",
    projectId: "lagalt-firebase-chat",
    storageBucket: "lagalt-firebase-chat.appspot.com",
    messagingSenderId: "690938952034",
    appId: "1:690938952034:web:918b0d9720727ac766d43b"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function FirebaseChat(props) {
    const [user] = useAuthState(auth);

    return(
        <div className="FirebaseChat">
            <section>
                {user ?
                    <FirebaseChatRoom
                        projectId={props.id}
                        user={user}
                        auth={auth}
                        firestore={firestore}
                        useRef={useRef}
                        useCollectionData={useCollectionData}
                        useState={useState}
                    /> :
                    <FirebaseChatSignIn
                        auth={auth}
                        firebase={firebase}
                    />
                }
            </section>
        </div>
    )
}

export default FirebaseChat