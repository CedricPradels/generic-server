import register from "./register";
import login from "./login";
import recoverykey from "./recoverykey";
import recoveryPassword from "./recoveryPassword";
import read from "./read";

const user = {
  "/api/user/register": register,
  "/api/user/login": login,
  "/api/user/recovery": recoverykey,
  "/api/user/{recoveryKey}/recovery": recoveryPassword,
  "/api/user/{userId}": read,
};

export default user;
