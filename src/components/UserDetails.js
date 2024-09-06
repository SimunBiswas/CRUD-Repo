import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        const foundUser = response.data.find((u) => u.id === parseInt(id));
        setUser(foundUser);
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [id]);

  if (!user) return <p>Loading user details...</p>;

  return (
    <Container className="my-4 top-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <Card.Title>User Details</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {user.name}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user.email}
              </Card.Text>
              <Card.Text>
                <strong>Phone:</strong> {user.phone}
              </Card.Text>
              <Card.Text>
                <strong>Address:</strong> {user.address.street},  {user.address.suite} {user.address.city}, {user.address.zipcode}
              </Card.Text>
              <Card.Text>
                <strong>Website:</strong> {user.website}
              </Card.Text>
              <Card.Text>
                <strong>Company:</strong> {user.company.name}, <br />
                {user.company.catchPhrase}, <br />
                {user.company.bs}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
