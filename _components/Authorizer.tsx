import { LOGGED_IN_USER } from "@/_constants/Auth";
import { deserialize } from "@/utils/JsonUtils";
import { ReactNode, useMemo } from "react";
import { LoggedInUser } from "../_models/LoggedInUser";

interface AuthorizerProps {
  children: ReactNode;
  roles: string[];
}
export default function Authorizer(props: AuthorizerProps) {
  const loggedInUserFromSessionStorage = sessionStorage.getItem(LOGGED_IN_USER);
  const isAuthorized = useMemo(() => {
    if (!loggedInUserFromSessionStorage) return false;
    const loggedInUser = deserialize<LoggedInUser>(
      loggedInUserFromSessionStorage
    );
    return props.roles.some((role) => loggedInUser?.roles.includes(role));
  }, [loggedInUserFromSessionStorage]);

  return <>{!isAuthorized ? <></> : props.children}</>;
}
