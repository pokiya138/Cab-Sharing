import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer";
import { Login } from "./components/User/Login";
import { Register } from "./components/User/Register";
import { VLogin } from "./components/Vendor/VLogin";
import { VRegister } from "./components/Vendor/VRegister";
import { Header } from "./components/Header";
import { Editprofile } from "./components/User/Account/Editprofile";
import { Changepassword } from "./components/User/Account/Changepassword";
import { Ride_Inquiry } from "./components/User/Ride_Inquiry";
import { Cab_search } from "./components/Cab_search";
import { User_chat } from "./components/User/User_chat";
import { U_chat } from "./components/User/U_chat";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Ride_Details } from "./components/Ride_Details";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Admin_login } from "./Admin/Admin_login";
import { Dashbord } from "./Admin/Dashbord";
import { UserList } from "./Admin/UserList";
import { VendorList } from "./Admin/VendorList";
import { Verification } from "./Admin/Verification";
import { Profile } from "./Admin/Profile";
import { Details } from "./Admin/Details";
import { ContactDetails } from "./Admin/ContactDetails";
import { Dash } from "./Admin/Dash";
import { Vehicle } from "./Admin/Vehicle";
import { VehicleInfo } from "./Admin/VehicleInfo";
import { Myvehicel } from "./components/Vendor/Myvehicel";
import { Chat } from "./components/User/Chat";
import { useEffect } from "react";
import { Page_not_found } from "./components/Page_not_found";
import { AddRide } from "./components/Vendor/AddRide";
import { Vender_Ride_inquiry } from "./components/Vendor/Vender_Ride_inquiry";
import { RideBooking } from "./components/Vendor/RideBooking";

function App() {
  const id = sessionStorage.getItem("session_id");
  const location = useLocation();

  return (
    <>
      <ToastContainer
        autoClose={1000}
        hideProgressBar={true}
        position="top-center"
      />
      {!id && (
        <>
          {location.pathname == "/admin/login" ? null : <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/v_login" element={<VLogin />} />
            <Route path="/v_register" element={<VRegister />} />
            <Route path="/editprofile" element={<Editprofile />} />
            <Route path="/changepassword" element={<Changepassword />} />
            <Route path="/ride_inquiry" element={<Ride_Inquiry />} />
            <Route path="/cab_search/:from/:to" element={<Cab_search />} />
            <Route path="/ride_details" element={<Ride_Details />} />
            <Route path="/my_vehicel" element={<Myvehicel />} />
            <Route path="/add_ride" element={<AddRide />} />
            <Route path="/v_ride_inquiry" element={<Vender_Ride_inquiry />} />
            <Route path="/ride_book" element={<RideBooking />} />
            <Route path="/user_chat/" element={<User_chat />}>
              <Route path="" element={<Chat />} />
              <Route path="u_chat" element={<U_chat />} />
            </Route>
            <Route path="/admin" element={<Dashbord />} />
            <Route path="/admin/login" element={<Admin_login />} />
            <Route path="*" element={<Page_not_found />} />
          </Routes>
          {location.pathname == "/admin/login" ? null : <Footer />}
        </>
      )}

      {id && (
        <Routes>
          <Route path="/admin/" element={<Dashbord />}>
            <Route path="" element={<Dash />} />
            <Route path="userlist" element={<UserList />} />
            <Route path="vendorlist" element={<VendorList />} />
            <Route path="verification" element={<Verification />} />
            <Route path="profile" element={<Profile />} />
            <Route path="details" element={<Details />} />
            <Route path="vehicle" element={<Vehicle />} />
            <Route path="vehicle_info" element={<VehicleInfo />} />
            <Route path="contact" element={<ContactDetails />} />
          </Route>
          <Route path="/admin/login" element={<Admin_login />} />
          <Route path="*" element={<Page_not_found />} />
        </Routes>
      )}
    </>
  );
}

export default App;
