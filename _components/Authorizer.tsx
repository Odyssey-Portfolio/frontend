import { getLoggedInUser } from "@/utils/AuthUtils";
import { ReactNode, useEffect, useState } from "react";

interface AuthorizerProps {
  children: ReactNode;
  roles: string[];
}
export default function Authorizer(props: AuthorizerProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) return;
    setIsAuthorized(
      props.roles.some((role) => loggedInUser?.roles.includes(role))
    );
  }, [props.roles]);
  return <>{!isAuthorized ? <></> : props.children}</>;
}
