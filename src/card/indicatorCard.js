import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { alamat } from '../connection/url';

const socket = io(alamat,{});

  export default function IndicatorCard() {
    // const [dataLoading,setLoading] = useState(false)
    const [dataStatusCabang,setIndicatorCabang] = useState({})
    const getIndicatorCabang = () => {
      axios({
        method: 'get',
        url: alamat+'/notifall',
      })
        .then(async(response)=> {
          console.log("ttutp")
          Swal.close()
          setIndicatorCabang(response.data)
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

      // setLoading(true)
      // if(!dataLoading)
      // {
      //   let timerInterval
      //   Swal.fire({
      //     title: 'Loading',
      //     // html: 'I will close in <b></b> milliseconds.',
      //     // timer: 2000,
      //     // timerProgressBar: true,
      //     didOpen: () => {
      //       console.log("didOpen")
      //       Swal.showLoading()
      //       // const b = Swal.getHtmlContainer().querySelector('b')
      //       // timerInterval = setInterval(() => {
      //       //   b.textContent = Swal.getTimerLeft()
      //       // }, 100)
      //     },
      //     willClose: () => {
      //       console.log("willclose")
      //       // clearInterval(timerInterval)
      //       // Swal.DismissReason.backdrop
      //       setLoading=false
      //     }
      //   }).then((result) => {
      //     console.log("then")
      //     /* Read more about handling dismissals below */
      //     // if (result.dismiss === Swal.DismissReason.timer) {
      //     //   console.log('I was closed by the timer')
      //     // }
      //     Swal.close()
      //   })
      // }
      Swal.fire({
  title:"loading...",
  didOpen(){
    Swal.showLoading()
  },
  allowOutsideClick:false,
  allowEscapeKey:false,
  allowEnterKey:false
  
})
      // getIndicatorCabang()
      socket.on('infoSCABANGKEBAKARAN',(argumen) => {

        console.log(argumen, "&&&&&&")
        setIndicatorCabang(argumen)
        if(argumen.kebakaran >0)
        {swal({
          title: "Terjadi Kebakaran Di Cabang",
          text: "Cek lokasi pada menu dashboard Cabang Kebakaran",
          icon: "warning",
          dangerMode: true,
          button: "OK",
        });
        }
        Swal.close();
      })
      socket.on('infoSCABANG',(argumen) => {
        console.log(argumen, ">>>>>>>>>>>>>>>>>>>>>>>")
        setIndicatorCabang(argumen)
        Swal.close();
      })
      return () => {
        socket.off("infoSCABANGKEBAKARAN")
        socket.off("infoSCABANG")
      }
    },[])

    return (
      <div class="container my-6 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
          {/* <!-- Column --> */}
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
              {/* <!-- Article --> */}
              <article class="overflow-hidden rounded-lg shadow-lg">
                  {/* <a href="#">
                      <img alt="Placeholder" class="block h-auto w-full" src={require("../images/Building.jpg")} />
                  </a> */}

                  <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                      <h1 class="text-lg">
                          <a class="no-underline text-black" href="#">
                              Jumlah Cabang
                          </a>
                      </h1>
                      <p class="text-grey-darker text-lg">
                      {dataStatusCabang.jumlahCabang} Cabang
                      </p>
                  </header>
              </article>
              {/* <!-- END Article --> */}

            </div>
            {/* <!-- END Column --> */}
            {/* <!-- Column --> */}
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
              {/* <!-- Article --> */}
              <article class="overflow-hidden rounded-lg shadow-lg">
                  {/* <a href="#">
                      <img alt="Placeholder" class="block h-auto w-full" src={require("../images/Online.jpg")}/>
                  </a> */}

                  <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                      <h1 class="text-lg">
                          <a class="no-underline text-black" href="#">
                              Perangkat Online
                          </a>
                      </h1>
                      <p class="text-grey-darker text-lg">
                      {dataStatusCabang.online} Cabang
                      </p>
                  </header>
              </article>
              {/* <!-- END Article --> */}

            </div>
            {/* <!-- END Column --> */}
            {/* <!-- Column --> */}
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
              {/* <!-- Article --> */}
              <article class="overflow-hidden rounded-lg shadow-lg">
                  {/* <a href="#">
                      <img alt="Placeholder" class="block h-auto w-full" src={require("../images/Offline.jpg")}/>
                  </a> */}

                  <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                      <h1 class="text-lg">
                          <a class="no-underline text-black" href="#">
                              Perangkat Offline
                          </a>
                      </h1>
                      <p class="text-grey-darker text-lg">
                      {dataStatusCabang.offline} Cabang
                      </p>
                  </header>
              </article>
              {/* <!-- END Article --> */}
            </div>
            {/* <!-- END Column --> */}
            {/* <!-- Column --> */}
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
              {/* <!-- Article --> */}
              <article class="overflow-hidden rounded-lg shadow-lg">
                  {/* <a href="/cabangKebakaran">
                      <img alt="Placeholder" class="block h-auto w-full" src={require("../images/Flame.jpg")}/>
                  </a> */}

                  <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                      <h1 class="text-lg">
                          <a class="no-underline hover:underline text-black" href="/cabangKebakaran">
                              Cabang Kebakaran
                          </a>
                      </h1>
                      <p class="text-grey-darker text-lg">
                      {dataStatusCabang.kebakaran} Cabang
                      </p>
                  </header>
              </article>
              {/* <!-- END Article --> */}
            </div>
            {/* <!-- END Column --> */}
          </div>
      </div>

    );
  }
