import './ProfileProjectsGridItemX.css'
import React from 'react'
import ProfileProjectsModalX from '../project-modal/ProfileProjectsModalX'
import { Card } from 'react-bootstrap'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'

function ProfileProjectsGridItemX({ project = {} }) {
    const [modalShow, setModalShow] = React.useState(false);
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const { id, industry, progress, title, description, gitlink, user: owner } = project;

    return (
        <div style={{ margin: "20px", cursor: "pointer" }}>
            <Card onClick={() => setModalShow(true)}>
                <Card.Header>{industry ? industry : 'Industry'} <small>{progress ? progress : 'Progress'}</small></Card.Header>
                <Card.Body>
                    <Card.Title>{title ? title : 'Title'}</Card.Title>
                    <Card.Text>{description ? description : 'Description'}</Card.Text>
                </Card.Body>
            </Card>
            <ProfileProjectsModalX
                id={id}
                industry={industry}
                progress={progress}
                title={title}
                description={description}
                gitlink={gitlink}
                creator={owner}
                show={modalShow}
                user={user}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default ProfileProjectsGridItemX

