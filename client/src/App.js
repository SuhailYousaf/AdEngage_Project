import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the import changes
// import Home from './pages/user/Home';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import Layout from './components/Layout';
import HomeLayout from './components/Home/HomeLayout';
import AddImage from './pages/user/AddImage';
import SingleView from './pages/user/SingleView';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
        <Route path="" element={<Layout/>} >
          <Route path="/" element={<HomeLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AddImage" element={<AddImage />} />
          <Route path="/getImage/:id" element={<SingleView/>} />
          <Route path="/images/search" element={<HomeLayout/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
