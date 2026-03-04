import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <Container className="py-4" style={{}}>
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              Providing quality services since 2024. Our mission is to enhance
              the user experience through innovation.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              </li>
              <li>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: support@website.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>© 2024 Cart App. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
