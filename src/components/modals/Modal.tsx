import React, { ReactElement, SyntheticEvent } from "react";
import styles from "./Modal.module.scss";
const { header, body, content, container, close } = styles;

interface Props {
  children: ReactElement | ReactElement[] | any;
}

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement[];
  onClose: () => void;
}

export enum ModalEnum {
  HEADER = "modal.header",
  BODY = "modal.body",
}

export function ModalHeader({
  children,
  closeModal,
}: Props & { key: ModalEnum.HEADER; closeModal: () => void }): ReactElement {
  return (
    <div className={header}>
      {children}
      <span className={close} onClick={closeModal}>
        X
      </span>
    </div>
  );
}

export function ModalBody({
  children,
}: Props & { key: ModalEnum.BODY }): ReactElement {
  return <div className={body}>{children}</div>;
}

export function Modal({ children, ...props }: ModalProps): ReactElement {
  const header = children.find((v) => v.key === ModalEnum.HEADER);
  const body = children.find((v) => v.key === ModalEnum.BODY);
  if (!body) {
    throw new Error("Modal body is required");
  }
  const { onClose, ...other } = props;

  const handleOnClose = (e: SyntheticEvent<HTMLDivElement>) => {
    const { target } = e;
    if (((target as any).id as string) === "modal") {
      onClose();
      e.stopPropagation();
    }
  };

  return (
    <div {...other} onClick={handleOnClose} id="modal" className={container}>
      <div className={content}>
        {header}
        {body}
      </div>
    </div>
  );
}
