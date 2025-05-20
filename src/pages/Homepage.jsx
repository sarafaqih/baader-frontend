import {useContext,useEffect, useState} from 'react'
import { authContext } from '../context/AuthContext'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Homepage({classes, user, handleUpdateClass}) {
  // useContext(): allows me to consume the context

  const [showModal, setShowModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedChild, setSelectedChild] = useState('');
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchChildren = async () => {
      if (user?.role === 'parent') {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/teach/users/${user._id}/children`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setChildren(response.data); // Adjust based on your backend response
          console.log(setChildren)
        } catch (err) {
          console.error("Failed to fetch children", err);
        }
      }
    };
    fetchChildren();
  }, [user]);

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
      {classes.map((teach) => ( 
     <Col key={teach._id} xs={12} sm={6} md={4}>
     <Card style={{ width: '18rem' }} >
      <Card.Body>
        <Card.Title>{teach.subject}</Card.Title>
        <Card.Title>By {teach.teachingApplication.volunteer.firstName} {teach.teachingApplication.volunteer.lastName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">At {teach.venue}</Card.Subtitle>
        <Card.Text>For children between {teach.ageOFStudents}</Card.Text>
        {user.role === 'parent' && 
        <Card.Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedClassId(teach._id);
            setShowModal(true);
          }}
            style={{
            color: 'black',
          }}

        >
          Reserve
        </Card.Link>
        }
      </Card.Body>
    </Card>
    </Col>
        ))}
        </Row>
    </Container>

<Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Select a Child</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group>
        <Form.Label>Choose Child</Form.Label>
        <Form.Select
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
        >
          <option value="">Select</option>
          {children.map((child, id) => (
            <option key={id} value={child}>
              {child}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Cancel
    </Button>
    <Button
      variant="dark"
      onClick={() => {
        handleUpdateClass(selectedClassId, { studentsName: selectedChild });
        setShowModal(false);
      }}
      disabled={!selectedChild}
    >
      Confirm Reservation
    </Button>
  </Modal.Footer>
</Modal>


    </>
  )
}

export default Homepage
