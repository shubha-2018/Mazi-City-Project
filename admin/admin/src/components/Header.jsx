function Header() {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4">

      <h4 className="mb-0">Mazi City Admin</h4>

      <div className="d-flex align-items-center">

        <span className="me-3">
          Welcome Admin
        </span>

        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="Admin"
          width="40"
          className="rounded-circle"
        />

      </div>

    </nav>
  );
}

export default Header;