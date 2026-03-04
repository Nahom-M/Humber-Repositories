import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

import Login from "../components/Login";
import Footer from "./Footer";
import Homepage from "../components/Banner";
import Products from "../components/Products";
import Register from "../components/Register";
import Profile from "../components/Profile";
import Cart from "../components/Cart";
import Detail from "../components/Detail";
import UpdateProfile from "../components/UpdateProfile";
import Rentals from "../components/Rentals";
import OrderHistory from "../components/OrderHistory";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const NavbarComponent = () => {
    const navigate = useNavigate();

    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container style={{}}>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
          {isLoggedIn && (
            <Dropdown align="end" className="ms-auto">
              <Dropdown.Toggle
                variant="link"
                id="dropdown-basic"
                className="p-0"
                style={{
                  border: "none",
                  background: "transparent",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile Icon"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/cart")}>
                  Cart
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Container>
      </Navbar>
    );
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <NavbarComponent />

        {/* Main Content */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/login"
              element={
                <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/prod/:id" element={<Detail />} />
            <Route path="/update-profile/:userId" element={<UpdateProfile />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/history" element={<OrderHistory />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
