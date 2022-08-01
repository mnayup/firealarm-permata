import axios from 'axios';
import React,{useEffect,useState} from 'react';
import swal from 'sweetalert';
import { alamat } from '../connection/url';

  export default function GantiPasswordForm() {
    const [userName,setUserName] = useState("");
    const [passwordLama,setPasswordLama] = useState("");
    const [msg,setMsg] = useState("");
    const [switchForm,setSwitchForm] = useState(false);
    const [passwordBaru,setPasswordBaru] = useState("");
    const [ulangiPasswordBaru,setUlangiPasswordBaru] = useState("");
    const cekPasswordLama = async() => {
      console.log(passwordLama)
      // axios({
      //   method: 'post',
      //   url: alamat+'/cekpasswordlama',
      //   data: {
      //     name: userName,
      //     password: passwordLama,
      //   },
      // })
      //   .then((response)=> {
      //     console.log(response.data.msg)
      //     setMsg("")
      //     setSwitchForm(true)
      //     setPasswordLama("")
      //   }).catch((err)=>{
      //     setMsg(err.response.data.msg)
      //     setSwitchForm(false)
      //   })
    }
    const getPasswordLama = (e) => {
      console.log(e.target.value)
      if(e.target.value=="")
      {
        console.log("Password Lama Belum Di Isi")
      }
      else{
        setPasswordLama(e.target.value)
        // console.log(userName,"<<<Username")
        // console.log(e.target.value)
      }
    }

    const cekPasswordBaru = async() => {
      console.log("Password Baru",passwordBaru)
      console.log("Ulang Password Baru",ulangiPasswordBaru)
    }
    const getPasswordBaru = (e) => {
      setPasswordBaru(e.target.value)
      // if(e.target.value=="")
      // {
      //   console.log("Password Baru Belum Di Isi")
      // }
      // else{
      //   setPasswordBaru(e.target.value)
      //   // console.log(userName,"<<<Username")
        console.log(e.target.value)
      // }
    }
    const getUlangiPasswordBaru = (e) => {
      setMsg("")
      if(e.target.value=="")
      {
        console.log("Ulangi Password Baru Belum Di Isi")
      }
      else{
        setUlangiPasswordBaru(e.target.value)
        console.log(e.target.value)
      }
      if(ulangiPasswordBaru==passwordBaru)
      {
        // setMsg("Password Tidak Sama")
      }
      else{
        setMsg("Password Tidak Sama")
      }
    }

    useEffect(()=>{
      setUserName(localStorage.getItem("nama"))
    },[])

    
      return(
        <form class="w-full max-w-lg">
        {switchForm==false?
          <>
          <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Password Lama
                  </label>
                  <input onChange={getPasswordLama} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="passwordLama" type="password" placeholder="*******" value={passwordLama}/>
                  <p class="text-red-500 text-xs italic">{msg}</p>
                </div>
              </div>
              <div className="py-8">
                <button onClick ={cekPasswordLama} class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-3 rounded" type="button">
                  Submit
                </button>
              </div>
          </>
            :
            <>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Password Baru
                </label>
                <input onChange={getPasswordBaru} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="new" type="password" placeholder="*******" value={passwordBaru}/>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Ulangi Password Baru
                </label>
                <input onChange={getUlangiPasswordBaru} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="ulangiPasswordBaru" type="password" placeholder="*******"/>
                <p class="text-red-500 text-xs italic">{msg}</p>
              </div>
            </div>
            <div className="py-8">
                <button onClick ={cekPasswordBaru} class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-3 rounded" type="button">
                  Submit
                </button>
              </div>
            </>
            }
          </form>
      )
  }
  