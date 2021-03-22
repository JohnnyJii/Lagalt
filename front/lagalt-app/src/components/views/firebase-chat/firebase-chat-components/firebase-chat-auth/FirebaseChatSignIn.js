function FirebaseChatSignIn(props) {
    const signInWithGoogle = () => {
        const provider = new props.firebase.auth.GoogleAuthProvider();
        props.auth.signInWithPopup(provider)
    }
    return(
        <button className="btn btn-primary" onClick={signInWithGoogle}>Sign in with Google</button>
    )
}

export default FirebaseChatSignIn