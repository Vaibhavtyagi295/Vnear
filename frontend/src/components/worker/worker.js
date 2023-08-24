// import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import Select from 'react-select';
// import axios from 'axios';

// const WorkerRegisterPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');
//   const [workDescription, setWorkDescription] = useState('');
//   const [location, setLocation] = useState('');

//   useEffect(() => {
//     retrieveLocation();
//   }, []);

//   const retrieveLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           getLocationDetails(latitude, longitude);
//         },
//         (error) => {
//           console.log('Error retrieving location:', error);
//         }
//       );
//     } else {
//       console.log('Geolocation is not supported by this browser.');
//     }
//   };

//   const getLocationDetails = (latitude, longitude) => {
//     axios
//       .get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=95d4f8fddee14264b9a6801961b4d61a`)
//       .then((response) => {
//         const { city, state } = response.data.results[0].components;
//         const formattedLocation = `${city}, ${state}`;
//         setLocation(formattedLocation);
//       })
//       .catch((error) => {
//         console.error('Error retrieving location details:', error);
//       });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = {
//       username,
//       password,
//       name,
//       number,
//       workDescription,
//       location,
//     };

//     axios
//       .post('/workerregister', formData)
//       .then((response) => {
//         console.log(response.data); // Handle the response data
//       })
//       .catch((error) => {
//         console.error('Failed to register worker:', error);
//       });
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="username">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="password">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="name">
//         <Form.Label>Name</Form.Label>
//         <Form.Control
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="number">
//         <Form.Label>Number</Form.Label>
//         <Form.Control
//           type="text"
//           value={number}
//           onChange={(e) => setNumber(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="workDescription">
//         <Form.Label>Work Description</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={3}
//           value={workDescription}
//           onChange={(e) => setWorkDescription(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="location">
//         <Form.Label>Location</Form.Label>
//         <Form.Control
//           type="text"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Register
//       </Button>
//     </Form>
//   );
// };

// export default WorkerRegisterPage;

   import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const WorkerRegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchCategoryOptions();
    retrieveLocation();
  }, []);

  const apiInstance = axios.create({
    baseURL: 'http://api.vnear.in/api', // Set the base URL for your API
  });
  
  const fetchCategoryOptions = () => {
    apiInstance
      .get('/category')
      .then((response) => {
        const options = response.data.map((category) => ({
          value: category.id,
          label: category.name,
        }));
        setCategoryOptions(options);
      })
      .catch((error) => {
        console.error('Failed to fetch category options:', error);
      });
  };

  const fetchSubcategories = (categoryId) => {
    apiInstance
      .get(`/category/${categoryId}/subcategories`)
      .then((response) => {
        setSubcategories(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch subcategories:', error);
      });
  };

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
    setSelectedSubcategory(''); // Reset selected subcategory when category changes
    if (selectedOption) {
      fetchSubcategories(selectedOption.value);
    } else {
      setSubcategories([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username,
      password,
      name,
      number,
      workDescription,
      location,
      category: category ? category.value : null,
      subcategory: selectedSubcategory,
    };

    apiInstance
      .post('/workerregister', formData)
      .then((response) => {
        console.log(response.data); // Handle the response data
      })
      .catch((error) => {
        console.error('Failed to register worker:', error);
      });
  };

  const retrieveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getLocationDetails(latitude, longitude);
        },
        (error) => {
          console.log('Error retrieving location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const getLocationDetails = (latitude, longitude) => {
    apiInstance
      .get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=95d4f8fddee14264b9a6801961b4d61a`)
      .then((response) => {
        const { city, state } = response.data.results[0].components;
        const formattedLocation = `${city}, ${state}`;
        setLocation(formattedLocation);
      })
      .catch((error) => {
        console.error('Error retrieving location details:', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="number">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="workDescription">
        <Form.Label>Work Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter work description"
          value={workDescription}
          onChange={(e) => setWorkDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Select
          value={category}
          onChange={handleCategoryChange}
          options={categoryOptions}
          placeholder="Select a category"
        />
      </Form.Group>

      <Form.Group controlId="subcategory">
        <Form.Label>Subcategory</Form.Label>
        <Select
          value={selectedSubcategory}
          onChange={(selectedOption) =>
            setSelectedSubcategory(selectedOption.value)
          }
          options={subcategories.map((subcategory) => ({
            value: subcategory._id,
            label: subcategory.name,
          }))}
          placeholder="Select a subcategory"
          isDisabled={!category}
        />
      </Form.Group>

      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default WorkerRegisterPage;
