import Navbar from './../navigation/navbar';
// import 'react-dropdown/style.css';
import GantiPasswordForm from '../form/gantiPasswordForm';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const GantiPassword = () => {
  return (
    <div className="flex flex-col">
    {/* <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
    <div>
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <h1 className="px-6 py-3 text-left text-m font-medium text-gray-500 uppercase tracking-wider">Ganti Password</h1>
          <div className='py-6 px-6'>
            <GantiPasswordForm/>
          </div>
      </div>
    </div>
  </div>
  )
};

export default GantiPassword;