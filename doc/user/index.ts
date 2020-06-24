import register from "./register";
import login from "./login";
import recoveryKey from "./recoveryKey";
import recoveryPassword from "./recoveryPassword";
import read from "./read";
import update from "./update";
import deleteUser from "./delete";

const user = {
  "/api/user/register": register,
  "/api/user/login": login,
  "/api/user/recovery": recoveryKey,
  "/api/user/{recoveryKey}/recovery": recoveryPassword,
  "/api/user/{userId}": { ...read, ...update, ...deleteUser },
};

export default user;
