import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css'

const App = () => {
  return (
    <Router className="app">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">User Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/create">Create User</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
          <Route path="/details/:id" element={<UserDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
