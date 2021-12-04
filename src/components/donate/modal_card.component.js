import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import proxyService from "../../services/proxy.service";

import "./donate.css";

const CheckModal = (props) => {
  const {
    className,
    cardVerify,
  } = props;

  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState(null)

  const [services] = useState(new proxyService())

  const toggle = () => setModal(!modal);

  const getVerifiCard = () => {
    if (cardVerify !== null){
        services.getVerifiZver(cardVerify) 
        .then((response) => {
            if(response.status === 0){
                setModalText("Congratulations on your payment confirmed!!!")
            }
            else { 
                setModalText("You didn't pay money!!!")
            }
            setModal(!modal)
        })
        .catch(error => {
          if(error){
            window.location.assign("/login")
          }
        })
    }
    else{
        setModalText("Transactions not found")
        setModal(!modal)
    }
  }

  return (
    <div>
      <Button color="warning" className="donate-btn" onClick={getVerifiCard}>Check</Button>
      <Modal isOpen={modal} toggle={toggle} size={"lg"} className={className}>
        <ModalHeader toggle={toggle}>Your transactions state</ModalHeader>
        <ModalBody>
          {modalText}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CheckModal;