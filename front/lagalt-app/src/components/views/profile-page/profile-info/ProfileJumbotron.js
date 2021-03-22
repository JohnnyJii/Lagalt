import './ProfilePage.css'

function ProfileJumbotron() {
    return(
        <div>
            <div className="row py-5 px-4">
                <div className="col-md-5 mx-auto">
                    <div className="bg-white shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3">
                                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" alt="..." width="130" class="rounded mb-2 img-thumbnail" />
                                    <button class="btn btn-outline-dark btn-sm btn-block">Edit profile</button>
                                </div>
                                <div className="media-body mb-5 text-white">
                                    <h4 className="mt-0 mb-0">User Name</h4>
                                    <p className="small mb-4">Helsinki</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light p-4 d-flex justify-content-end text-center">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">3</h5><small className="text-muted">Projects</small>
                                </li>
                            </ul>
                        </div>
                        <div className="px-4 py-3">
                            <h5 className="mb-0">About Me</h5>
                            <div className="p-4 rounded shadow-sm bg-light">
                                <p className="font-italic mb-0">Web Development</p>
                                <p className="font-italic mb-0">Guitarist</p>
                                <p className="font-italic mb-0">Photographer</p>
                            </div>
                            <hr></hr>
                            <button class="btn btn-outline-dark btn-sm btn-block">Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileJumbotron

