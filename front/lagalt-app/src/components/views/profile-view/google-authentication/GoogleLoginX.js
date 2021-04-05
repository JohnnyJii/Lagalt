import './FirebaseChatX.css'

function GoogleLoginX(props) {
    const signInWithGoogle = () => {
        const provider = new props.firebase.auth.GoogleAuthProvider();
        props.auth.signInWithPopup(provider)
    }
    return(
        <div className="align-center">
        <div className="google-btn">
            <div className="google-icon-wrapper">
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo"/>
            </div>
            <p className="btn-text" onClick={signInWithGoogle}><b>Sign in with Google</b></p>
        </div>
        </div>
    )
}

export default GoogleLoginX