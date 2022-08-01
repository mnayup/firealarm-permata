import React,{useEffect,useState} from 'react';
// import { getQueriesForElement } from '@testing-library/react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import  io  from 'socket.io-client';
import swal from 'sweetalert';
import { alamat } from '../connection/url';

// A super simple expandable component.
// const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
// const paginationComponentOptions = {
//   rowsPerPageText: 'Filas por página',
//   rangeSeparatorText: 'de',
//   selectAllRowsItem: true,
//   selectAllRowsItemText: 'Todos',
// }
const socket = io(alamat,{});

  export default function StatusMonitoring() {
    const [dataStatusCabang,setDataStatusCabang] = useState([])
    const [tampungData,setTampungData] = useState([])
    const getStatusCabang = () => {
      axios({
        method: 'get',
        url: alamat+'/notifonline',
      })
        .then((response)=> {
          // console.log(response.data.length)
          setDataStatusCabang(response.data)
        }).catch((err)=>{
          console.log("Gagal",err)
          if(err.message==="Network Error")
          {
            swal({
              title: "Check your internet connection",
              // text: "You clicked the button!",
              icon: "warning",
              button: "OK",
            });
          }
        })
    }

    useEffect(()=>{
      getStatusCabang()
      socket.on('infoSTCABANGONLINE',(argumen) => {
        // console.log(argumen, "<<<<<")
        setDataStatusCabang(argumen)
      })

      return () => {
        socket.off("infoSTCABANGONLINE")
      }
    },[])

    const columns = [
      // {
      //   name: 'No',
      //   selector: (row, index) => index+1,
      //   grow: 0,
      // },
      {
          name: 'Nama Cabang',
          selector: row => row.cabang,
          sortable: true,
  
      },
      {
          name: 'Status Perangkat',
          selector: row => row.statuss,
          // sortable: true,
          conditionalCellStyles: [
            {
              when: row => row.statuss === 'Online',
              style: {
                // backgroundColor: 'rgba(50, 50, 50, 0.8)',
                color:'rgb(0,255,120)',
                backgroundColor:'transparent',
                borderRadius :'40px',
                // paddingLeft:'30px',
                // paddingRight:'2em',
                // height: '50%',
                width: '100%',
                fontWeight: 1000,
                // alignItems: 'center',
                // justifyContent: 'center',
              }
            },
            {
              when: row=> row.statuss === 'Offline',
              style:{
                color:'red',
                backgroundColor:'transparent',
                borderRadius :'40px',
                width: '100%',
                fontWeight: 1000,
              }
            }
          ]
      },
      {
          name: 'Status Kebakaran',
          selector: row => row.kejadian,
          sortable: true,
          // maxWidth: '50px',
      },
  ];
    

    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <h1 className="px-6 py-3 text-left text-m font-medium text-gray-500 uppercase tracking-wider">Status Monitoring Kebakaran</h1>
                <div className="px-6">
                  <DataTable
                      // title="Status Monitoring Kebakaran"
                      columns={columns}
                      data={dataStatusCabang}
                      pagination
                      // paginationComponentOptions={paginationComponentOptions}
                      paginationRowsPerPageOptions={[10,25,50,100]}
                      striped
                      // expandableRows
                      // expandableRowsComponent={ExpandedComponent}
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }