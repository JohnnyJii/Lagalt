import './ProfileProjectsGridItem.css'
import React from 'react'
import ProfileProjectsModal from '../profile-projects-modal/ProfileProjectsModal'
import { Card } from 'react-bootstrap';

function ProfileProjectsGridItem(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return(
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
    )
}

export default ProfileProjectsGridItem

