import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';

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
    <div style={{ paddingTop: '70px' }}>
<h1>Admin - Sign Up </h1>
  <Form onSubmit={handleSubmit} style={{ paddingTop: '70px' }}>
    {/* Username */}
    <Form.Group as={Row} className="mb-3 align-items-center">
      <Form.Label column sm={2} className="text-end">Username</Form.Label>
      <Col sm={6}>
        <Form.Control
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
      </Col>
    </Form.Group>

    {/* Password */}
    <Form.Group as={Row} className="mb-3 align-items-center">
      <Form.Label column sm={2} className="text-end">Password</Form.Label>
      <Col sm={6}>
        <Form.Control
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Col>
    </Form.Group>

    {/* First Name */}
    <Form.Group as={Row} className="mb-3 align-items-center">
      <Form.Label column sm={4} className="text-end" /*style={{ marginLeft: '-45px' }}*/>First Name</Form.Label>
      <Col sm={6}>
        <Form.Control
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </Col>
    </Form.Group>

    {/* Last Name */}
    <Form.Group as={Row} className="mb-3 align-items-center">
      <Form.Label column sm={4} className="text-end" /*style={{ marginLeft: '-45px' }}*/>Last Name</Form.Label>
      <Col sm={6}>
        <Form.Control
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </Col>
    </Form.Group>

    {/* Gender */}
    <Form.Group as={Row} className="mb-3 align-items-center">
      <Form.Label column sm={2} className="text-end">Gender</Form.Label>
      <Col sm={6}>
        <Form.Select
          aria-label="gender"
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Choose your Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </Form.Select>
      </Col>
    </Form.Group>

    {/* Hidden Role */}
    <Form.Control
      type="hidden"
      name="role"
      id="role"
      value="admin"
      onChange={handleChange}
      required
    />

   

 
    {/* <Form.Group as={Row} className="mb-3 align-items-center" controlId="ContactNo">
          <Form.Label column lg={2} className="text-start" style={{ marginLeft: '-15px' }}>Contact Number</Form.Label>
          <Col sm={6}> */}
          <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            00973
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            type="number"
            name='ContactNo'
            id='ContactNo'
            required
            value={formData.ContactNo}
            onChange={handleChange}
          />
      </InputGroup>
          {/* </Col>
    </Form.Group> */}


    {/* Submit Button */}
    <Form.Group as={Row} className="mb-3">
      <Col sm={{ span: 6, offset: 2 }}>
        <Button variant="dark" type="submit">Singup</Button>
      </Col>
    </Form.Group>

  </Form> 
</div>
  )
}

export default Signup
