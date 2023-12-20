import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import AddCustomer from "./pages/AddCustomer.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import Customers from "./pages/Customers.jsx";
import Ateliers from "./pages/Ateliers.jsx";
import AddAtelier from "./pages/AddAtelier.jsx";
import { Branches } from "./pages/Branches.jsx";
import { Login } from "./pages/Login.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { LogOut } from "./pages/LogOut.jsx";
import AddBranch from "./pages/AddBranch.jsx";
import Progress from "react-progress";

const App = () => {
  return (
    <ConfigProvider locale={fa_IR} direction="rtl">
      <div className="app">
        <Progress
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          color="red"
          showOnShallow={true}
        />

        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/addcustomer" element={<AddCustomer />} />
              <Route path="/ateliers" element={<Ateliers />} />
              <Route path="/addatelier" element={<AddAtelier />} />
              <Route path="/Addbranch/:id" element={<AddBranch />} />
              <Route path="/Branches/:id" element={<Branches />} />
              <Route element={<LogOut />} path="/logout" />
            </Route>
            <Route element={<Login />} path="/login" />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
};
export default App;
