import axios from "axios";
import { DBURL } from "./config/db";
const instance = axios.create({
  baseURL: DBURL
});
export default instance;
