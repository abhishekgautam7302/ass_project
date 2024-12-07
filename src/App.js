
import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './Components/Navbar';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import Dashboard from './Components/Dashboard';
import { useState } from 'react';
import Home from './Components/Home';

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  }
  return (
    <div >
      <Navbar onSearchChange={handleSearchChange} />
     {/* <Dashboard searchTerm={searchTerm} /> */}
     <Routes>
     <Route path="/" element ={<Home/>}></Route>
      <Route path='/login' element ={<LoginForm/>}></Route>
      <Route path='/signup' element ={<SignupForm/>}></Route>
      <Route path='/dashboard' element ={<Dashboard searchTerm={searchTerm}/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
