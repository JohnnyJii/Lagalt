import './ProfileProjectsGridItemX.css'
import React from 'react'
import ProfileProjectsModalX from '../project-modal/ProfileProjectsModalX'
import { Card } from 'react-bootstrap'

function ProfileProjectsGridItemX(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return(
        <div style={{margin: "20px", cursor: "pointer"}}>
            <Card onClick={() => setModalShow(true)}>
                <Card.Header>{props.industry ? props.industry : 'Industry'} <small>{props.progress ? props.progress : 'Progress'}</small></Card.Header>
                <Card.Body>
                    <Card.Title>{props.title ? props.title : 'Title'}</Card.Title>
                    <Card.Text>{props.desc ? props.desc : 'Description'}</Card.Text>
                </Card.Body>
            </Card>
            <ProfileProjectsModalX
                id={props.id}
                industry={props.industry}
                progress={props.progress}
                title={props.title}
                desc={props.desc}
                gitlink={props.gitlink}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default ProfileProjectsGridItemX

