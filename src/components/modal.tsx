import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

interface IModalProps {
  isOpen: boolean;
  open: Dispatch<SetStateAction<boolean>>;
  title: string;
  body: string;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ isOpen, open, title, body, children }) => {
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  const modalElement = document.getElementById("modal") as HTMLElement;

  useEffect(() => {
    isOpen &&
      setTimeout(() => {
        modalWrapperRef.current?.classList.add("show");
      }, 10);
  }, [isOpen]);
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            className="modal fade bg-light bg-opacity-75"
            style={{ display: "block" }}
            onClick={() => open(false)}
            ref={modalWrapperRef}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bolder">{title}</h5>
                  <button
                    type="button"
                    className="btn-close m-0"
                    onClick={() => open(false)}
                  ></button>
                </div>
                <div className="modal-body m-3">
                  <p className="mb-0">{body}</p>
                </div>
                <div className="modal-footer">{children}</div>
              </div>
            </div>
          </div>,
          modalElement
        )}
    </>
  );
};

export default Modal;
