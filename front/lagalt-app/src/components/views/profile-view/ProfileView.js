import ProfileProjectsX from './my-projects/ProfileProjectsX';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import firebase from 'firebase/app';
import CreateUserX from './profile-page/create-user/CreateUserX';
import ProfileJumbotronX from './profile-page/profile-jumbotron/ProfileJumbotronX';
import { USER_BY_GOOGLE_ID } from '../../../utils/serverUrls/userUrls';

function ProfileView(props) {
  let user = firebase.auth().currentUser;
  const [dbuser, setDbUser] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function fetchDbUser() {
      const token = await user.getIdToken();
      localStorage.setItem('jwt', token);
      try {
        const { data } = await Axios(USER_BY_GOOGLE_ID(user.uid), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        });
        setDbUser(data);
      } catch {
        setRedirect(true);
      }
    }
    fetchDbUser();
  }, [user, load]);
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