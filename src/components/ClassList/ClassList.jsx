import React from 'react'
import Table from 'react-bootstrap/Table';

function ClassList({classes, user}) {
    let count = 1
    return (
<div style={{ paddingTop: '70px' }}>
  <h1>Reservations</h1>

 <Table striped bordered hover>
  <thead>
    <tr>
      <th>No</th>
      {/* <th>Teacher</th> */}
      <th>Subject</th>
      <th>Days</th>
      <th>Time</th>
      <th>Mode</th>
      <th>Venue</th>
      <th>Students</th>
      {/* <th>Notes</th> */}
      </tr>
  </thead>

  <tbody>
    {classes
    .filter(teach => (user.username === teach.teachingApplication.volunteer.username) || user.role==='parent' )
    .filter(teach => teach.studentsName)
    .map((teach) => (
    <tr key={teach._id}>
      <td>{count++}</td>
      {/* <td>{teach.teachingApplication.volunteer.firstName + ' ' + teach.teachingApplication.volunteer.lastName}</td> */}
      <td>{teach.subject}</td>
      <td>{teach.days.map((day)=> <p>{day}</p> )}</td>
      <td>{teach.time} </td>
      <td>{teach.classMode}</td>
      <td>{teach.venue}</td>
      <td>{teach.studentsName}</td>
      {/* <td>{teach.teachingApplication.notes}</td> */}

    </tr>
    ))}
  </tbody>

 </Table>

</div>
 )
}

export default ClassList
