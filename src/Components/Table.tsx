import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'

type Columns = {
  name: string;
  selector: string;
  sortable: boolean;
  grow: number;
}

type Data = {
  id: number;
  username: string;
  password: string;
}

type IProps = {
  setId: React.Dispatch<React.SetStateAction<number[]>>
  setDisabledBtn: React.Dispatch<React.SetStateAction<boolean>>
}

const Table: React.FC<IProps> = ({setId, setDisabledBtn}) => {
  const [data, setData] = useState<Data[]>([])
  const columns: Columns[] = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      grow: -1,
    },
    {
      name: 'Username',
      selector: 'username',
      sortable: true,
      grow: 1,
    },
    {
      name: 'Hashed Password',
      selector: 'password',
      sortable: true,
      grow: 4,
    },
   ]

   const styles = {
    rows: {
      style: {
        minHeight: '72px',
        fontSize: '16px' 
      }
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
      },
    },
    table: {
      style: {
        minHeight: '200px'
      },
    },
  };

  const handleSelection = async (state: any) => {
    const selectedRows: Data[] = await state.selectedRows
    const selectedId: number[] = selectedRows.map((selectedRow) => {
        return selectedRow.id
      })
    setId(selectedId)
    if(selectedId.length > 1){
      setDisabledBtn(true)
    }else{
      setDisabledBtn(false)
    }
  }

   useEffect(() => {
    async function fetchData(){
      try{
        const res = await axios.get('http://localhost:8080/users',{
          headers:{
            'Authorization':'Bearer ' +  window.localStorage.getItem('token')
          }
        });
        setData(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
   },[])

  return (
    <div className="container mt-5">
      <div className="container-fluid">
        <div className="table-wrapper">
          <DataTable
          columns={columns}
          data={data}
          customStyles={styles}
          selectableRows
          onSelectedRowsChange = {handleSelection}
          />
        </div>
      </div>
    </div>
  )
}

export default Table; 
