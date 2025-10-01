"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: ReactNode;
  intercepting?: boolean;
  onClose?: () => void;
}

export default function Modal({
  children,
  intercepting = false,
  onClose = () => {},
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root"));
  }, []);

  const handleClose = () => {
    if (intercepting) {
      router.back();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (modalRoot && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, [modalRoot]);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <dialog
      className="p-12 m-auto rounded-2xl backdrop-blur-xs"
      onClose={handleClose}
      onClick={(e) => {
        if ((e.target as any).nodeName === "DIALOG") {
          handleClose();
        }
      }}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    modalRoot,
  );
}
