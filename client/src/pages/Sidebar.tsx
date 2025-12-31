import "./Sidebar.css";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useAppSelector } from "../hooks/useTypedRedux";
import { FaRegUser } from "react-icons/fa6";
// import { useNavigate } from "react-router";

export default function Sidebar() {
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  // const navigate = useNavigate();

  // return (
  //   <Container>
  //     <div className="pp-navigation">
  //       <button onClick={() => navigate("/Home")} className="pp-nav-title">
  //         <h3>PokéProject</h3>
  //       </button>
  //       <button onClick={() => navigate("/Home")} className="pp-nav-item">
  //         <h5>Home</h5>
  //       </button>
  //       <button onClick={() => navigate("/Search")} className="pp-nav-item">
  //         <h5>Search</h5>
  //       </button>
  //       <button onClick={() => navigate("/Explore")} className="pp-nav-item">
  //         <h5>Explore</h5>
  //       </button>
  //     </div>
  //   </Container>
  // );

  // const { pathname } = useLocation();
  // const links = [
  //   { label: "Home", path: "/Home", icon: CgPokemon },
  //   { label: "Search", path: "/Search", icon: CgPokemon },
  //   { label: "Explore", path: "/Explore", icon: CgPokemon },
  //   { label: "Profile", path: "/Profile", icon: CgPokemon },
  // ];
  // return (
  //   <ListGroup
  //     id="pp-sidebar-menu"
  //     style={{ width: 100 }}
  //     className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-secondary z-2"
  //   >
  //     <ListGroup.Item className="bg-black border-0 text-center">
  //       <IoMenu className="text-white fs-1 mt-3" />
  //     </ListGroup.Item>
  //     {links.map((link, idx) => (
  //       <ListGroup.Item
  //         key={idx}
  //         as={Link}
  //         to={link.path}
  //         className={`bg-light text-center border-0
  //             ${
  //               pathname.includes(link.label)
  //                 ? "text-danger bg-white"
  //                 : "text-white bg-black"
  //             }`}
  //       >
  //         {link.icon({ className: "fs-1 text-danger" })}
  //         <br />
  //         {link.label}
  //       </ListGroup.Item>
  //     ))}
  //   </ListGroup>
  // );
  return (
    <Container>
      {/* <Navbar fixed="top" expand="md" className="bg-white">
        <Container>
          <Navbar.Brand href="/Home">PokéProject</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/Home">Home</Nav.Link>
              <Nav.Link href="#/Search">Search</Nav.Link>
              <Nav.Link href="#/Explore">Explore</Nav.Link>
            </Nav>
            <Button variant="primary" href="#/Login" className="ms-auto">
              Login
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <Navbar expand="md" bg="white" className="mb-3 shadow-sm">
        <Container fluid>
          <Navbar.Brand href="#/Home">PokéProject</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          {/* <Container> */}
          <Navbar.Offcanvas
            // backdrop={false}
            id={`offcanvasNavbar-expand-xxl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="top" // or 'start' for left-side
          >
            <Container>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-md`}
                  className=""
                >
                  PokéProject
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <Nav.Link href="#/Home">Home</Nav.Link>
                  <Nav.Link href="#/Search">Search</Nav.Link>
                  <Nav.Link href="#/Explore">Explore</Nav.Link>
                </Nav>
                {/* <Button variant="primary" href="#/Login" className="">
                  Login
                </Button> */}
                {currentUser ? (
                  <Button href="#/Profile" className="btn-primary">
                    <FaRegUser className="mb-1" /> Profile
                  </Button>
                ) : (
                  <Button variant="primary" href="#/Login" className="">
                    Login
                  </Button>
                )}
              </Offcanvas.Body>
            </Container>
          </Navbar.Offcanvas>
          {/* </Container> */}
        </Container>
      </Navbar>
    </Container>
  );
}
