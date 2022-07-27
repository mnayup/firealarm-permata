  import { NavLink } from "react-router-dom";

  export default function SelectEditCard() {
    return (
      <div class="container my-6 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
          {/* <!-- Column --> */}
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
              {/* <!-- Article --> */}
              <article class="overflow-hidden rounded-lg shadow-lg">
                  <NavLink to ="/tambahCabang">
                      <img alt="Placeholder" class="block h-auto w-full" src={require("../images/AddCabang.jpg")}/>
                  </NavLink>
                  <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                      <h1 class="text-lg">
                          <NavLink class="no-underline hover:underline text-black" to="/tambahCabang">
                              Tambah Cabang
                          </NavLink>
                      </h1>
                  </header>
              </article>
              {/* <!-- END Article --> */}
            </div>
            {/* <!-- END Column --> */}
            {/* <!-- Column --> */}
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
              {/* <!-- Article --> */}
              <article class="overflow-hidden rounded-lg shadow-lg">
                  <NavLink to="/hapusCabang">
                      <img alt="Placeholder" class="block h-auto w-full" src={require("../images/DeleteCabang.jpg")}/>
                  </NavLink>
                  <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                      <h1 class="text-lg">
                          <NavLink class="no-underline hover:underline text-black" to="/hapusCabang">
                              Hapus Cabang
                          </NavLink>
                      </h1>
                  </header>
              </article>
              {/* <!-- END Article --> */}

            </div>
            {/* <!-- END Column --> */}
          </div>
      </div>

    );
  }
