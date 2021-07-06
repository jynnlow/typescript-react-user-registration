import React, { useState } from 'react'
import {IState as Props} from './GetUsersPage'
import { SweetAlertType, SweetAlertRenderProps } from 'react-bootstrap-sweetalert/dist/types'
import SweetAlert from "react-bootstrap-sweetalert";
import axios from 'axios';

type IProps = {
  id: Props["id"]
  disabledBtn: Props["disabledBtn"]
}

type User = {
  username?: string,
  password?: string
}

type Modal = {
  show: boolean,
  type?: SweetAlertType,
  btnText?: string,
  btnType?: string,
}

enum ResponseStatus {
  SUCCESS = "SUCCESS",
}

const Update: React.FC<IProps> = ({id, disabledBtn}) => {
  const [user, setUser] = useState<User>({
    username: '',
    password: ''
  })

  const [modal, setModal] = useState<Modal>({
    show: false,
  })

  const handleModal = () => {
    setModal({
      show: true,
      type: 'controlled',
      btnText: 'Confirm',
      btnType: 'warning',
    })
  }

  const handleClose = () => {
    setModal({show: false})
  }

  const handleUpdate = async() =>{
    console.log(user.username, user.password)
    try{
      const res = await axios.patch('http://localhost:8080/users', {
        id: id[0],
        username: user.username,
        password: user.password,
      })
      if (res.data.status === ResponseStatus.SUCCESS){
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
