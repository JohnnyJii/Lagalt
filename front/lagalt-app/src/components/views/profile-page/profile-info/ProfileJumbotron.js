import './ProfilePage.css'
import firebase from 'firebase/app'
import { useEffect, useState } from 'react';
import Axios from 'axios'

function ProfileJumbotron() {

    function GoogleSignOut() {
        const auth = firebase.auth();
        auth.signOut();
    }

let user = firebase.auth().currentUser;

/* useEffect(() => {
    function fetchUser() {
        console.log('User changed!')
        console.log(user)
    }
    fetchUser();
}, [user]); */

const [dbUser, setDbUser] = useState({})

useEffect(() => {
    async function fetchDbUser() {
        try {
            const userResponse = await Axios('https://lagalt-server.herokuapp.com/api/v1/users/5');
            setDbUser(userResponse.data);
        } catch (error) {
            console.error(error);
        }
    }
    fetchDbUser();
}, [user]);

console.log(dbUser)
console.log(user.uid)

    return(
        <div>
            <div className="row py-5 px-4">
                <div className="col-md-5 mx-auto">
                    <div className="bg-white shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3">
                                    <img src={user.photoURL} alt="..." width="130" className="rounded mb-2 img-thumbnail" />
                                    <button className="btn btn-outline-dark btn-sm btn-block">Edit profile</button>
                                </div>
                                <div className="media-body mb-5 text-white">
                                    <h4 className="mt-0 mb-0">{dbUser.firstName} {dbUser.lastName}</h4>
                                    <p className="small mb-4">{dbUser.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light p-4 d-flex justify-content-end text-center">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">{dbUser.projects}</h5><small className="text-muted">Projects</small>
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
                            <button className="btn btn-outline-dark btn-sm btn-block" onClick={() => {GoogleSignOut()}}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileJumbotron