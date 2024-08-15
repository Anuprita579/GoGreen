import React from 'react';
//Common Components
import ButtonComponent from './ButtonComponent';
//MUI Components
import { Modal as BaseModal } from '@mui/base/Modal';
import { styled, css } from '@mui/system';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden
    border-radius: 8px;
    padding: 4px;

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      margin-bottom: 4px;
    }
  `,
);

const TriggerButton = styled('button')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:focus-visible {
      outline: none;
    }
  `,
);

const ModalComponent = ({ buttonContent, children, buttonClassName, open, close, onOpen, onClose }) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const isOpen = Boolean(open);

  return (
    < >
      <ButtonComponent  onClick={onOpen} className={buttonClassName}>
        {buttonContent}
      </ButtonComponent>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={isOpen}
        onClose={onClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 800, backgroundColor: "transperant", outline: "none", borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

ModalComponent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

ModalComponent.defaultProps = {
  children: null,
  className: ""
};

export default ModalComponent;