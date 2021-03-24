import firebase from 'firebase/app'

function GoogleSignout() {
    const auth = firebase.auth();
    auth.signOut();
}

export default GoogleSignout