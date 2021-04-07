/* import ProfileNavbarX from './profile-nav/ProfileNavbarX' */
import ProfileProjectsX from './my-projects/ProfileProjectsX';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import firebase from 'firebase/app';
import CreateUserX from './profile-page/create-user/CreateUserX';
import ProfileJumbotronX from './profile-page/profile-jumbotron/ProfileJumbotronX';

function ProfileView(props) {
  let user = firebase.auth().currentUser;
  const [dbuser, setDbUser] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [load, setLoad] = useState(false);

  user.getIdToken().then(function (token) {
    localStorage.setItem('jwt', token);
  });

  useEffect(() => {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    };
    async function fetchDbUser() {
      try {
        const userResponse = await Axios(`https://lagalt-server.herokuapp.com/api/v1/users/googleid/${user.uid}`, config);
        setDbUser(userResponse.data);
      } catch {
        setRedirect(true);
      }
    }
    fetchDbUser();
  }, [user.uid, load]);
  localStorage.setItem('dbuserid', dbuser.id);

  if (redirect) {
    return (
      <CreateUserX
        user={user}
        setDbUser={setDbUser}
        setRedirect={setRedirect}
      />
    );
  }
  return (
    <div>
      {/* <ProfileNavbarX /> */}
      <ProfileJumbotronX
        setUserName={props.setUserName}
        user={user}
        dbuser={dbuser}
        setload={setLoad}
      />
      <ProfileProjectsX
        dbuser={dbuser}
      />
    </div>
  );
}

export default ProfileView;