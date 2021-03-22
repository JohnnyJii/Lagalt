function FirebaseChatSignOut(props) {
    return props.auth.currentUser && (
        <button className="btn btn-primary" onClick={() => props.auth.signOut()}>Sign Out</button>
    )
}

export default FirebaseChatSignOut