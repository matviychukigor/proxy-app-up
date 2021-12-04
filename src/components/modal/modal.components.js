import React, { useState } from 'react';
import { Button, Modal} from 'reactstrap';

function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => {setShow(true); console.log(props.modal)};
  
  return (
    
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal>
        <Modal>Woohoo, you're reading this text in a modal!</Modal>
        <Modal>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal>
      </Modal>
    </>
  );
}

export default Example;