import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';




function TeachList({teachs, user, handleDeleteTeach}) {

    let count = 1
    return (
    <div>
        {user.role === "admin" ? (
  <h1>Teach Posts List</h1>
) : user.role === "volunteer" ? (
  <h1>Your Teach Posts List</h1>
) : null}


        <table border={2}>
            <tr>
            <th>No</th> <th>Subject</th> <th>Days</th> <th>Time</th> <th>Teaching Mode</th> <th>Venue</th> <th>Students Number</th> <th>Students Age</th> <th>Notes</th> {user.role === "admin" ? <th>Volunteer</th> : null } <th>Approvement</th> {user.role === "volunteer" ? <th>Action</th> : null }
            </tr>

            {teachs.map((teach) => (
         <tr key={teach._id}>
         <td>{count++}</td>
        <td>{teach.subject}</td>

        {/* <Link key={teach._id} to={`/teach/${teach._id}`} style={{ textDecoration: 'none', color: 'inherit' , border: "none"}}> <td>{teach.subject}</td> </Link> */}

         {/* <td>{teach.preferredDays}</td> */}
         <td>{teach.preferredDays.map((day)=> <ul>{day}</ul> )}</td>
         <td>{teach.time} </td>
         <td>{teach.preferredMode}</td>
         <td>{teach.venue}</td>
         <td>{teach.numberOfStudents}</td>
         <td>{teach.ageOFStudents}</td>
         <td>{teach.notes ? teach.notes : '-'}</td>
         {user.role === "admin" ? <td>{teach.volunteer.username}</td> : null }
         
         <td>{teach.approvement === "Approved"
    ? <img src="./src/assets/green.png" alt="apprevedIcon" height={35}/>
    : teach.approvement === "Rejected"
    ? <img src="./src/assets/red.png" alt="rejectedIcon" height={35}/>
    :  <Link to={`/teachs/${teach._id}/class`}><img src="./src/assets/yellow.png" alt="notYEtIcon" height={35}/></Link>}</td>


{user.role === "volunteer" ? <td width={200}> 
      <Link to={`/teachs/${teach._id}/edit`}><button> <img src="./src/assets/edit.png" alt="editIcon" height={30}/> </button></Link>
       {/* <button> <img src="./src/assets/edit.png" alt="editIcon" height={30}/> </button> */}
       <button onClick={() => handleDeleteTeach(teach._id)}> <img src="./src/assets/delete.png" alt="deleteIcon" height={30}/></button>
    </td> : null }
    
    
         
       </tr>
      ))}
        </table>
    </div>
  )
// }else{

//         let count = 1
//         return (
//         <div>
//           <h1>Teach List</h1>
    
//             <table border={2}>
//                 <tr>
//                 <th>No</th> <th>Subject</th> <th>Days</th> <th>Time</th> <th>Teaching Mode</th> <th>Venue</th> <th>Students Number</th> <th>Students Age</th> <th>Notes</th> <th>Approvement</th>
//                 </tr>
    
//                 {teachs.map((teach) => (
//              <tr key={teach._id}>
//              <td>{count++}</td>
//             <td>{teach.subject}</td>
    
//             {/* <Link key={teach._id} to={`/teach/${teach._id}`} style={{ textDecoration: 'none', color: 'inherit' , border: "none"}}> <td>{teach.subject}</td> </Link> */}
    
//              {/* <td>{teach.preferredDays}</td> */}
//              <td>{teach.preferredDays.map((day)=> <ul>{day}</ul> )}</td>
//              <td>{teach.time} </td>
//              <td>{teach.preferredMode}</td>
//              <td>{teach.venue}</td>
//              <td>{teach.numberOfStudents}</td>
//              <td>{teach.ageOFStudents}</td>
//              <td>{teach.notes}</td>
//              <td>{teach.approvement === "Approved"
//         ? <img src="./src/assets/green.png" alt="apprevedIcon" height={35}/>
//         : teach.approvement === "Rejected"
//         ? <img src="./src/assets/red.png" alt="rejectedIcon" height={35}/>
//         :  <img src="./src/assets/yellow.png" alt="notYEtIcon" height={35}/>}</td>
             
//            </tr>
//           ))}
//             </table>
//         </div>
//       )

// }
}

export default TeachList
