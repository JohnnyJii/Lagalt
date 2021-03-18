import { Modal, Button, Form } from 'react-bootstrap'

function CreateProjectModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label>Project name</Form.Label>
                <Form.Control type="text" placeholder="Project name" />
                <br/>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Project description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <br/>
                <Form.Label>Related tags</Form.Label>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Music" />
                    <Form.Check type="checkbox" label="Video and Photography" />
                    <Form.Check type="checkbox" label="Web Development" />
                </Form.Group>
            </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={props.onHide}>Cancel</Button>
          <Button variant="success" onClick={props.onHide}>Create</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default CreateProjectModal