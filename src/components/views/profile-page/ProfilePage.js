import ProfileJumbotron from './profile-info/ProfileJumbotron'
import ProfileNavbar from './profile-navbar/ProfileNavbar'
import { useEffect, useState } from 'react';
import Axios from 'axios'
import firebase from 'firebase/app'
import { Button } from 'react-bootstrap'
import CreateProject from '../profile-projects/profile-create-project/CreateProject';
import React from 'react'

function ProfilePage() {
    let user = firebase.auth().currentUser;
    const [dbUser, setDbUser] = useState({})

    useEffect(() => {
        async function fetchDbUser() {
            try {
                const userResponse = await Axios(`https://lagalt-server.herokuapp.com/api/v1/users/${user.uid}`);
                setDbUser(userResponse.data);
            } catch  {
                Axios.post("https://lagalt-server.herokuapp.com/api/v1/users", {googleid: user.uid})
            }
        }
        fetchDbUser();
    }, [user]);

    const [modalShow, setModalShow] = React.useState(false);

    return(
        <div>
            <ProfileNavbar />
            <ProfileJumbotron
                dbUser={dbUser}
                user={user}/>
            <div style={{textAlign: "center"}}>
                <Button variant="primary" onClick={() => setModalShow(true)}>Create Project</Button>
                <CreateProject show={modalShow} onHide={() => setModalShow(false)} dbUser={dbUser.id}/>
            </div>
        </div>
    )
}

export default ProfilePage