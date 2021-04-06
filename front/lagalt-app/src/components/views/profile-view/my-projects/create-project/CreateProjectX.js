import { Modal, Button } from 'react-bootstrap';
import CreateProjectTemplateX from './CreateProjectTemplateX';

function CreateProjectX({ show, onHide, dbuserid, addProject }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateProjectTemplateX
          dbuserid={dbuserid}
          addProject={addProject}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateProjectX;