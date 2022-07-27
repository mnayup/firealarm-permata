import DeleteDevicesForm from "../form/deleteDevices";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const HapusCabang = () => {
  return (
    <div className="flex flex-col">
    <div>
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <h1 className="px-6 py-3 text-left text-m font-medium text-gray-500 uppercase tracking-wider">Penghapusan Cabang</h1>
          <div className='py-6 px-6'>
            <DeleteDevicesForm/>
          </div>
      </div>
    </div>
  </div>
  )
};

export default HapusCabang;