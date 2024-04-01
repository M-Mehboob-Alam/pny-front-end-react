import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MainHeader() {
  const navigate = useNavigate();
  
  const isLogedIn = localStorage.getItem('user');
  function logoutHandler(){
    localStorage.removeItem('user');
    navigate('/signup');
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <NavLink to='/'>E-Commerce</NavLink>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">
                <NavLink to='/add-product'>
                  Add Products             
                </NavLink>
                
                </Nav.Link>
            <Nav.Link href="#features">
                <NavLink to='/products'>

                View Product
                </NavLink>
                </Nav.Link>

                {
                  isLogedIn ?( <Nav.Link  onClick={logoutHandler}>Logout </Nav.Link>) : ( <NavLink to="/signup">Signup </NavLink> )
                }
            
               
           
          </Nav>
        </Container>
      </Navbar>
      <br />
     

    </>
  );
}

export default MainHeader;