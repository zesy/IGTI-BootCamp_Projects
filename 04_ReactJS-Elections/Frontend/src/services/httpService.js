import axios from "axios";

// const reqHttp = axios.create({ baseURL: "http://localhost:3001/" });

async function get(url) {
  const { data } = await axios.get(url);
  return data;
}

export { get };
