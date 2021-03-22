
function FirebaseChatMessage(props) {
    const { text, userName } = props.message;
    return(
        <div className='chat-message'>
            <small>{ userName }</small>
            <p>{ text }</p>
        </div>
    )
}

export default FirebaseChatMessage