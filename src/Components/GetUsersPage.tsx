import React, {useState} from "react";
import Table from "./Table";
import Delete from "./Delete";
import Update from "./Update";

export type IState = {
  id: number[]
  disabledBtn: boolean,
}

const GetUsersPage: React.FC = () =>{
  const [id, setId] = useState<IState["id"]>([]);
  const [disabledBtn, setDisabledBtn] = useState<IState["disabledBtn"]>(false)

  return (
    <div className="container mt-5">
      <div className="container-fluid">
        <Table setId={setId} setDisabledBtn={setDisabledBtn}/>
        <div className="d-flex justify-content-between ps-4 mt-5">
          <Delete id={id}/>
          <Update id={id} disabledBtn={disabledBtn}/>
        </div>
      </div>
    </div>
  )
}

export default GetUsersPage;