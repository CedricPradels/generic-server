import register from "./register";
import login from "./login";
import recoverykey from "./recoverykey";

const user = {
  "/api/user/register": register,
  "/api/user/login": login,
  "/api/user/recovery": recoverykey,
};

export default user;
