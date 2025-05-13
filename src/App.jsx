import './App.css'
import {Routes , Route, useNavigate} from 'react-router'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import SignupAd from './pages/signUp/SignupAd'
import SignupPa from './pages/signUp/SignupPa'
import SignupVu from './pages/signUp/SignupVu'
import Navbar from './components/Navbar'

import { useContext, useState, useEffect } from 'react';
import { authContext } from './context/AuthContext'
import TeachList from './components/TeachList/TeachList'
import * as teachService from './services/teachService';
import TeachForm from './components/TeachList/TeachForm'
import ClassForm from './components/ClassList/ClassForm'






function App() {

  const {user} = useContext(authContext)
  const navigate = useNavigate();
  const [teachs, setTeachs] = useState([]);
  const [classes, setClasses] = useState([]);




  useEffect(() => {
    const fetchAllteachs = async () => {
      const teachsData = await teachService.index();
      setTeachs(teachsData);
    };
    if (user) fetchAllteachs();
  }, [user]);
  

  const handleAddTeach = async (teachFormData) => {
    // console.log('teachFormData', teachFormData)
    const newTeach = await teachService.create(teachFormData);
    setTeachs([newTeach, ...teachs]);
    navigate('/teachs');
  };


  const handleDeleteTeach = async (teachId) => {
    const deletedTeach = await teachService.deleteTeach(teachId);
    setTeachs(teachs.filter((teach) => teach._id !== deletedTeach._id));
    navigate('/teachs');
  }




const handleUpdateTeach = async (teachId, teachFormData) => {
  const updatedTeach = await teachService.update(teachId, teachFormData);
  setTeachs(teachs.map((teach) => (teachId === teach._id ? updatedTeach : teach)));
  navigate(`/teachs`);
};





const handleAddClass = async (teachId, classFormData) => {
  const newClass = await teachService.createClass(teachId, classFormData);
  setClasses([newClass, ...classes]);
  navigate(`/teachs`);
}



  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
       
       {user ? (
          <>
           <Route path='/teachs' element={<TeachList teachs={teachs} user={user} handleDeleteTeach={handleDeleteTeach}/>} />
           <Route path='/teach/new' element={<TeachForm handleAddTeach={handleAddTeach}/>} />
           <Route path='/teachs/:teachId/edit' element={<TeachForm handleUpdateTeach={handleUpdateTeach}/>}/>
           <Route path='/teachs/:teachId/class' element={<ClassForm handleAddClass={handleAddClass} handleUpdateTeach={handleUpdateTeach}/>}/> 
          </>


        ) : (
         
         <>
        <Route path="/signupAd" element={<SignupAd/>}/>
        <Route path="/signupPa" element={<SignupPa/>}/>
        <Route path="/signupVu" element={<SignupVu/>}/>

        <Route path="/login" element={<Login/>}/>
        </>
      )}
      </Routes>
    </>
  )
}

export default App
