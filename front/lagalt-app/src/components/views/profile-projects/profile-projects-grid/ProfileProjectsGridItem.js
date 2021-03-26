import './ProfileProjectsGridItem.css'
import React from 'react'
import ProfileProjectsModal from '../profile-projects-modal/ProfileProjectsModal'


function ProfileProjectsGridItem(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return(
<<<<<<< HEAD
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
=======
        <section className="container-flex" id="projects">
            <div className="row">
                <div className="col-md-4 col-lg-3 col-12 project-card-wrapper" onClick={() => setModalShow(true)}>
                    <div className="col-12 project-card">
                        <div className="project-card-content">
                            <h4><b>Project Name</b></h4>
                            <p>Short description</p>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileProjectsModal id={props.id} show={modalShow} onHide={() => setModalShow(false)} />
        </section>
>>>>>>> jukka-carousel
    )
}

export default ProfileProjectsGridItem

