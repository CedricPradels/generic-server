import register from "./register";
import login from "./login";
import recoverykey from "./recoverykey";
import recoveryPassword from "./recoveryPassword";
import read from "./read";
import update from "./update";

const user = {
  "/api/user/register": register,
  "/api/user/login": login,
  "/api/user/recovery": recoverykey,
  "/api/user/{recoveryKey}/recovery": recoveryPassword,
  "/api/user/{userId}": read,
  "/api/user/{userId}/update": update,
};

export default user;
