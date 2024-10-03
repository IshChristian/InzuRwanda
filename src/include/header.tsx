import './header.css';
const Header = () => {
    return (
      <nav className="navbar bg-dark border-bottom border-body navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand text-white text-bold" href="#">
            Mov<span className="text-danger">Isi</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-white"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link custom-link active text-danger" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle custom-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown link
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item custom-link" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item custom-link" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item custom-link" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  const LeftSide = () => {
    return (
      <div className="bg-dark p-3 text-white">
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white custom-link" href="#">Menu Item 1</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white custom-link" href="#">Menu Item 2</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white custom-link" href="#">Menu Item 3</a>
          </li>
        </ul>
      </div>
    );
  };
  
  const RightSide = () => {
    return (
      <div className="p-3">
        <h1>Content Section</h1>
        <p>This is where the content will go.</p>
      </div>
    );
  };
  
  const Layout = () => {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <LeftSide />
            </div>
            <div className="col-lg-9 col-md-8">
              <RightSide />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Layout;
  