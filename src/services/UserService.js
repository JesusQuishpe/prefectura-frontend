import axios from "axios";
import { END_POINT } from "utils/conf";

export function UserService() { }

UserService.getUsers = async () => {
  let response = await axios.get(END_POINT + "users");
  return response.data.data
}
UserService.createUser=async (user)=>{
  let response=await axios.post(END_POINT + "users", user);
  return response.data.data
}
UserService.updateUser = async (user) => {
  let response = await axios.put(END_POINT + `users/${user.id}`, user);
  return response.data.data
}
UserService.deleteUser = async (id) => {
  let response = await axios.delete(END_POINT + `users/${id}`);
  return response.data.data
}