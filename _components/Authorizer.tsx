import { LOGGED_IN_USER } from "@/_constants/Auth";
import { deserialize } from "@/utils/JsonUtils";
import { ReactNode, useEffect, useState } from "react";
import { LoggedInUser } from "../_models/LoggedInUser";

interface AuthorizerProps {
  children: ReactNode;
  roles: string[];
}
export default function Authorizer(props: AuthorizerProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const loggedInUserFromSessionStorage =
      sessionStorage.getItem(LOGGED_IN_USER);
    if (!loggedInUserFromSessionStorage) return;

    const loggedInUser = deserialize<LoggedInUser>(
      loggedInUserFromSessionStorage
    );
    setIsAuthorized(
      props.roles.some((role) => loggedInUser?.roles.includes(role))
    );
  }, []);
  return <>{!isAuthorized ? <></> : props.children}</>;
}
