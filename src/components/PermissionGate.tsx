import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import useGetUserPermissions from "../hooks/useGetUserPermissions";

interface PermissionGateProps {
  children: React.ReactNode;
  permissions: string[];
  isPage?: boolean;
  isFunction?: boolean;
}

export function PermissionGate({
  children,
  permissions,
  isPage = false,
  isFunction = false,
}: PermissionGateProps) {
  const userPermissions = useGetUserPermissions();

  if (
    permissions.some((permission) => {
      return userPermissions.includes(permission);
    }) ||
    userPermissions.includes("root-access")
  )
    return <>{children}</>;
  else {
    if (isFunction) return null;
    if (isPage) return <Navigate to="/unauthorized" />;
    else
      return (
        <div
          style={{
            height: "calc(100vh - 76px)",
            color: "red",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "25px 0px 25px 0px",
          }}
        >
          <p style={{ fontSize: 48 }}>🚫</p>
          <p style={{ fontSize: 24 }}>Seu usuário não tem permissão aqui!</p>
        </div>
      );
  }
}
