import './ProfileProjectsGridItemX.css'
import React, { useEffect } from 'react'
import ProfileProjectsModalX from '../project-modal/ProfileProjectsModalX'
import { Card } from 'react-bootstrap'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import axios from 'axios'

function ProfileProjectsGridItemX(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const [application, setApplication] = React.useState([])

        useEffect(() => {
            axios.get(`https://lagalt-server.herokuapp.com/api/v1/projects/${props.id}/applications`)
            .then(response => {
                console.log(response)
                setApplication([...response.data])
            })
            .catch(error => {
                console.log(error)
            })
           }, [props.id])

    return(
        <div style={{margin: "20px", cursor: "pointer"}}>
            <Card onClick={() => setModalShow(true)}>
                <Card.Header>{props.industry ? props.industry : 'Industry'} <small>{props.progress ? props.progress : 'Progress'}</small></Card.Header>
                <Card.Body>
                    <Card.Title>{props.title ? props.title : 'Title'}</Card.Title>
                    <Card.Text>{props.description ? props.description : 'Description'}</Card.Text>
                </Card.Body>
            </Card>
            <ProfileProjectsModalX
                id={props.id}
                industry={props.industry}
                progress={props.progress}
                title={props.title}
                description={props.description}
                gitlink={props.gitlink}
                creator={props.creator}
                show={modalShow}
                guser={user}
                application={application}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default ProfileProjectsGridItemX

