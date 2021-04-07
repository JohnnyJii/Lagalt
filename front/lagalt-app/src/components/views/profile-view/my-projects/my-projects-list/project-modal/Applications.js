import React from 'react';
import useApplications from '../../../../../../hooks/useApplications';

function Applications({ applications, handleApplication }) {

  return (
    applications.map(application =>
      <Application
        key={application.userId}
        application={application}
        handleApplication={handleApplication}
      />
    )
  );
}

function Application({ application, handleApplication }) {
  const {
    motivationLetter = '',
    description = '',
    eMail = '',
    firstname = '',
    lastname = '',
    imageSource,
    skills = [],
    userId,
    projectId,
  } = application;

  const processApplication = (accepted) => {
    handleApplication(projectId, userId, accepted);
  };
  return (
    <div>
      <img style={{ width: 100, height: 100, borderRadius: 25 }} src={imageSource} alt={''} />
      <br />
      <br />
      { firstname && lastname ? <p><strong>Applicant:</strong> {firstname} {lastname}</p> : null}
      { description ? <p><strong>Description:</strong> {description}</p> : null}
      { eMail ? <p><strong>Email:</strong> {eMail}</p> : null}
      {skills.length ? <p><strong>Skills:</strong> {skills.join(', ')}</p> : null}
      {motivationLetter ? <p>{motivationLetter}</p> : null}
      <button
        className="btn btn-primary"
        type="button"
        value="Accept"
        onClick={() => processApplication(true)}
      >
        Accept
      </button>
      <button
        className="btn btn-warning"
        type="button"
        value="Decline"
        onClick={() => processApplication(false)}
      >
        Decline
      </button>
      <hr />
    </div>
  );
}

export default Applications;