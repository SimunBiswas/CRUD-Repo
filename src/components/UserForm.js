import React, { useState, useEffect } from 'react';
import { createUser, updateUser, fetchUsers } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

const UserForm = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchUsers()
        .then(response => {
          const existingUser = response.data.find(u => u.id === parseInt(id));
          if (existingUser) setUser(existingUser);
        })
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateUser(id, user)
        .then(() => navigate('/'))
        .catch(error => console.error('Error updating user:', error));
    } else {
      createUser(user)
        .then(() => navigate('/'))
        .catch(error => console.error('Error creating user:', error));
    }
  };

  return (
    <div className="py-4 container">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2>{isEditing ? 'Edit User' : 'Create User'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserForm;
