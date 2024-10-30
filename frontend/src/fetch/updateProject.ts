import catchError from "../utils/catchError";
import { EmptyValueError, WrongTypeError } from "../utils/customErrors";
import getFolders from "./getFolders";
import getTasks from "./getTasks";

const apiUrl = process.env.REACT_APP_API_URL;

// UPDATE NAME OF THE PROJECT //

const updateProject = async (
  id: number | string | undefined,
  folderName: string | null,
  colorId: number | null
) => {
  try {
    folderName = folderName || null;
    colorId = colorId || null;

    if (!id) throw new EmptyValueError(undefined, { id });
    if (typeof id !== "number") throw new WrongTypeError("number", id, { id });

    if (!folderName && !colorId)
      throw new EmptyValueError("Can't be both empty", { folderName, colorId });

    if (folderName) {
      if (typeof folderName !== "string")
        throw new WrongTypeError("string", folderName, { folderName });
    }

    if (colorId) {
      if (typeof colorId !== "number")
        throw new WrongTypeError("number", colorId, { colorId });
    }

    const body = { folderName, colorId };
    console.log(JSON.stringify(body));
    const response = await fetch(`${apiUrl}/folders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const message = await response.json();
    console.log(message);
    getFolders();
    getTasks();
  } catch (error) {
    catchError(error);
  }
};

export default updateProject;
