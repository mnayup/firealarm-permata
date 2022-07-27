const options = [
    'ar3rfa', 'af3rst', 'jgju6u', 'jrfjyb3', 'jfg5yj',
    'ar3rfa', 'af3rst', 'jgju6u', 'jrfjyb3', 'jfg5yj',
  ];
  
  export default function GantiPasswordForm() {
    const daftarPerangkat = options.map(item => 
    <option>{item}</option>
    )
      return(
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Password Lama
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="passwordLama" type="password" placeholder="*******"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Password Baru
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="passwordBaru" type="password" placeholder="*******"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Ulangi Password Baru
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="ulangiPasswordBaru" type="password" placeholder="*******"/>
                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
            </div>
            <div className="py-8">
              <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-3 rounded" type="button">
                Submit
              </button>
            </div>
          </form>
      )
  }
  