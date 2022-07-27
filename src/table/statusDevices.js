import React,{useEffect,useState} from 'react';
import { getQueriesForElement } from '@testing-library/react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import moment from 'moment';
import { io } from 'socket.io-client';

const socket = io('http://192.168.100.78:5000',{});

const statusCabang = [
    {
      namaCabang: 'Surabaya - MERR',
      statusPerangkat: 'Offline',
      waktuTerakhir: '2022-07-08 14:23:58',
    },
    {
      namaCabang: 'Bojonegoro - Untung Suropati',
      statusPerangkat: 'Offline',
      waktuTerakhir: '2022-07-08 14:23:58',
    },
    {
      namaCabang: 'Surabaya - MERR',
      statusPerangkat: 'Offline',
      waktuTerakhir: '2022-07-08 14:23:58',
    },
    {
      namaCabang: 'Bojonegoro - Untung Suropati',
      statusPerangkat: 'Offline',
      waktuTerakhir: '2022-07-08 14:23:58',
    },
    {
      namaCabang: 'Surabaya - MERR',
      statusPerangkat: 'Offline',
      waktuTerakhir: '2022-07-08 14:23:58',
    },
    {
      namaCabang: 'Bojonegoro - Untung Suropati',
      statusPerangkat: 'Offline',
      waktuTerakhir: '2022-07-08 14:23:58',
    },
  ]
  
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
        url: 'http://192.168.100.78:5000/notifoffline',
      })
        .then((response)=> {
          // console.log(response.data)
          let tmp = response.data.map((val,index)=>{
              return {
                ...val,
                waktuTerakhirOnline : moment(val.lastonline).format("DD/MM/YYYY hh:mm:ss")
              }
          })

          // console.log(tmp)

          setDataStatusDevices(tmp)
        }).catch((err)=>{
          console.log("Gagal",err)
        })
    }

    useEffect(()=>{
      getStatusDevices()
      socket.on('infoSTCABANGOFFLINE',(argumen) => {
        console.log(argumen,">>>>>>>>")
        setDataStatusDevices(argumen)
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
      // <div className="flex flex-col">
      //   <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      //     <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      //       <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      //           <h1 className="px-6 py-3 text-left text-m font-medium text-gray-500 uppercase tracking-wider">Status Devices</h1>
      //         <table className="min-w-full divide-y divide-gray-200">
      //           <thead className="bg-gray-50">
      //             <tr>
      //               <th
      //                 scope="col"
      //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      //               >
      //                 No
      //               </th>
      //               <th
      //                 scope="col"
      //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      //               >
      //                 Nama Cabang
      //               </th>
      //               <th
      //                 scope="col"
      //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      //               >
      //                 Status Perangkat
      //               </th>
      //               <th
      //                 scope="col"
      //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      //               >
      //                 Waktu Terakhir Online
      //               </th>
      //               <th scope="col" className="relative px-6 py-3">
      //                 <span className="sr-only">Edit</span>
      //               </th>
      //             </tr>
      //           </thead>
      //           <tbody className="bg-white divide-y divide-gray-200">
      //             {statusCabang.map((lokasi,index) => (
      //               <tr key={lokasi.no}>
      //                 <td className="px-6 py-4 whitespace-nowrap">
      //                   <div className="flex items-center">
      //                     <div className="ml-4">
      //                       {/* <div className="text-sm font-medium text-gray-900">{lokasi.no}</div> */}
      //                       <div className="text-sm font-medium text-gray-900">{index+1}</div>
      //                     </div>
      //                   </div>
      //                 </td>
      //                 <td className="px-6 py-4 whitespace-nowrap">
      //                   <div className="text-sm text-gray-900">{lokasi.namaCabang}</div>
      //                 </td>
      //                 <td className="px-6 py-4 whitespace-nowrap">
      //                   {lokasi.statusPerangkat=='Online'
      //                       ?<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{lokasi.statusPerangkat}</span>
      //                       :<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">{lokasi.statusPerangkat}</span>}
      //                 </td>
      //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lokasi.waktuTerakhir}</td>
      //               </tr>
      //             ))}
      //           </tbody>
      //           {/* <tfoot>
      //             <div className='col'>
      //               <div className='pagination py-2'>
      //                 <a href="#">&laquo;</a>
      //                   {statusCabang.length>10
      //                     ?<a href="#">1</a>
      //                     :
      //                   }
      //                 <a class="active" href="#">2</a>
      //                 <a href="#">3</a>
      //                 <a href="#">4</a>
      //                 <a href="#">5</a>
      //                 <a href="#">&raquo;</a>
      //               </div>
      //             </div>
      //           </tfoot> */}
      //         </table>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    )
  }