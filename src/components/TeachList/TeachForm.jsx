import { useContext, useState, useEffect } from 'react';

import { useParams } from 'react-router';
import * as teachService from '/src/services/teachService.js';
import { useLocation } from 'react-router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';





const TeachForm = (props) => {

    const [approvementStatus, setApprovementStatus] = useState('');


    const [formData, setFormData] = useState({
        subject: '',
        preferredDays: [],
        startTime: '',
        startTimePeriod: '',
        endTime: '',
        endTimePeriod: '',
        preferredMode: 'in-person',
        venue: '',
        numberOfStudents:'',
        // ageOFStudents:'',
        ageStart: '',
        ageEnd: '',
        notes:'',
      });
      


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //const formattedTime = `${formData.startTime} ${formData.startTimePeriod} – ${formData.endTime} ${formData.endTimePeriod}`
    const formattedAge = `${formData.ageStart} - ${formData.ageEnd} years`;
// console.log("ppppppp", formData.startTime)
    const finalData = {
        ...formData,
        time: `${formData.startTime} – ${formData.endTime}`,
        ageOFStudents: formattedAge,
      }


    if (teachId) {
        props.handleUpdateTeach(teachId, finalData);
      } else {
        props.handleAddTeach(finalData);
      }
  }


// For Editing (retrive data & edit)  ------------

const { teachId } = useParams();

  useEffect(() => {
    const fetchTeach = async () => {
      const teachData = await teachService.show(teachId);
      setFormData(teachData);
      const ageMatch = teachData.ageOFStudents?.match(/(\d+)\s*-\s*(\d+)/);
      //const timeMatch = teachData.time?.match(/(\d{1,2}:\d{2})\s*(am|pm)\s*–\s*(\d{1,2}:\d{2})\s*(am|pm)/i);

      setFormData({
        ...teachData,
        ageStart: ageMatch ? ageMatch[1] : '',
        ageEnd: ageMatch ? ageMatch[2] : '',
        //startTime: timeMatch ? timeMatch[1] : '',
      // startTimePeriod: timeMatch ? timeMatch[2].toLowerCase() : 'am',
      //endTime: timeMatch ? timeMatch[3] : '',
      // endTimePeriod: timeMatch ? timeMatch[4].toLowerCase() : 'pm',

      });
    };
   

    if (teachId) fetchTeach();

    return () => setFormData({  subject: '', preferredDays: [], startTime: '', /*startTimePeriod: '',*/endTime: '', /*endTimePeriod: '',*/ preferredMode: 'in-person', venue: '', numberOfStudents:'', ageStart: '', ageEnd: '', notes:'', });

  }, [teachId]);
  


// To approve or reject in ClassForm

  const location = useLocation()


  const handleApprovement = async (status) => {
    try {
      await teachService.update(teachId, { approvement: status });
      setApprovementStatus(status);
    } catch (err) {
      console.error('Error updating approvement:', err);
    }
  }

  return (
    <main style={{ paddingTop: '70px' }}>


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



  <>
  
  <h1>{teachId ? 'Edit Your Teach Post' : 'New Teach Post'}</h1>


  <Form onSubmit={handleSubmit} style={{ paddingTop: '70px' }}>
  
  {/*Subject*/}

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
        />
      </Col>
    </Form.Group>

        {/* Gender */}
    <Form.Group as={Row} className="mb-3 align-items-center">
      <Form.Label column lg={4} className="text-start">Preferred Teach Mode</Form.Label>
      <Col sm={6}>
        <Form.Select
          aria-label="preferredMode"
          name="preferredMode"
          id="preferredMode"
          value={formData.preferredMode}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Prefered Teach Mode</option>
          <option value='online'>Online</option>
          <option value='in-person'>In person</option>
          <option value='hybrid'>Hybrid</option>
        </Form.Select>
      </Col>
    </Form.Group>

    {/* Venue */}
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
        onChange={handleChange} />
      <Form.Control aria-label="to" 
        required
        type="number"
        name="ageEnd"
        placeholder="To"
        min={1}
        value={formData.ageEnd}
        onChange={handleChange} />
    </InputGroup>
  
    <Form.Group as={Row} className="mb-3 align-items-center" controlId="notes">
      <Form.Label column sm={2} className="text-start">Notes</Form.Label>
      <Col sm={6}><Form.Control as="textarea" rows={3} name='notes' id='notes' value={formData.notes} onChange={handleChange} required/></Col>
    </Form.Group>


  {/* <label htmlFor='time'>Time: </label>
  <input
    required
    type='text'
    name='time'
    id='time'
    value={formData.time}
    onChange={handleChange}
  /> */}

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
        />
       <Form.Control
          type="time"
          name="endTime"
          id="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
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
        name="preferredDays"
        type="checkbox"
        checked={formData.preferredDays.includes(day)}
        onChange={(e) => {
          const { checked, value } = e.target;
          setFormData((prevData) => ({
            ...prevData,
            preferredDays: checked
              ? [...prevData.preferredDays, value]
              : prevData.preferredDays.filter((d) => d !== value)
          }));
        }}
      />
      {day}
    </label>
      ))}
      </>
  </Form.Group>


  <Button variant='dark' type='submit'>Submit</Button>
</Form>
</>
</main>
)
};

export default TeachForm;
