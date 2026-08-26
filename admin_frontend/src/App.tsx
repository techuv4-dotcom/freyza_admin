import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import AuthRedirect from "./pages/AuthRedirect";
import Services from "./pages/Services";
import AdminLayout from "./pages/AdminLayout";
import Bookings from "./pages/Bookings";
import ServiceRequestsPage from "./pages/ServiceRequestsPage";
import Subscribers from "./pages/Subscribers";
import Staff from "./pages/Staff";
import Settings from "./pages/Settings";
import GalleryManagement from "./pages/GallaryManagement";
// import AboutManagement from "./pages/AboutUs";
import BlogManagement from "./pages/Blog";
import ContactPageManagement from "./pages/ContactUs";
import LoginPage from "./pages/LoginPage";
import ServiceCategoryManagement from "./components/ServiceCategoryComponent/ServiceCategoryManagement";
import HomePageManagement from "./pages/HomePageManagement";
import AboutManagement from "./pages/AboutManagement";
import CreatePermission from "./components/RolePermisssions/createPermissions";
import RolePermissions from "./pages/RolePermissions";
import CourseCards from "./components/Course/CourseCards";
import QueryManagement from "./components/QueryManagement/Querys";
// import SingleCourseView from "./components/Single-course/SingleCourseView";
// import SingleCourse from "./pages/SingleCourse";

const App = () => {
  return (
    // <Registration />
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AdminLayout />}>
          <Route
            path="/dashboard"
            element={
              <AuthRedirect>
                <Dashboard />
              </AuthRedirect>
            }
          />
          <Route
            path="/services"
            element={
              <AuthRedirect>
                <Services />
              </AuthRedirect>
            }
          />
          <Route
            path="/course"
            element={
              <AuthRedirect>
                <CourseCards />
              </AuthRedirect>
            }
          />

          <Route
            path="/querys"
            element={
              <AuthRedirect>
                <QueryManagement />
              </AuthRedirect>
            }
          />
          <Route
            path="/role"
            element={
              <AuthRedirect>
                <RolePermissions />
              </AuthRedirect>
            }
          />
          <Route
            path="/permissions"
            element={
              <AuthRedirect>
                <CreatePermission />
              </AuthRedirect>
            }
          />
          <Route
            path="/servicesCategory"
            element={
              <AuthRedirect>
                <ServiceCategoryManagement />
              </AuthRedirect>
            }
          />
          <Route
            path="/bookings"
            element={
              <AuthRedirect>
                <Bookings />
              </AuthRedirect>
            }
          />
          <Route
            path="/home"
            element={
              <AuthRedirect>
                <HomePageManagement />
              </AuthRedirect>
            }
          />
          <Route
            path="/serviceReqests"
            element={
              <AuthRedirect>
                <ServiceRequestsPage />
              </AuthRedirect>
            }
          />
          <Route
            path="/subscribers"
            element={
              <AuthRedirect>
                <Subscribers />
              </AuthRedirect>
            }
          />
          <Route
            path="/staff"
            element={
              // <Test />
              <AuthRedirect>
                <Staff />
              </AuthRedirect>
            }
          />
          {/* <Route
            path="/add-member"
            element={
              <AuthRedirect>
                <AddTeamMember />
              </AuthRedirect>
            }
          /> */}

          <Route
            path="/settings"
            element={
              <AuthRedirect>
                <Settings />
              </AuthRedirect>
            }
          />
          <Route
            path="/gallary"
            element={
              <AuthRedirect>
                <GalleryManagement />
              </AuthRedirect>
            }
          />
          <Route
            path="/about"
            element={
              <AuthRedirect>
                <AboutManagement />
              </AuthRedirect>
            }
          />
          <Route
            path="/blogpage"
            element={
              <AuthRedirect>
                <BlogManagement />
              </AuthRedirect>
            }
          />
          <Route
            path="/contactUs"
            element={
              <AuthRedirect>
                <ContactPageManagement />
              </AuthRedirect>
            }
          />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
};

export default App;
