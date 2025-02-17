import "./Modal.scss";
import ReactDOM from "react-dom";
import React, { useEffect, useRef, ReactNode, useState } from "react";
import { ReactComponent as Search } from "../../../assets/svg/search.svg";
import { IconButton } from "@mui/material";
import Input from "../Input/Input";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  modalWidth?: string;
  headerBg?: string;
  headerColor?: string;
  headerLogo?: ReactNode;
  closeOnOverLayClick?: boolean;
  closeOnEscClick?: boolean;
  modalContentStyle?: any;
  modalHeaderStyle?: any;
  modalHeaderBottomStyle?: any;
  closeIcon?: any;
  canSearch?: boolean;
  setSearchQuery?: any;
  searchFieldName?: string;
  headerComponent?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  modalWidth = "550px",
  headerBg = "#5586b3",
  headerColor = "#ffffff",
  headerLogo,
  closeOnOverLayClick = true,
  closeOnEscClick = true,
  modalContentStyle,
  modalHeaderStyle,
  modalHeaderBottomStyle,
  closeIcon,
  canSearch = false,
  setSearchQuery,
  searchFieldName = "",
  headerComponent,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (closeOnEscClick && event.key === "Escape") {
      onClose();
      clearInputValueOnClose();
    }
  };

  const clearInputValueOnClose = () => {
    setInputValue("");
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      e.target.blur();
      // setShowSearchDropdown(false);
      search();
    }
  };

  const search = () => {
    if (setSearchQuery) {
      setSearchQuery(inputValue);
    }
  };

  return isOpen
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal">
            <div
              className="modal-overlay"
              onClick={() => {
                if (closeOnOverLayClick) {
                  onClose();
                  clearInputValueOnClose();
                }
              }}
            />
            <div
              className="modal-content"
              ref={modalRef}
              style={{ width: modalWidth, ...modalContentStyle }}
            >
              <div
                className="modal-header d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: headerBg,
                  color: headerColor,
                  ...modalHeaderStyle,
                }}
              >
                {headerComponent ? (
                  headerComponent
                ) : (
                  <>
                    <div className="d-flex align-items-center modal-logo-header-content me-3">
                      <span className="me-3 d-flex">{headerLogo}</span>
                      <div className="modal-title">{title}</div>
                    </div>
                    {/* {canSearch && (
                      <>
                        <div className="audit-search-wrapper mx-3 ms-5 flex-grow-1">
                          <Input
                            isFormElement={false}
                            placeholder={`Search ` + (searchFieldName || "")}
                            suffix={
                              <Search
                                className="cursor-pointer"
                                onClick={search}
                              />
                            }
                            value={inputValue}
                            onInput={(e) => {
                              setInputValue(
                                (e.target as HTMLInputElement).value
                              );
                            }}
                            onKeyDown={handleEnter}
                          ></Input>
                        </div>
                        <div className="flex-grow-1"></div>
                      </>
                    )} */}
                  </>
                )}
                <IconButton
                  type="button"
                  className="modal-close"
                  onClick={() => {
                    onClose();
                    clearInputValueOnClose();
                  }}
                  style={{ color: headerColor }}
                >
                  {closeIcon ? closeIcon : <>&times;</>}
                </IconButton>
              </div>
              <div
                style={{
                  ...modalHeaderBottomStyle,
                }}
              ></div>
              <div className="modal-body" style={modalContentStyle}>
                {children}
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default Modal;
