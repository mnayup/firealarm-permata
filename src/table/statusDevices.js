import React,{useEffect,useState} from 'react';
import { getQueriesForElement } from '@testing-library/react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import moment from 'moment';
import { io } from 'socket.io-client';
import { alamat } from '../connection/url';

const socket = io(alamat,{});
  
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
        sortable: true,
        conditionalCellStyles: [
          {
            when: row => row.statuss == 'Online',
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
            when: row=> row.statuss == 'Offline',
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
        name: 'Waktu Terakhir Online',
        selector: row => row.waktuTerakhirOnline,
        sortable: true,
        // maxWidth: '50px',
    },
];

  export default function StatusDevices() {
    const [dataStatusDevices,setDataStatusDevices] = useState([])
    const getStatusDevices = () => {
      axios({
        method: 'get',
        url: alamat+'/notifoffline',
      })
        .then((response)=> {
          // console.log(response.data,"ahjdfhakjhss")
          let tmp = response.data.map((val,index)=>{
              return {
                ...val,
                waktuTerakhirOnline : moment(val.lastonline).format("DD/MM/YYYY HH:mm:ss")
              }
          })
          setDataStatusDevices(tmp)
        }).catch((err)=>{
          console.log("Gagal",err)
        })
    }

    useEffect(()=>{
      getStatusDevices()
      socket.on('infoSTCABANGOFFLINE',(argumen) => {
        // console.log(argumen,">>>>>>>>")
        let tmp = argumen.map((val,index)=>{
            return {
              ...val,
              waktuTerakhirOnline : moment(val.lastonline).format("DD/MM/YYYY HH:mm:ss")
            }
        })
        // console.log(tmp,"<<<<<<<<>>>>>>>>>>>>>>>>")
        setDataStatusDevices(tmp)
      })

      return () => {
        socket.off("infoSTCABANGOFFLINE")
      }
    },[])

    return (  
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <h1 className="px-6 py-3 text-left text-m font-medium text-gray-500 uppercase tracking-wider">Status Devices</h1>
                <div className="px-6">
                  <DataTable
                      // title="Status Monitoring Kebakaran"
                      columns={columns}
                      data={dataStatusDevices}
                      pagination
                      paginationRowsPerPageOptions={[5,15,50,100]}
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