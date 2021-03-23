import FirebaseChatSignOut from '../firebase-chat-auth/FirebaseChatSignOut'
import FirebaseChatMessage from '../firebase-chat-messaging/FirebaseChatMessage'
import firebase from 'firebase/app'

function FirebaseChatRoom(props) {
    const messagesRef = props.firestore.collection(`project_comments_${props.projectId}`);
    const query = messagesRef.orderBy('createdAt').limit(25);
    const dummy = props.useRef()
    const [messages] = props.useCollectionData(query, {idField: 'id'});
    const [formValue, setFormvalue] = props.useState('');
    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid } = props.auth.currentUser;

        if ((formValue === '') || (formValue === null)) {
            alert('No message!')
        } else {
            await messagesRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                userName: props.auth.currentUser.displayName
            })
        }
        
        setFormvalue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return(
        <div>
            <div>
                {messages && messages.map(msg => <FirebaseChatMessage key={msg.id} message={msg} auth={props.auth}/>)}
            </div>
            <div>
                <form onSubmit={sendMessage}>
                    <input value={formValue} onChange={(e) => setFormvalue(e.target.value)}/>
                    <button className="btn btn-primary" type="submit">Send</button>
                </form>
            </div>
            <div ref={dummy}></div>
            <FirebaseChatSignOut auth={props.auth}/>
        </div>
    )
}

export default FirebaseChatRoom