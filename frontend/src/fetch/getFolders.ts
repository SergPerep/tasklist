import store from "src/store";

const apiUrl = process.env.REACT_APP_API_URL;

const setProjects = store.getActions().setProjects;

const getFolders = async () => {
  try {
    const response = await fetch(`${apiUrl}/folders`, {
      credentials: "include",
    });
    const data = await response.json();
    setProjects(data);
    return data; // ex: [{id: 3, name: "Work", color_id: 1}, ...]
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export default getFolders;
