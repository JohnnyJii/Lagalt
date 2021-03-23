import './ProfileProjectsGridItem.css'
import React from 'react'
import ProfileProjectsModal from '../profile-projects-modal/ProfileProjectsModal'

function ProfileProjectsGridItem() {
    const [modalShow, setModalShow] = React.useState(false);

    return(
        <section class="container-flex" id="projects">
            <div class="row">
                <p class="col-md-4 col-lg-3 col-12 project-card-wrapper" onClick={() => setModalShow(true)}>
                    <div class="col-12 project-card">
                        <div class="project-card-content">
                            <h4><b>Project Name</b></h4>
                            <p>Short description</p>
                        </div>
                    </div>
                </p>
            </div>
            <ProfileProjectsModal show={modalShow} onHide={() => setModalShow(false)} />
        </section>
    )
}

export default ProfileProjectsGridItem

