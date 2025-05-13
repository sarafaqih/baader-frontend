import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function Signup() {

    const [formData, setFormData] = useState({
        username:"",
        password:"",
        role:"parent",
        childs:[],
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

    function handleChildChange(index, value) {
      const updatedChilds = [...formData.childs]
      updatedChilds[index] = value
      setFormData({ ...formData, childs: updatedChilds })
    }
    
    function addChild() {
      setFormData({ ...formData, childs: [...formData.childs, ""] })
    }
    
    function removeChild(index) {
      const updatedChilds = formData.childs.filter((_, i) => i !== index)
      setFormData({ ...formData, childs: updatedChilds })
    }
    
  return (
    <div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
         type="text"
         name='username'
         id='username'
         value={formData.username}
         onChange={handleChange}
          />
       
       <br/>
<br/>

        <label htmlFor="password">Password:</label>
        <input
         type="password"
         name='password'
         id='password'
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

<label>Children:</label>
{formData.childs.map((child, index) => (
  <div key={index}>
    <input
      type="text"
      placeholder={`Child ${index + 1} name`}
      value={child}
      onChange={(e) => handleChildChange(index, e.target.value)}
      required
    />
    <button type="button" onClick={() => removeChild(index)}>Remove</button>
  </div>
))}
<button type="button" onClick={addChild}>Add Child</button>

<br/>
<br/>

          <button>Submit</button>
      </form>
    </div>
  )
}

export default Signup
