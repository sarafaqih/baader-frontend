import {useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { authContext } from '../context/AuthContext'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';

function Login() {
      const [formData, setFormData] = useState({
          username:"",
          password:""
      })

      const {validateToken} = useContext(authContext)
      const navigate = useNavigate()

      function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
      e.preventDefault()
      try{
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,formData)
          console.log(response.data)
          localStorage.setItem("token",response.data.token)
          validateToken()
          navigate("/")
      }
      catch(err){
          console.log(err)
      }
  }


  return (
    <div style={{ paddingTop: '70px' }}>
      <h1>Login</h1>

<Form onSubmit={handleSubmit}>
  <Form.Group as={Row} className="mb-3">
    <Form.Label htmlFor="username" column sm="2">Username</Form.Label>
    <Col sm="10">
      <Form.Control
        type="text"
        name="username"
        id="username"
        value={formData.username}
        onChange={handleChange}
      />
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3">
    <Form.Label htmlFor="password" column sm="2">Password</Form.Label>
    <Col sm="10">
      <Form.Control
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3">
    <Col sm={{ span: 10, offset: 2 }}>
      <Button variant="dark" type="submit" className="w-100">Login</Button>
    </Col>
  </Form.Group>
</Form>

  </div>
  )
}

export default Login
