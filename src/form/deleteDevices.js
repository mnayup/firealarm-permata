import axios from 'axios';
import React,{useEffect,useState} from 'react';
import swal from 'sweetalert';

  
  export default function DeleteDevicesForm() {
    const [dataEditCabang,setDataEditCabang] = useState([]);
    const [namaCabang,setNamaCabang] = useState("");

    const daftarPerangkat = dataEditCabang.map(item => {
      return <option>{item.cabang}</option>
      }
    )

    const getNamaCabang = (e) => {
      console.log(e.target.value)
      if(e.target.value=="")
      {
        console.log(e)
      }
      else{
        setNamaCabang(e.target.value)
      }
    }
    
    const getEditCabang = () => {
      
      axios({
        method: 'get',
        url: 'http://192.168.100.78:5000/cabang',
      })
        .then((response)=> {
          // console.log("response.data")
          // console.log(response.data)
          if(response.data.length ===0)
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
        })
    }

    useEffect(()=>{
      
      getEditCabang()
    },[])

    const submitData = async (e) =>
    {
      // if(namaCabang.length<3)
      // {
      //   swal({
      //     title: "Data Not Correct",
      //     // text: "You clicked the button!",
      //     icon: "warning",
      //     button: "OK",
      //   });
      // }     
      swal({
        title: "Do you want to delete this branch ?",
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
            url: "http://192.168.100.78:5000/deletecabang",
            data: {
              cabang: namaCabang,
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
    //   }
    }
      return(
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                  Nama Cabang
                </label>
                <div class="relative">
                  <select onChange={getNamaCabang} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" >
                    <option selected disabled value="">Pilih Cabang</option>
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
  