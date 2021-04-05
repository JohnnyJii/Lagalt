import { Modal, Button } from 'react-bootstrap'
import ProjectCommentsX from '../message-board/ProjectCommentsX'

function ProfileProjectsModalX(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title ? props.title : "Title"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <small><strong>Project Description</strong></small>
          <p>{props.desc ? props.desc : "Description"}</p>
          <small><strong>Project Info</strong></small>
          <br />
          <small><strong>Industry:</strong> {props.industry ? props.industry : "Industry"}</small>
          <br />
          <small><strong>Progress:</strong> {props.progress ? props.progress : "Progress"}</small>
          <br />
          <small><strong>Git Link:</strong> <a href="{props.gitlink}" target="blank_">{props.gitlink ? props.gitlink : "Gitlink"}</a></small>
          <div>
            <small><strong>Message Board</strong></small>
            <ProjectCommentsX projectId={props.id} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ProfileProjectsModalX