import BackEndAPI from "./api";
import { loginFailure, loginStart, loginSuccess } from "../context/AuthAction";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await BackEndAPI.post("/users/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};