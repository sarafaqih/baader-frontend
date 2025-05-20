const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/teach`;


const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (teachId) => {
    try {
      const res = await fetch(`${BASE_URL}/${teachId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
  
  const create = async (teachFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teachFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


  const deleteTeach = async (teachId) => {
    try {
      const res = await fetch(`${BASE_URL}/${teachId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };



  async function update(teachId, teachFormData) {
    try {
      const res = await fetch(`${BASE_URL}/${teachId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teachFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }



  const createClass = async (teachId, classFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${teachId}/class`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllClasses = async () => {
    try {
      const res = await fetch(`${BASE_URL}/classes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

    async function updateClass(classId, classFormData) {
    try {
      const res = await fetch(`${BASE_URL}/classes/${classId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  const getAllChildren = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${userId}/children`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


    const createReservations = async (user, teachId, reservationData) => {
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

 


 


  export { 
    index,
    show,
    create,
    deleteTeach,
    update,
    createClass,
    getAllClasses,
    updateClass,
    createReservations,
    getAllChildren
  };