import './ProfilePageX.css'
import firebase from 'firebase/app'
import React from 'react'
import ChangeInfoX from '../edit-profile/ChangeInfoX'

function ProfileJumbotronX(props) {
/*     const projects = props.dbuser.projects.length
 */
    function GoogleSignOut() {
        localStorage.clear();
        const auth = firebase.auth();
        auth.signOut();
    }

    const [modalShow, setModalShow] = React.useState(false);

    return(
        <div>
            <div className="row py-5 px-4">
                <div className="col-md-5 mx-auto">
                    <div className="bg-white shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3">
                                    <img src={props.dbuser.imageSource ? props.dbuser.imageSource : props.user.photoURL} alt="..." width="130" className="rounded mb-2 img-thumbnail" />
                                    <button className="btn btn-outline-dark btn-sm btn-block" onClick={() => setModalShow(true)}>Edit profile</button>
                                </div>
                                <div className="media-body mb-5 text-white">
                                    <h4 className="mt-0 mb-0">{props.dbuser.firstname} {props.dbuser.lastname}</h4>
                                    <p className="small mb-4">@{props.dbuser.username}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light p-4 d-flex justify-content-end text-center">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">{'Projects Count'}</h5><small className="text-muted">Projects</small>
                                </li>
                            </ul>
                        </div>
                        <div className="px-4 py-3">
                            <h5 className="mb-0">About Me</h5>
                            <div className="p-4 rounded shadow-sm bg-light">
                                <p className="font-italic mb-0">{props.dbuser.description}</p>
                            </div>
                            <hr></hr>
                            <button className="btn btn-outline-dark btn-sm btn-block" onClick={() => {GoogleSignOut()}}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
            <ChangeInfoX
                show={modalShow}
                onHide={() => setModalShow(false)}
                dbuser={props.dbuser}
            />
        </div>
    )
}

export default ProfileJumbotronX