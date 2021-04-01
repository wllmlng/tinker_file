import React from 'react';
import '../../assets/stylesheets/modal.css';
import Task from '../task/task';


const Modal = ({modal, closeModal, task}) => {
  if (!modal) {
    return null;
  }

  let component;
  
  switch (modal) {
    case 'task':
      component = <Task task={task}/>;
      break;
    default:
      return null;
  }
// do something similiar to mern searchbar where modal closes when clicked outside
  return (
    <div className="modal-background"  >
      
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        <div onClick={closeModal} id='modal_exit_button' className="close-x"></div>
        { component }
      </div>
      
    </div>
  );
}

export default Modal