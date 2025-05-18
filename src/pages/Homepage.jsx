import {useContext,useEffect} from 'react'
import { authContext } from '../context/AuthContext'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';

function Homepage({teachs, user, handelReservations}) {
  // useContext(): allows me to consume the context


  // sending request to protected route that needs a token
  async function callProtectedRoute(){
    const token = localStorage.getItem("token")
    const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test-jwt/checkout`,{headers:{Authorization:`Bearer ${token}`}})
    console.log(response.data)
  }

  callProtectedRoute()
  return (
    <>
    
  <Container style={{ paddingTop: '70px' }}>
    <Row className='g-4'>
      {teachs.filter((teach) => teach.approvement === 'Approved').map((teach) => ( 
     <Col key={teach._id} xs={12} sm={6} md={4}>
     <Card style={{ width: '18rem' }} >
      <Card.Body>
        <Card.Title>{teach.subject}</Card.Title>
        <Card.Title>By {teach.volunteer.firstName} {teach.volunteer.lastName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{teach.venue}</Card.Subtitle>
        <Card.Text>{teach.notes}</Card.Text>
        {user.role === 'parent' && 
        <Card.Link href="#">Reserve</Card.Link>
        }
      </Card.Body>
    </Card>
    </Col>
        ))}
        </Row>
    </Container>
    </>
  )
}

export default Homepage
