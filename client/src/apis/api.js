import axios from "axios";

let url;
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:8080/api";
}

if (process.env.NODE_ENV === "production") {
  console.log(process.env.PORT);
  url = "api";
}
const BackEndAPI = axios.create({
  baseURL: url,
});
export default BackEndAPI;