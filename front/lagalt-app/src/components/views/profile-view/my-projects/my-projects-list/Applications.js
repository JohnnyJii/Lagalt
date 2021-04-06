import React from 'react';
import useApplications from '../../../../../hooks/useApplications';

function Applications({ projectId }) {
  const [applications, handleApplication] = useApplications(projectId);
  return (
    applications.map(application =>
      <Application
        key={application.userId}
        application={application}
        handleApplication={handleApplication}
      />
    )
  )
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
  }
  return (
    <div>
      <img style={{ width: 100, height: 100 }} src={imageSource} alt={''} />
      { firstname && lastname ? <p>applicant: {firstname} {lastname}</p> : null}
      { description ? <p>description: {description}</p> : null}
      { eMail ? <p>email: {eMail}</p> : null}
      {skills.length ? <p>skills: {skills.join(', ')}</p> : null}
      {motivationLetter ? <p>{motivationLetter}</p> : null}
      <button type="button" value="Accept" onClick={() => processApplication(true)}>Accept</button>
      <button type="button" value="Decline" onClick={() => processApplication(false)}>Decline</button>
      <hr />
    </div>
  )
}

export default Applications;