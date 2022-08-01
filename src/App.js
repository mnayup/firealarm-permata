import './App.css';
import { BrowserRouter as Router,Routes,Route,Switch,Navigate,useLocation,Link } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import EditCabang from './pages/editCabang';
import GantiPassword from './pages/gantiPassword';
import CabangKebakaran from './pages/cabangKebakaran';
import TambahCabang from './pages/tambahCabang';
import HapusCabang from './pages/hapusCabang';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Navbar from './navigation/navbar';

function App() {
  return (
    <Router>
      {/* <navbar>
        <Navbar/>
      </navbar> */}
        <Routes>
          <Route path="/login" 
          
          element={<Login/>} />
          <Route
            path="/hapusCabang"
            element={
              <PrivateRoute>
                <navbar>
                  <Navbar/>
                </navbar>
                <HapusCabang/>
              </PrivateRoute>
            }/>
          <Route
            path="/tambahCabang"
            element={
              <PrivateRoute>
                <navbar>
                  <Navbar/>
                </navbar>
                <TambahCabang/>
              </PrivateRoute>
            }/>
          <Route
            path="/editCabang"
            element={
              <PrivateRoute>
                <navbar>
                  <Navbar/>
                </navbar>
                <EditCabang/>
              </PrivateRoute>
            }/>
          <Route
            path="/cabangKebakaran"
            element={
              <PrivateRoute>
                <navbar>
                  <Navbar/>
                </navbar>
                <CabangKebakaran/>
              </PrivateRoute>
            }/>
          <Route 
            path="/gantiPassword" 
            element={
              <PrivateRoute>
                <navbar>
                  <Navbar/>
                </navbar>
                <GantiPassword/>
              </PrivateRoute>
            }/>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <navbar>
                  <Navbar/>
                </navbar>
                <Dashboard/>
              </PrivateRoute>
            }
          />
        </Routes>
    </Router>
  );
}

function HandleLogin(){
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const cekToken = async () => {
    let token = await localStorage.getItem("refreshtoken");
    // console.log(token);
    if (token) {
      setAuth(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(()=>{
cekToken()
  })
}
function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const location = useLocation();
  const refreshToken = async () => {
    let token = await localStorage.getItem("refreshtoken");
    // console.log(token);
    if (token) {
      const decoded = jwt_decode(token);
      // console.log(decoded, "hasil");
      await localStorage.setItem("nama", decoded.name);
      setAuth(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  // console.log(auth);
  useEffect(() => {
    refreshToken();
  }, []);
  return loading ? (
    <div class="flex justify-center items-center">
      <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>
  ) : !auth ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
}

export default App;
