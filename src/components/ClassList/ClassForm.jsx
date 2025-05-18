import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as teachService from '../../services/teachService'; 
import TeachForm from '../TeachList/TeachForm'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';


function ClassForm(props) {
  const { teachId } = useParams();
  console.log(useParams)

  const [formData, setFormData] = useState({
    teacher: '',
    subject: '',
    days: [],
    startTime: '',
    startTimePeriod: 'am',
    endTime: '',
    endTimePeriod: 'pm',
    classMode: '',
    venue: '',
    numberOfStudents: '',
    ageStart: '',
    ageEnd: '',
    ageOFStudents: ''
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };


  useEffect(() => {
    const fetchTeach = async () => {
      try {
        const teachData = await teachService.show(teachId);
        setApprovementStatus(teachData.approvement)

        const ageMatch = teachData.ageOFStudents?.match(/(\d+)\s*-\s*(\d+)/);
        const timeMatch = teachData.time?.match(/(\d{1,2}:\d{2})\s*(am|pm)\s*–\s*(\d{1,2}:\d{2})\s*(am|pm)/i);

        setFormData((prev) => ({
          ...prev,
          teacher: teachData.volunteer.firstName + ' ' + teachData.volunteer.lastName|| '',
          subject: teachData.subject || '',
          days: teachData.preferredDays || [],
          venue: teachData.venue || '',
          numberOfStudents: teachData.numberOfStudents || '',
          classMode: teachData.preferredMode || '',
          ageStart: ageMatch ? ageMatch[1] : '',
          ageEnd: ageMatch ? ageMatch[2] : '',
          startTime: teachData.startTime,
          startTimePeriod: timeMatch ? timeMatch[2].toLowerCase() : 'am',
          endTime: teachData.endTime,
          endTimePeriod: timeMatch ? timeMatch[4].toLowerCase() : 'pm',
        }));
      } catch (err) {
        console.error('Failed to fetch teach data', err);
      }
    };

    if (teachId) fetchTeach();
  }, [teachId]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formattedTime = `${formData.startTime} ${formData.startTimePeriod} – ${formData.endTime} ${formData.endTimePeriod}`;
    const formattedAge = `${formData.ageStart} - ${formData.ageEnd} years`;

    const finalData = {
      teacher: formData.teacher,
      subject: formData.subject,
      days: formData.days,
      time: formattedTime,
      startTime: formData.startTime,
      endTime: formData.endTime,
      classMode: formData.preferredMode,
      venue: formData.venue,
      numberOfStudents: formData.numberOfStudents,
      ageOFStudents: formattedAge,
    };

    props.handleAddClass(teachId, finalData);
  };

  const [approvementStatus, setApprovementStatus] = useState('');

    const handleApprovement = async (status) => {
      try {
        await teachService.update(teachId, { approvement: status });
        setApprovementStatus(status);
      } catch (err) {
        console.error('Error updating approvement:', err);
      }
    }
  


  return (
    <div style={{ paddingTop: '70px' }}>
        <h1>Volunteer Request</h1>

        {/* {<TeachForm handleUpdateTeach={props.handleUpdateTeach}/>} */}

      {approvementStatus === 'Rejected' ? (
      <div>
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          This post has been rejected.
        </p>
        <Button variant='dark' type='submit' disabled>Create New Class</Button>
      </div>
    ) : (
       <div></div>
    )}

    {approvementStatus === 'Approved' && (
      <div>
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          This post has been approved.
        </p>
        <Button variant='dark' type='submit'>Create New Class</Button>

      </div>
      )}


    {location.pathname === `/teachs/${teachId}/class` && (
      <>

{approvementStatus === 'Rejected' || approvementStatus === 'Approved'  ? (
  <div></div>
) : (
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => handleApprovement('Approved')}
          style={{
            backgroundColor: approvementStatus === 'Approved' ? 'green' : '#ccc',
            color: '#fff',
            padding: '10px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Approve
        </button>
  
        <button
          type="button"
          onClick={() => handleApprovement('Rejected')}
          style={{
            backgroundColor: approvementStatus === 'Rejected' ? 'red' : '#ccc',
            color: '#fff',
            padding: '10px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Reject
        </button>
      </div>
)}
</>
)}



      <Form onSubmit={handleSubmit}>

        {/*Teacher */}

          <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={2} className="text-start" /*style={{ marginLeft: '-45px' }}*/>Teacher</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="text"
              name="teacher"
              id="teacher"
              value={formData.teacher}
              onChange={handleChange}
              required
              disabled
            />
          </Col>
        </Form.Group>

        {/*Subject */}

          <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={2} className="text-start" /*style={{ marginLeft: '-45px' }}*/>Subject</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled
            />
          </Col>
        </Form.Group>

            {/* ClassMode */}
            <Form.Group as={Row} className="mb-3 align-items-center">
              <Form.Label column lg={4} className="text-start">Class Mode</Form.Label>
              <Col sm={6}>
                <Form.Select
                  aria-label="classMode"
                  name="classMode"
                  id="classMode"
                  value={formData.classMode}
                  onChange={handleChange}
                  required
                  disabled
                >
                  <option value='online'>Online</option>
                  <option value='in-person'>In person</option>
                  <option value='hybrid'>Hybrid</option>
                </Form.Select>
              </Col>
            </Form.Group>

                {/*Teaching Time Period */}
                <InputGroup className="mb-3">
                 <InputGroup.Text>Teaching Time Period</InputGroup.Text>
                    <Form.Control
                      type="time"
                      name="startTime"
                      id="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                      disabled
                    />
                   <Form.Control
                      type="time"
                      name="endTime"
                      id="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      required
                      disabled
                    />
                </InputGroup>

      <Form.Group as={Row} className="mb-3 align-items-center">
      <Form.Label column sm={2} className="text-start" /*style={{ marginLeft: '-45px' }}*/>Venue</Form.Label>
      <Col sm={6}>
        <Form.Control
          type="text"
          name="venue"
          id="venue"
          value={formData.venue}
          onChange={handleChange}
          required
          disabled
        />
      </Col>
    </Form.Group>

            {/* Number of Students */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column lg={4} className="text-start" /*style={{ marginLeft: '-45px' }}*/>Number Of Students</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="number"
              name="numberOfStudents"
              id="numberOfStudents"
              value={formData.numberOfStudents}
              min={1}
              onChange={handleChange}
              required
              disabled
            />
          </Col>
        </Form.Group>

              {/*age range */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Students Age Range</InputGroup.Text>
              <Form.Control aria-label="from" 
                required
                type="number"
                name="ageStart"
                placeholder="From"
                min={1}
                value={formData.ageStart}
                onChange={handleChange} 
                disabled
                />
              <Form.Control aria-label="to" 
                required
                type="number"
                name="ageEnd"
                placeholder="To"
                min={1}
                value={formData.ageEnd}
                onChange={handleChange} 
                disabled
                />
            </InputGroup>

    <Form.Group as={Row} className="mb-3 align-items-center" controlId="preferredDays">
    <Form.Label column sm={2} className="text-start">Preferred Days</Form.Label>
    {/* <Col sm={6}><Form.Control as="textarea" rows={3} name='notes' id='notes' value={formData.notes} onChange={handleChange} required/></Col> */}
    <div></div>
    <>
    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
    <label key={day} style={{display: "contents"}}>
      <Form.Check
        inline
        value={day}
        name="days"
        type="checkbox"
        checked={formData.days.includes(day)}
        onChange={(e) => {
          const { checked, value } = e.target;
          setFormData((prevData) => ({
            ...prevData,
            preferredDays: checked
              ? [...prevData.days, value]
              : prevData.days.filter((d) => d !== value)
          }));
        }}
      />
      {day}
    </label>
      ))}
      </>
  </Form.Group>

 </Form>
      

 
    </div>
  )
}

export default ClassForm





