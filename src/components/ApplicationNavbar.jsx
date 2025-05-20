import { Link , useNavigate} from "react-router"
// import { useNavigate} from "react-router"
// import { Link } from "react-router-dom"
import { useContext } from "react"
import { authContext } from "../context/AuthContext"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form  from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const ApplicationNavbar = () => {
  const {user, logout} = useContext(authContext)
  const navigate = useNavigate()

  function handleAdminSignupClick(e) {
    e.preventDefault()
    const password = window.prompt("Enter Admin Access Password:")
    if (password === "admin123") {
      navigate("/signupAd")
    } else {
      alert("Incorrect password. Access denied.")
    }
  }


  return (
<Navbar expand="lg" className="bg-body-tertiary w-100" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">بادر</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          {!user && ( 
          <>
          <Nav.Link href="/login">Login</Nav.Link>
          <NavDropdown title="Signup" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#" onClick={handleAdminSignupClick}>Signup as Admin</NavDropdown.Item>
            <NavDropdown.Item href="/signupPa">Signup as Parent</NavDropdown.Item>
            <NavDropdown.Item href="/signupVu">Signup as Volunteer</NavDropdown.Item>
          </NavDropdown>
          </>
          )}
          </Nav>
            {user && (
            <>
            <div className="ms-auto d-flex align-items-center">
              <Navbar.Text className="ms-3">Welcome {user.firstName} {user.lastName}</Navbar.Text>
               {(user.role === "admin" || user.role === "volunteer") && ( <Nav.Link href="/teachs" className="ms-3">Volunteer Requests</Nav.Link> )}
               {user.role === "volunteer" && (<Nav.Link href='/teach/new' className="ms-3">Volunteer To Teach</Nav.Link>)}
               {(user.role === "parent" || user.role === "volunteer")&& (<Nav.Link href='/teach/classes' className="ms-3">Reservations</Nav.Link>)}
              <Button variant="dark" className="ms-3" onClick={logout}>Logout</Button>
            </div>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )}

export default ApplicationNavbar
