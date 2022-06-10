import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  static propTypes = {
    close: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.close);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.close);
  }

  close = e => {
    if (e.code === 'Escape') {
      return this.props.handleClose();
    }
    if (e.target === e.currentTarget) {
      this.props.handleClose();
    }
  };

  render() {
    const { children } = this.props;
    const { close } = this;

    return createPortal(
      <div onClick={close} className={styles.overlay}>
        <div className={styles.content}>
          <span onClick={close} className={styles.close}>
            X
          </span>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}
