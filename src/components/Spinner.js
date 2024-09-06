import React from 'react';
import { Spinner as BootstrapSpinner, Container } from 'react-bootstrap';

const Spinner = () => {
  return (
    <Container className="d-flex justify-content-center my-4">
      <BootstrapSpinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
    </Container>
  );
};

export default Spinner;
