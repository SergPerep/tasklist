import catchError from "../utils/catchError";
import { EmptyValueError, WrongTypeError } from "../utils/customErrors";
import getFolders from "./getFolders";
import getTasks from "./getTasks";

const apiUrl = process.env.REACT_APP_API_URL;

const deleteProject = async (id: number | string) => {
  try {
    if (!id) throw new EmptyValueError(undefined, { id });
    if (typeof id !== "number") throw new WrongTypeError("number", id, { id });

    const delProject = await fetch(`${apiUrl}/folders/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const message = await delProject.json();
    console.log(message);
    getFolders();
    getTasks();
  } catch (error) {
    catchError(error);
  }
};

export default deleteProject;
