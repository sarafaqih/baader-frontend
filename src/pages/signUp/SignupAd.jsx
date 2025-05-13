import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function Signup() {

    const [formData, setFormData] = useState({
        username:"",
        password:"",
        role:"admin",
        gender:"",
        ContactNo:"",
        firstName:"",
        lastName:"",

    })

    const navigate = useNavigate()
    

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,formData)
            navigate("/login")
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div>
<h1>Admin - Sign Up </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
         type="text"
         name='username'
         id='username'
         required
         value={formData.username}
         onChange={handleChange}
          />

          <br/>
          <br/>


        <label htmlFor="password">Password: </label>
        <input
         type="password"
         name='password'
         id='password'
         required
         value={formData.password}
         onChange={handleChange}
          />

          <br/>
          <br/>


          <label htmlFor="firstName">First Name: </label>
        <input
         type="text"
         name='firstName'
         id='firstName'
         required
         value={formData.firstName}
         onChange={handleChange}
          />

<br/>
<br/>



<label htmlFor="lastName">Last Name: </label>
        <input
         type="text"
         name='lastName'
         id='lastName'
         required
         value={formData.lastName}
         onChange={handleChange}
          />
<br/>

          {/* <label htmlFor="role">Role:</label> */}
        <input
         type="text"
         name='role'
         id='role'
         value="admin"
         hidden
         required
         onChange={handleChange}
          />

          <br/>


      <label htmlFor="gender">Gender: </label>
        <select
         required
         type="text"
         name='gender'
         id='gender'
         value={formData.gender}
         onChange={handleChange}
          >
          <option value='' disabled>Choose your Gender</option>
          <option value='female'>Female</option>
          <option value='male'>Male</option>
          </select>


       
<br/>
<br/>


<label htmlFor="ContactNo">Contact No: </label>
        <input
         type="number"
         name='ContactNo'
         id='ContactNo'
         required
         value={formData.ContactNo}
         onChange={handleChange}
          />




<br/>
<br/>
          <button>Submit</button>
      </form>
    </div>
  )
}

export default Signup
