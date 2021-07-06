import React, {useState} from "react";
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { SweetAlertType } from "react-bootstrap-sweetalert/dist/types";

type User = {
  username: string, 
  password: string
}

type Response = {
  data: {
    status: string,
    message: string
  }
}

type Alert = {
  show: boolean,
  type: SweetAlertType,
  title: string,
  message: string
}

//enum serves the purpose like constants - capital letters 
enum ResponseStatus {
  SUCCESS = "SUCCESS",
  FAIL = "FAIL"
}

enum AlertType {
  SUCCESS = "success",
  DANGER = "danger"
}

const Signup: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: '' , 
    password: ''
  })

  const [alert, setAlert] = useState<Alert>({
    show: false,
    type: "default",
    title: '',
    message: ''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => {
    setAlert({
      show: false,
      type: "default",
      title: '',
      message: ''
    })
    setUser({
      username: '' , 
      password: ''
    })
  }

  const handleSignUp = async() =>{
    let response: Response
    try{
      response = await axios.post(`http://localhost:8080/users`, user)
      if(response.data.status === ResponseStatus.SUCCESS) {
        setAlert({
          show: true,
          type: AlertType.SUCCESS,
          title: ResponseStatus.SUCCESS,
          message: response.data.message
        })
      }else{
        setAlert({
          show: true,
          type: AlertType.DANGER,
          title: ResponseStatus.FAIL,
          message: response.data.message
        })
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="container-fluid mt-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-3">
              <label className="col-form-label font-color">Username</label>
            </div>
            <div className="col-6">
              <input type="text" name="username" className="form-control" value={user.username} onChange={handleChange}></input>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <label className="col-form-label font-color">Password</label>
            </div>
            <div className="col-6">
              <input type="password" name="password" className="form-control" value={user.password} onChange={handleChange}></input>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end">
          <button type="submit" className="btn-style" onClick={handleSignUp}>Submit</button>
          </div>
        </div>
        <React.Fragment>
        <SweetAlert
          show={alert.show}
          type={alert.type}
          title={alert.title}
          onConfirm={handleClose}
          onCancel={handleClose}
          closeOnClickOutside
          confirmBtnBsStyle={alert.type}>
          {alert.message}
        </SweetAlert>
      </React.Fragment>
    </div>
  )
}

export default Signup