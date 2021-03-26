import './ProfileProjectsGridItem.css'
import React from 'react'
import ProfileProjectsModal from '../profile-projects-modal/ProfileProjectsModal'
import { Card } from 'react-bootstrap'

function ProfileProjectsGridItem(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return(
        <div style={{margin: "20px", cursor: "pointer"}}>
            <Card onClick={() => setModalShow(true)}>
                <Card.Header>{props.industry}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>{props.desc}</Card.Text>
                </Card.Body>
            </Card>
            <ProfileProjectsModal
                id={props.id}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default ProfileProjectsGridItem

