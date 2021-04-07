import './ProfilePageX.css';
import firebase from 'firebase/app';
import React from 'react';
import ChangeInfoX from '../edit-profile/ChangeInfoX';

function ProfileJumbotronX(props) {
  const [modalShow, setModalShow] = React.useState(false);

  const {
    imageSource = '',
    firstname,
    lastname,
    username,
    projects = [],
    portfolio = '',
    skills = []
  } = props.dbuser;

  return (
    <div>
      <ProfileInfoContainer>
        <ImageNameContainer>
          <div className="profile mr-3">
            <img
              src={imageSource ? imageSource : props.user.photoURL}
              alt="..." width="130"
              className="rounded mb-2 img-thumbnail"
            />
            <button
              className="btn btn-outline-dark btn-sm btn-block"
              onClick={() => setModalShow(true)}>
              Edit profile
            </button>
          </div>
          <div className="media-body mb-5 text-white">
            <h4 className="mt-0 mb-0">{firstname} {lastname}</h4>
            <p className="small mb-4">@{username}</p>
          </div>
        </ImageNameContainer>
        <ProjectLengthContainer>
          {projects.length ? projects.length : 'No project found'}
        </ProjectLengthContainer>
        <div className="px-4 py-3">
          <InfoContainer
            title='About Me'
            text={props.dbuser.description}
          />
          <InfoContainer
            title='Portfolio'
            text={portfolio ? portfolio : 'Nothing to show. Yet!'}
          />
          <InfoContainer
            title='Skillset'
            text={skills.length && skills.join(', ')}
          />
          <GoogleLogOutButton />
        </div>
      </ProfileInfoContainer >
      <ChangeInfoX
        show={modalShow}
        onHide={() => setModalShow(false)}
        dbuser={props.dbuser}
        setload={props.setload}
      />
    </div >
  );
}

const ProfileInfoContainer = function ({ children }) {
  return (
    <div className="row py-5 px-4">
      <div className="col-md-5 mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

const ImageNameContainer = function ({ children }) {
  return (
    <div className="px-4 pt-0 pb-4 cover">
      <div className="media align-items-end profile-head">
        {children}
      </div>
    </div>
  );
};

const ProjectLengthContainer = function ({ children }) {
  return (
    <div className="bg-light p-4 d-flex justify-content-end text-center">
      <ul className="list-inline mb-0">
        <li className="list-inline-item">
          <h5 className="font-weight-bold mb-0 d-block">
            {children}
          </h5><small className="text-muted">Projects</small>
        </li>
      </ul>
    </div>
  );
};

const InfoContainer = function ({ title, text }) {
  return (
    <>
      <h5 className="mb-0">{title}</h5>
      <div className="p-4 rounded shadow-sm bg-light">
        <p className="font-italic mb-0">
          {text}
        </p>
      </div>
      <hr />
    </>
  );
};

const GoogleLogOutButton = function () {

  function GoogleSignOut() {
    localStorage.clear();
    const auth = firebase.auth();
    auth.signOut();
  }

  return (
    <button
      className="btn btn-outline-dark btn-sm btn-block"
      onClick={() => { GoogleSignOut(); }}
    >
      Log Out
    </button>
  );
};

export default ProfileJumbotronX;