import { axiosGet } from "@/api/request";
import { userDefault } from "./type";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRequest } from "ahooks";
import { serviceGetAccount } from "@/pages/Login/service";
import { ROUTE_PATH } from "@/routes/route.constant";

const getUserAccounts = () => {
  const location = useLocation();
  const [, setUser] = useAtom(userDefault);
  const { run: account } = useRequest(serviceGetAccount, {
    manual: true,
    onSuccess: (res) => {
        let roles = res.data.DT.roles;
        let token = res.data.DT.access_token;
        let getUser = res.data.DT.getUser;
        let data = {
            account: { roles, token, getUser },
            isAuthenticated: true,
        };
        setUser(data);
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  useEffect(() => {
    if(location.pathname !== ROUTE_PATH.LOGIN){
      account();
    }
  }, [location.pathname]);

  return { account };
};

export default getUserAccounts;