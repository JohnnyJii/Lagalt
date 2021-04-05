/* import ProfileNavbarX from './profile-nav/ProfileNavbarX' */
import ProfilePageX from './profile-page/ProfilePageX'
import ProfileProjectsX from './my-projects/ProfileProjectsX'
import { useEffect, useState } from 'react';
import Axios from 'axios'
import firebase from 'firebase/app'
import CreateUserX from './profile-page/create-user/CreateUserX'

function ProfileView(props) {
    let user = firebase.auth().currentUser;
    const [dbuser, setDbUser] = useState({})
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        async function fetchDbUser() {
            try {
                const userResponse = await Axios(`https://lagalt-server.herokuapp.com/api/v1/users/googleid/${user.uid}`);
                setDbUser(userResponse.data);
            } catch {
                setRedirect(true)
            }
        }
        fetchDbUser();
    }, [user.uid]);
    localStorage.setItem('dbuserid', dbuser.id);

    if (redirect) {
        return(
            <CreateUserX
                user={user}
                setDbUser={setDbUser}
                setRedirect={setRedirect}
            />
        )
    } else {
        return(
            <div>
                {/* <ProfileNavbarX /> */}                
                <ProfilePageX
                    setUserName={props.setUserName}
                    user={user}
                    dbuser={dbuser}
                />
                <ProfileProjectsX
                    dbuser={dbuser}
                />
            </div>
        )
    }
}

export default ProfileView