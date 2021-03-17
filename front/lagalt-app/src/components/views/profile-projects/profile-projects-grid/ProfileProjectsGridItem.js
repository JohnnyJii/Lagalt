import './ProfileProjectsGridItem.css'

function ProfileProjectsGridItem() {
    return(
        <section class="container-flex" id="projects">
            <div class="row">
                <a href="#" target="_blank" class="col-md-4 col-lg-3 col-12 project-card-wrapper">
                    <div class="col-12 project-card">
                        <div class="project-card-content">
                            <h4><b>Project Name</b></h4>
                            <p>Short description</p>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    )
}

export default ProfileProjectsGridItem