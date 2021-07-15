import axios from "axios";
import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

import {IState as Props} from './GetUsersPage'
import {ResponseStatus, Alert, Response, AlertType, AlertBtnText} from './common'

type IProps = {
  id: Props["id"]
}

const Delete: React.FC<IProps> = ({id}) =>{
  const [alert, setAlert] = useState<Alert>({
    show: false,
    type: AlertType.DEFAULT,
    title: '',
    message: '',
    btnText: '',
  });

  const handleDelete = async() =>{
    let response: Response 
    if(id.length < 1){
      handleClose()
    }else{
      for (let i = 0; i < id.length; i++){
        try{
          response = await axios.delete(`http://localhost:8080/users?id=${id[i]}`)
          if (response.data.status === ResponseStatus.SUCCESS){
            window.location.reload()
          }
        }catch(err){
          console.log(err)
        }
      }
    }
  }

  const deleteConfirmation = () =>{
    if(id.length < 1){
      setAlert({
        show: true,
        type: AlertType.DANGER,
        title: 'Please select at least one user to delete',
        btnText: AlertBtnText.OK
      })
    }else{
      setAlert({
        show: true,
        type: AlertType.WARNING,
        title: 'Are you sure you want to delete the selected user(s)?',
        message: 'You will not be able to recover the deleted records!',
        btnText: AlertBtnText.CONFIRM
      })
    }
  }

  const handleClose = () =>{
    setAlert({show: false})
  }

  return (
    <div>
      <button onClick={deleteConfirmation} className="btn btn-danger">Delete</button>
      <React.Fragment>
        <SweetAlert
          show={alert.show}
          type={alert.type}
          title={alert.title}
          onConfirm={handleDelete}
          onCancel={handleClose}
          closeOnClickOutside={true}
          confirmBtnBsStyle={alert.type}
          showCloseButton={true}>
          {alert.message}
        </SweetAlert>
      </React.Fragment>
    </div>
  )
}

export default Delete;