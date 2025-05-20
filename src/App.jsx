import './App.css'
import {Routes , Route, useNavigate} from 'react-router'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import SignupAd from './pages/signUp/SignupAd'
import SignupPa from './pages/signUp/SignupPa'
import SignupVu from './pages/signUp/SignupVu'
import ApplicationNavbar from './components/ApplicationNavbar'

import { useContext, useState, useEffect } from 'react';
import { authContext } from './context/AuthContext'
import TeachList from './components/TeachList/TeachList'
import * as teachService from './services/teachService';
import TeachForm from './components/TeachList/TeachForm'
import ClassForm from './components/ClassList/ClassForm'
import ClassList from './components/ClassList/ClassList'

function App() {

  const {user} = useContext(authContext)
  const navigate = useNavigate();
  const [teachs, setTeachs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [children, setChildren] = useState([]);
  


  useEffect(() => {
    const fetchAllteachs = async () => {
      const teachsData = await teachService.index();
      setTeachs(teachsData);
    };
    const fetchAllClasses = async () => {
    const classData = await teachService.getAllClasses();
    setClasses(classData);
    }

    if (user) {
      fetchAllteachs()
       fetchAllClasses()
      }
    // if(user.role==='parent'){
    //   fetchAllChildren();
    // }
  }, [user]);
  
    const fetchAllChildren = async () => {
      console.log("fetching children")
    const childrenData = await teachService.getAllChildren(user._id);
    setChildren(childrenData);
    }


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
  navigate(`/`);
}

const handleUpdateClass = async (classId, ClassFormData) => {
  const updatedClass = await teachService.updateClass(classId, ClassFormData);
  setClasses(classes.map((oneClass) => (classId === oneClass._id ? updatedClass : oneClass)));
  navigate(`/teach/classes`);
};



const handelReservations = async(user, teachId, reservationData) => {
  const newReservation = await teachService.createReservations(user,teachId,reservationData);
  setReservations([newReservation, ...reservations])
  navigate('/')

}


  return (
    <>
      <ApplicationNavbar/>
      <Routes>
        <Route path='/' element={<Homepage classes={classes} user={user} fetchAllChildren={fetchAllChildren} handleUpdateClass={handleUpdateClass} />}/>

       {user ? (
          <>
           <Route path='/teachs' element={<TeachList teachs={teachs} user={user} handleDeleteTeach={handleDeleteTeach}/>} />
           <Route path='/teach/new' element={<TeachForm handleAddTeach={handleAddTeach}/>} />
           <Route path='/teachs/:teachId/edit' element={<TeachForm handleUpdateTeach={handleUpdateTeach}/>}/>
           <Route path='/teachs/:teachId/class' element={<ClassForm handleAddClass={handleAddClass} handleUpdateTeach={handleUpdateTeach}/>}/> 
           <Route path='teach/classes' element={<ClassList classes={classes} user={user}/>} />

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
