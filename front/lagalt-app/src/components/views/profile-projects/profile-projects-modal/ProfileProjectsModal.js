import { Modal, Button } from 'react-bootstrap'
import ProjectComments from './ProjectComments'

function ProfileProjectsModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Project Name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Short description about the project</p>
          <div>
            <small>Comments: </small>
            <ProjectComments projectId={props.id} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ProfileProjectsModal