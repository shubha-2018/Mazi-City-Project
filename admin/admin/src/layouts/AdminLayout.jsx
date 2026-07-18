import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminLayout({ children }) {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Header />

        <div className="container-fluid p-4">
          {children}
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;