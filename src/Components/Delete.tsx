import React, { useState } from "react";
import {IState as Props} from './GetUsersPage'
import { SweetAlertType } from "react-bootstrap-sweetalert/dist/types";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

type IProps = {
  id: Props["id"]
}

type Alert = {
  show: boolean,
  type?: SweetAlertType,
  title?: string,
  message?: string,
  btnText?: string,
}

enum ResponseStatus {
  SUCCESS = "SUCCESS",
}

const Delete: React.FC<IProps> = ({id}) =>{
  const [alert, setAlert] = useState<Alert>({
    show: false,
    type: 'default',
    title: '',
    message: '',
    btnText: '',
  });

  const handleDelete = async() =>{
    if(id.length < 1){
      handleClose()
    }else{
      for (let i = 0; i < id.length; i++){
        try{
          const res = await axios.delete(`http://localhost:8080/users?id=${id[i]}`)
          if (res.data.status === ResponseStatus.SUCCESS){
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
        type: 'danger',
        title: 'Please select at least one user to delete',
        btnText: 'OK'
      })
    }else{
      setAlert({
        show: true,
        type: 'warning',
        title: 'Are you sure you want to delete the selected user(s)?',
        message: 'You will not be able to recover the deleted records!',
        btnText: 'Confirm'
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