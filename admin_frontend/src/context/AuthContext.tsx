// import { createContext, useContext, useState, type ReactNode } from "react";

// interface Permission {
//   id: number;
//   module: string;
//   permission: string;
//   key: string;
// }

// interface AuthContextType {
//   permissions: Permission[];
//   setPermissions: (permissions: Permission[]) => void;
//   hasPermission: (module: string, permission: string) => boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   // const [permissions, setPermissions] = useState<Permission[]>([]);
//   const [permissions, setPermissions] = useState<Permission[]>(() => {
//     const savedPermissions = localStorage.getItem("permissions");

//     return savedPermissions ? JSON.parse(savedPermissions) : [];
//   });

//   const hasPermission = (module: string, permission: string) => {
//     return permissions.some(
//       (item) => item.module === module && item.permission === permission,
//     );
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         permissions,
//         setPermissions,
//         hasPermission,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }

//   return context;
// };

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import axiosInstance from "../utils/Axios.instance";

interface Permission {
  id: number;
  module: string;
  permission: string;
  key: string;
}

interface AuthContextType {
  permissions: Permission[];
  setPermissions: (permissions: Permission[]) => void;
  hasPermission: (module: string, permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissionsState] = useState<Permission[]>(() => {
    const savedPermissions = localStorage.getItem("permissions");

    return savedPermissions ? JSON.parse(savedPermissions) : [];
  });

  // -----------------------------------
  // Fetch latest permissions
  // -----------------------------------

  // const fetchPermissions = async () => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `/staff/id/${localStorage.getItem("userId")}`,
  //     );

  //     const latestPermissions = response.data.role.permissions || [];

  //     setPermissionsState(latestPermissions);

  //     localStorage.setItem("permissions", JSON.stringify(latestPermissions));
  //   } catch (error) {
  //     console.error("Failed to refresh permissions:", error);
  //   }
  // };
  const fetchPermissions = async () => {
    try {
      const userId = localStorage.getItem("userId");

      // console.log("REFRESH START");
      // console.log("USER ID:", userId);

      if (!userId) return;

      const response = await axiosInstance.get(`/staff/id/${userId}`);

      // console.log("API RESPONSE:", response.data);

      const latestPermissions = response.data?.role?.permissions || [];

      // console.log("NEW PERMISSIONS:", latestPermissions);

      setPermissionsState(latestPermissions);

      localStorage.setItem("permissions", JSON.stringify(latestPermissions));
    } catch (error) {
      console.error("PERMISSION REFRESH ERROR:", error);
    }
  };

  // -----------------------------------
  // Refresh permissions every 5 minutes
  // -----------------------------------

  // useEffect(() => {
  //   // Fetch once when AuthProvider loads
  //   fetchPermissions();

  //   // Fetch every 5 minutes
  //   const interval = setInterval(
  //     () => {
  //       fetchPermissions();
  //     },
  //     1 * 60 * 1000,
  //   );

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    // console.log("AUTH PROVIDER MOUNTED");

    fetchPermissions();

    const interval = setInterval(() => {
      console.log("1 MINUTE REFRESH");
      fetchPermissions();
    }, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // -----------------------------------
  // Update permissions manually
  // -----------------------------------

  const setPermissions = (newPermissions: Permission[]) => {
    setPermissionsState(newPermissions);

    localStorage.setItem("permissions", JSON.stringify(newPermissions));
  };

  // -----------------------------------
  // Check permission
  // -----------------------------------

  const hasPermission = (module: string, permission: string) => {
    return permissions.some(
      (item) => item.module === module && item.permission === permission,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        permissions,
        setPermissions,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
