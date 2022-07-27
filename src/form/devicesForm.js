import axios from 'axios';
import React,{useEffect,useState} from 'react';
import swal from 'sweetalert';

const options = [
    'ar3rfa', 'af3rst', 'jgju6u', 'jrfjyb3', 'jfg5yj',
    'ar3rfa', 'af3rst', 'jgju6u', 'jrfjyb3', 'jfg5yj',
  ];
  
  export default function DevicesForm() {
    const [dataEditCabang,setDataEditCabang] = useState([]);
    const [namaCabang,setNamaCabang] = useState("");
    const [kodePerangkat,setKodePerangkat] = useState("");

    const daftarPerangkat = dataEditCabang.map(item => {
      return <option>{item.kode_perangkat}</option>
      }
    )

    const getValue = (e) => {
      // if(e.target.value=="Pilih Kode Perangkat"){
      //   console.log("blogggg")
      // }
      // else{
        console.log(e.target.value)
        setKodePerangkat(e.target.value)
      // }
    }

    const getNamaCabang = (e) => {
      console.log(e.target.value)
      if(e.target.value=="")
      {
        
      }
      else{
        setNamaCabang(e.target.value)
      }
    }
    
    const getEditCabang = () => {
      axios({
        method: 'get',
        url: 'http://192.168.100.78:5000/notsigned',
      })
        .then((response)=> {
          // let tmp = response.data.map((val,index)=>{
          //     return {
          //       // ...val,
          //       // waktuTerakhirOnline : moment(val.lastonline).format("DD/MM/YYYY hh:mm:ss")
          //     }
          // })

          // console.log(tmp)
          console.log(response.data,"**************")
          if(response.data.length===0)
          {
            swal({
              title: "Tidak Ada Perangkat Yang Tersedia",
              // text: "You clicked the button!",
              icon: "warning",
              button: "OK",
            });
          }
          setDataEditCabang(response.data)
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
      getEditCabang()
    },[])

    const submitData = async (e) =>
    {
      if(namaCabang.length<3||kodePerangkat=="")
      {
        swal({
          title: "Data Not Correct",
          text: "Please check your input data",
          icon: "warning",
          button: "OK",
        });
      }     
      else{
        
      swal({
        title: "Do you want to add new branch ?",
        // text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((Add) => {
        if (Add) {
          e.preventDefault();
          axios({
            method: "post",
            url: "http://192.168.100.78:5000/updateperangkat",
            data: {
              cabang: namaCabang,
              kode_perangkat: kodePerangkat,
            },
          })
            .then(async (res) => {
              console.log(res.data);
              getEditCabang();
            })
            .catch((err) => {
              console.log(err);
            }); 
          swal("Congrats !", {
            icon: "success",
          });
        } 
      });
      }
    }
      return(
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Nama Cabang
                </label>
                {/* <input onChange={(e) => setNamaCabang(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Nama Cabang"/> */}
                <input onChange={getNamaCabang} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Nama Cabang"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                  Kode Perangkat
                </label>
                <div class="relative">
                  <select onChange={getValue} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" placeholder="Kode Perangkat">
                    <option selected disabled value="">Pilih Kode Perangkat</option>
                    {daftarPerangkat}
                  </select>
                </div>
              </div>
            </div>
            <div className="py-8">
              <button onClick ={submitData} class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-3 rounded" type="button">
                Submit
              </button>
            </div>
          </form>
      )
  }
  