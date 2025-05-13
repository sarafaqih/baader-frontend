import { useContext, useState, useEffect } from 'react';

import { useParams } from 'react-router';
import * as teachService from '/src/services/teachService.js';
import { useLocation } from 'react-router';





const TeachForm = (props) => {

    const [approvementStatus, setApprovementStatus] = useState('');


    const [formData, setFormData] = useState({
        subject: '',
        preferredDays: [],
        startTime: '',
        startTimePeriod: 'am',
        endTime: '',
        endTimePeriod: 'pm',
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

    const formattedTime = `${formData.startTime} ${formData.startTimePeriod} – ${formData.endTime} ${formData.endTimePeriod}`
    const formattedAge = `${formData.ageStart} - ${formData.ageEnd} years`;
// console.log("ppppppp", formData.startTime)
    const finalData = {
        ...formData,
        time: formattedTime,
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
      const timeMatch = teachData.time?.match(/(\d{1,2}:\d{2})\s*(am|pm)\s*–\s*(\d{1,2}:\d{2})\s*(am|pm)/i);

      setFormData({
        ...teachData,
        ageStart: ageMatch ? ageMatch[1] : '',
        ageEnd: ageMatch ? ageMatch[2] : '',
        startTime: timeMatch ? timeMatch[1] : '',
      startTimePeriod: timeMatch ? timeMatch[2].toLowerCase() : 'am',
      endTime: timeMatch ? timeMatch[3] : '',
      endTimePeriod: timeMatch ? timeMatch[4].toLowerCase() : 'pm',

      });
    };
   

    if (teachId) fetchTeach();

    return () => setFormData({  subject: '', preferredDays: [], startTime: '', startTimePeriod: 'am',endTime: '', endTimePeriod: 'pm', preferredMode: 'in-person', venue: '', numberOfStudents:'', ageStart: '', ageEnd: '', notes:'', });

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
    <main>


{location.pathname === `/teachs/${teachId}/class` ? (
      <>
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
    </>




    ) : (




        <>
        

        <h1>{teachId ? 'Edit Your Teach Post' : 'New Teach Post'}</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='subject'>Subject: </label>
        <input
          required
          type='text'
          name='subject'
          id='subject'
          value={formData.subject}
          onChange={handleChange}
        />



<br />
<br />

        <label htmlFor='preferredMode'>Preferred Teach Mode: </label>
        <select
          required
          name='preferredMode'
          id='preferredMode'
          value={formData.preferredMode}
          onChange={handleChange}
        >
          <option value='online'>Online</option>
          <option value='in-person'>In person</option>
          <option value='hybrid'>Hybrid</option>
        </select>
<br />
<br />

        <label htmlFor='venue'>Venue: </label>
        <input
          required
          type='text'
          name='venue'
          id='venue'
          value={formData.venue}
          onChange={handleChange}
        />
<br />
<br />

<label htmlFor='numberOfStudents'>Number Of Students: </label>
        <input
          required
          type='number'
          name='numberOfStudents'
          id='numberOfStudents'
          min={1}
          value={formData.numberOfStudents}
          onChange={handleChange}
        />

<br />
<br />


        <label>Age of Students: </label>
        <input
        required
        type="number"
        name="ageStart"
        placeholder="From"
        min={1}
        value={formData.ageStart}
        onChange={handleChange}
        />    
            – 
        <input
        required
        type="number"
        name="ageEnd"
        placeholder="To"
        min={1}
        value={formData.ageEnd}
        onChange={handleChange}
        /> years


<br />
<br />

<label htmlFor='notes'>Notes: </label>
        <textarea
          
          type='text'
          name='notes'
          id='notes'
          value={formData.notes}
          onChange={handleChange}
        />


<br />
<br />

        {/* <label htmlFor='time'>Time: </label>
        <input
          required
          type='text'
          name='time'
          id='time'
          value={formData.time}
          onChange={handleChange}
        /> */}

<label>Start Time: </label>
<input
  type="time"
  name="startTime"
  required
  value={formData.startTime}
  onChange={handleChange}
/>

<select
  name="startTimePeriod"
  value={formData.startTimePeriod || 'am'}
  onChange={(e) =>
    setFormData({ ...formData, startTimePeriod: e.target.value })
  }
>
  <option value="am">AM</option>
  <option value="pm">PM</option>
</select>

<br /><br />

<label>End Time: </label>
<input
  type="time"
  name="endTime"
  required
  value={formData.endTime}
  onChange={handleChange}
/>

<select
  name="endTimePeriod"
  value={formData.endTimePeriod || 'pm'}
  onChange={(e) =>
    setFormData({ ...formData, endTimePeriod: e.target.value })
  }
>
  <option value="am">AM</option>
  <option value="pm">PM</option>
</select>





<br />
<br />

<label>Preferred Days:</label><br />
<div>
  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
    <label key={day}>
      <input
        type="checkbox"
        name="preferredDays"
        
        value={day}
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
</div>


        <button type='submit'>SUBMIT</button>
      </form>
      </>
    )}
    </main>
  );
};

export default TeachForm;
