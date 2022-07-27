import Navbar from './../navigation/navbar';
import KebakaranOnly from '../table/kebakaranOnly';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const CabangKebakaran = () => {
  return (
    <div className="flex flex-col">
    <div>
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className='py-6 px-6'>
            <KebakaranOnly/>
          </div>
      </div>
    </div>
  </div>
  )
};

export default CabangKebakaran;