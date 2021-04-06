import firebase from 'firebase/app';
import ProjectCommentX from './ProjectCommentX';
import { useState, useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ProjectCommentsX(props) {
    const auth = firebase.auth();
    const messagesRef = firebase.firestore().collection(`project_comments_${props.projectId}`);
    const query = messagesRef.orderBy('createdAt').limit(25);
    const dummy = useRef();
    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormvalue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid } = auth.currentUser;

        if ((formValue === '') || (formValue === null)) {
            alert('No message!');
        } else {
            await messagesRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                userName: auth.currentUser.displayName
            });
        }
        
        setFormvalue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <div>
            <div>
                {messages && messages.map(msg => <ProjectCommentX
                                                    key={msg.id}
                                                    message={msg}
                                                    auth={firebase.auth}
                                                />)}
            </div>
            <div>
                <form onSubmit={sendMessage}>
                    <input value={formValue} onChange={(e) => setFormvalue(e.target.value)}/>
                    <button className="btn btn-primary" type="submit">Post Comment</button>
                </form>
            </div>
            <div ref={dummy}></div>
        </div>
    );
}

export default ProjectCommentsX;