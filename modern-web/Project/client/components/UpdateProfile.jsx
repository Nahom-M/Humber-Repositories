import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate password and phone number
  const validateForm = () => {
    const errors = {};

    // Validate password only if it has a value
    if (formData.password && !/^(?=.*\d).{8,}$/.test(formData.password)) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one number.";
    }

    // Validate phone number only if it has a value
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be exactly 10 integers.";
    }

    // If errors are found, return the errors
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setSuccess(true);
      setTimeout(() => navigate("/profile"), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleToProfile = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  return (
    <Container className="mt-5 mb-4 login-wrapper">
      <h1>Update Profile</h1>
      {error && (
        <Alert variant="danger">{Object.values(error).join(" ")}</Alert>
      )}
      {success && (
        <Alert variant="success">Profile updated successfully!</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter new name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter new email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        {error?.password && <Alert variant="danger">{error.password}</Alert>}
        <Form.Group controlId="formPhone" className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter new phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>
        {error?.phone && <Alert variant="danger">{error.phone}</Alert>}
        <Form.Group controlId="formAddress" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter new address"
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Group>
        <div>
          <Button variant="success" type="submit" className="me-2">
            Update
          </Button>
          <Button variant="primary" type="submit" onClick={handleToProfile}>
            To Profile
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdateProfile;
