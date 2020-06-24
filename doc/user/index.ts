import register from "./register";
import login from "./login";

const user = {
  "/api/user/register": register,
  "/api/user/login": login,
};

export default user;
