import React, { ReactElement } from "react";
import { Modal, ModalBody, ModalEnum, ModalHeader } from "./Modal";

type Props = {
  closeModal: () => void;
};

export default function Login({ closeModal }: Props): ReactElement {
  return (
    <Modal onClose={closeModal}>
      <ModalHeader key={ModalEnum.HEADER} closeModal={closeModal}>
        <h2>Login</h2>
      </ModalHeader>
      <ModalBody key={ModalEnum.BODY}>hello_world</ModalBody>
    </Modal>
  );
}
