import { Link , useNavigate} from "react-router"
// import { useNavigate} from "react-router"
// import { Link } from "react-router-dom"
import { useContext } from "react"
import { authContext } from "../context/AuthContext"


function Navbar() {
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
    <div>
      <ul>
        <Link to="/"><li>Homepage</li></Link>
        
        
        {user && (

          <>
          <li>Welcome {user.username}</li>


          { (user.role === "admin" || user.role === "volunteer") && (
          <li><Link to='/teachs'>Teach Posts</Link></li>
        )}



      {  user.role === "volunteer" && (
        <li><Link to='/teach/new'>Volunteer To Teach</Link></li>
      )}


          <button onClick={logout}>Logout</button>
          </>
        )}


    
        
        
        
        {!user && (
          <>
          <Link to='/login'><li>Login</li></Link>
          {/* <Link to='/signupAd'><li>Signup as Admin</li></Link>
          <Link to='/signupPa'><li>Signup as Parent</li></Link>
          <Link to='/signupVu'><li>Signup as Volunteer</li></Link> */}
          <details>
              <summary>Signup</summary>
              <ul>
                {/* <li><Link to='/signupAd'>Signup as Admin</Link></li> */}
                <li><a href="#" onClick={handleAdminSignupClick}>Admin</a></li>
                <li><Link to='/signupPa'>Parent</Link></li>
                <li><Link to='/signupVu'>Volunteer</Link></li>
              </ul>
            </details>

          </>
        )}
        

      </ul>
    </div>
  )
}

export default Navbar
