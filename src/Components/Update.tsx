import axios from 'axios';
import React, { useState } from 'react'
import SweetAlert from "react-bootstrap-sweetalert";
import { SweetAlertRenderProps } from 'react-bootstrap-sweetalert/dist/types'

import { IState as Props } from './GetUsersPage'
import { User, ResponseStatus, AlertType, Alert, Response, AlertBtnText } from './common'

type IProps = {
  id: Props["id"]
  disabledBtn: Props["disabledBtn"]
}

const Update: React.FC<IProps> = ({id, disabledBtn}) => {
  const [user, setUser] = useState<User>({
    username: '',
    password: ''
  })

  const [modal, setModal] = useState<Alert>({
    show: false,
  })

  const handleModal = () => {
    setModal({
      show: true,
      type: AlertType.CONTROLLED,
      btnText: AlertBtnText.CONFIRM,
      btnType: AlertType.WARNING,
    })
  }

  const handleClose = () => {
    setModal({show: false})
  }

  const handleUpdate = async() =>{
    let response: Response 
    try{
      response = await axios.patch('http://localhost:8080/users', {
        id: id[0],
        username: user.username,
        password: user.password,
      })
      if (response.data.status === ResponseStatus.SUCCESS){
        window.location.reload()
      }
    }catch(err){
      console.log(err)
    }
  }

  return(
    <div>
      <button onClick= {handleModal} className="btn btn-warning" disabled={disabledBtn}> Update</button>
      <React.Fragment>
          <SweetAlert
            show={modal.show}
            title={''}
            type={modal.type}
            dependencies={[user.username, user.password]}
            onConfirm={handleUpdate}
            onCancel={handleClose}
            confirmBtnText={modal.btnText}
            confirmBtnBsStyle={modal.btnType}
            closeOnClickOutside
            showCloseButton
          >
            {
              (renderModal: SweetAlertRenderProps) => (
                <form>
                  User's ID: #{id[0]}
                  <hr/>
                 <input
                  type={'text'}
                  className='form-control'
                  value={user.username || ''}
                  onKeyDown={renderModal.onEnterKeyDownConfirm}
                  onChange={(e) => setUser({...user, username: e.target.value})}
                  placeholder={'Username'}
                 />
                 <br />
                 <input
                  type={'text'}
                  className='form-control'
                  value={user.password || ''}
                  onKeyDown={renderModal.onEnterKeyDownConfirm}
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  placeholder={'Password'}
                 />
                 <hr/>
                </form>
              )
            }
          </SweetAlert>
        </React.Fragment>
    </div>
  )
}

export default Update;
