import { toast } from "react-toastify";

import useGetUserPermissions from "../hooks/useGetUserPermissions";

const permissionPower = async (permissions: string[]): Promise<boolean> => {
  const userPermissions = useGetUserPermissions();

  if (
    permissions.some((permission) => {
      return userPermissions.includes(permission);
    }) ||
    userPermissions.includes("root-access")
  )
    return true;
  else {
    toast.error("Seu usuário não tem permissão pra isso! 🚫");
    return false;
  }
};

export default permissionPower;
