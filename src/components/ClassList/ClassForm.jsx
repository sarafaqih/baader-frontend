import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as teachService from '../../services/teachService'; 
import TeachForm from '../TeachList/TeachForm'


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
          teacher: teachData.volunteer.firstName || '',
          subject: teachData.subject || '',
          days: teachData.preferredDays || [],
          venue: teachData.venue || '',
          numberOfStudents: teachData.numberOfStudents || '',
          classMode: teachData.classMode || '',
          ageStart: ageMatch ? ageMatch[1] : '',
          ageEnd: ageMatch ? ageMatch[2] : '',
          startTime: timeMatch ? timeMatch[1] : '',
          startTimePeriod: timeMatch ? timeMatch[2].toLowerCase() : 'am',
          endTime: timeMatch ? timeMatch[3] : '',
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
      classMode: formData.classMode,
      venue: formData.venue,
      numberOfStudents: formData.numberOfStudents,
      ageOFStudents: formattedAge,
    };

    props.handleAddClass(teachId, finalData);
  };

  const [approvementStatus, setApprovementStatus] = useState('');


  return (
    <div>
        <h1>Class Form</h1>

        {<TeachForm handleUpdateTeach={props.handleUpdateTeach}/>}

      
      <form onSubmit={handleSubmit}>


        <label htmlFor='teacher'>Teacher: </label>
        <input
          required
          type='text'
          name='teacher'
          id='teacher'
          value={formData.teacher}
          onChange={handleChange}
        />



<br />
<br />



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

        <label htmlFor='classMode'>Class Mode: </label>
        <select
          required
          name='classMode'
          id='classMode'
          value={formData.classMode}
          onChange={handleChange}
        >
          <option value='online'>Online</option>
          <option value='in-person'>In person</option>
          <option value='hybrid'>Hybrid</option>
        </select>
<br />
<br />


{/* <label htmlFor='time'>time: </label>
        <input
          required
          type='text'
          name='time'
          id='time'
          value={formData.time}
          onChange={handleChange}
        />
<br />
<br /> */}


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

<label>Days:</label><br />
<div>
  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
    <label key={day}>
      <input
        type="checkbox"
        name="days"
        
        value={day}
        checked={formData.days.includes(day)}
        onChange={(e) => {
          const { checked, value } = e.target;
          setFormData((prevData) => ({
            ...prevData,
            days: checked
              ? [...prevData.days, value]
              : prevData.days.filter((d) => d !== value)
          }));
        }}
      />
      {day}
    </label>
  ))}
</div>

<br />
<br />


{approvementStatus === 'Rejected' ? (
  <div>
    <p style={{ color: 'red', fontWeight: 'bold' }}>
      This post has been rejected. Class creation is disabled.
    </p>
    <button type='submit' disabled>Create New Class</button>
  </div>
) : (
  <button type='submit'>Create New Class</button>
)}



      </form>
 
    </div>
  )
}

export default ClassForm





