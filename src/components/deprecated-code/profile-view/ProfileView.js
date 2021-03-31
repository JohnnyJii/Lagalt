import ProfileNavbar from '../../views/profile-page/profile-navbar/ProfileNavbar'
import ProfilePage from '../../views/profile-page/ProfilePage'
import ProfileProjects from '../../views/profile-projects/ProfileProjects'
import { useEffect, useState } from 'react';
import Axios from 'axios'
import firebase from 'firebase/app'

function ProfileView() {
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
    return(
        <div>
            <ProfileNavbar />
            <ProfilePage
                dbUser={dbUser}
                user={user}/>
            <ProfileProjects 
                dbUser={dbUser}
                user={user}/>
        </div>
    )
}

export default ProfileView