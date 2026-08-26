import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
// import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/Axios.instance";
import { useAuth } from "../context/AuthContext";
interface logInFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { setPermissions } = useAuth();
  const { hasPermission } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const initialValues: logInFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("This field is required")
      .email("Enter a valid email"),

    password: yup
      .string()
      .required("This field is required")
      .min(6, "Required at least 6 characters"),
  });

  const getDefaultRoute = (permissions: any[]) => {
    const hasReadPermission = (module: string) => {
      return permissions.some(
        (permission) =>
          permission.module === module && permission.permission === "read",
      );
    };

    if (hasReadPermission("dashboard")) {
      return "/dashboard";
    }

    if (hasReadPermission("home")) {
      return "/home";
    }

    if (hasReadPermission("about")) {
      return "/about";
    }

    if (hasReadPermission("category")) {
      return "/servicesCategory";
    }

    if (hasReadPermission("services")) {
      return "/services";
    }

    if (hasReadPermission("gallary")) {
      return "/gallary";
    }

    if (hasReadPermission("blog")) {
      return "/blogpage";
    }

    if (hasReadPermission("contactus")) {
      return "/contactUs";
    }

    if (hasReadPermission("servicerequest")) {
      return "/serviceReqests";
    }

    if (hasReadPermission("bookings")) {
      return "/bookings";
    }

    if (hasReadPermission("subscribers")) {
      return "/subscribers";
    }

    if (hasReadPermission("permissions")) {
      return "/permissions";
    }

    if (hasReadPermission("role")) {
      return "/role";
    }

    if (hasReadPermission("users")) {
      return "/staff";
    }

    // Agar kisi bhi module ka read permission nahi hai
    return "/unauthorized";
  };
  const formik = useFormik<logInFormValues>({
    initialValues,
    validationSchema,

    onSubmit: async (v) => {
      const userData = {
        email: v.email,
        password: v.password,
      };

      try {
        // console.log(userData);
        // const response = await axiosInstance.post("auth/login", userData);
        const response = await axiosInstance.post("/auth/login", userData);
        console.log("this is response ", response);

        const data = response.data;

        localStorage.setItem("accessToken", data.accessToke);

        // setPermissions(data.user.role.permissions);

        const permissions = data.user.role.permissions;

        setPermissions(permissions);

        localStorage.setItem("permissions", JSON.stringify(permissions));

        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userRole", data.user.role.role);
        localStorage.setItem("userId", data.user.id.toString());

        navigate(getDefaultRoute(permissions));

        // localStorage.setItem("userName", data.user.name);
        // localStorage.setItem("userEmail", data.user.email);
        // localStorage.setItem("userRole", data.user.role.role);
        // localStorage.setItem("userId", data.user.id.toString());

        // navigate(getDefaultRoute(permissions));
        // navigate("/dashboard");
        console.log("this is log in data ", response.data);

        toast.success("Login successfully");
      } catch (error: any) {
        console.log("MESSAGE:", error.response?.data?.message);
        console.log(error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b2f10_0%,#000_60%)]" />

      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl border border-amber-500/20 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(212,175,55,0.15)]">
        <div className="grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center p-14 border-r border-white/10">
            <p className="text-amber-400 tracking-[0.4em] text-sm mb-4">
              FREYZA
            </p>

            <h1 className="text-5xl font-bold text-white leading-tight">
              Luxury Salon
              <br />
              Management
            </h1>

            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              Manage bookings, services, team members and customer experiences
              from a premium dashboard built for Freyza salons.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                Booking Management
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                Staff Management
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                Reports & Analytics
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8 sm:p-10 lg:p-14">
            <div className="max-w-md mx-auto">
              {/* Mobile Logo */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-3xl font-bold text-amber-400">FREYZA</h1>
              </div>

              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>

              <p className="mt-2 text-slate-400">
                Sign in to access your dashboard.
              </p>

              <form onSubmit={formik.handleSubmit} className="mt-8 space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />

                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.password}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-slate-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-amber-400 hover:text-amber-300"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-amber-400 text-black font-semibold py-3 transition-all hover:bg-amber-300"
                >
                  Sign In
                </button>
              </form>

              <p className="text-center text-slate-500 mt-8 text-sm">
                Freyza Admin Dashboard © 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
