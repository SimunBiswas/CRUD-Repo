import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../api';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { Table, Button } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  if (loading) return <Spinner />;

  return (
    <div className="container my-4">
      <h2 className="mb-4">User List</h2>
      <Link to="/create" className="btn btn-primary mb-3">Create New User</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><strong className='username'><Link to={`/details/${user.id}`}>{user.name}</Link></strong></td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
