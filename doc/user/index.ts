import register from "./register";
import login from "./login";
import recoverykey from "./recoverykey";
import recoveryPassword from "./recoveryPassword";

const user = {
  "/api/user/register": register,
  "/api/user/login": login,
  "/api/user/recovery": recoverykey,
  "/api/user/{recoveryKey}/recovery": recoveryPassword,
};

export default user;
