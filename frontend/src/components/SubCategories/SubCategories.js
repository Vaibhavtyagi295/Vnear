import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import './SubcategoriesPage.css';

const apiInstance = axios.create({
  baseURL: 'http://api.vnear.in/api', // Set the base URL for your API
});



const SubcategoriesPage = ({ match }) => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const categoryId = match.params.categoryId;

    apiInstance
      .get(`/category/${categoryId}/subcategories`)
      .then((response) => {
        setSubcategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error);
      });
  }, [match.params.categoryId]);

  return (
    <div className="page-container">
      <h2>Subcategories:</h2>
      {subcategories.length > 0 ? (
        <div className="row">
          {subcategories.map((subcategory) => (
            <div key={subcategory._id} className="col-md-4">
              <Link to={`/subcategory/${subcategory._id}/workers`} className="card-link">
                <Card className="subcategory-card">
                  <Card.Img src={`/images/${subcategory.image}`} alt={subcategory.name} />
                  <Card.Body>
                    <Card.Title>{subcategory.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No subcategories found.</p>
      )}
    </div>
  );
};

export default SubcategoriesPage;
