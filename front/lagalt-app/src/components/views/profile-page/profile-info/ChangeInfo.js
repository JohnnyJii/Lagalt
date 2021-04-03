import { Modal, Button } from 'react-bootstrap'
import ChangeInfoTemplate from './ChangeInfoTemplate'

function ChangeInfo(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangeInfoTemplate dbUser={props.dbUser}/>       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ChangeInfo