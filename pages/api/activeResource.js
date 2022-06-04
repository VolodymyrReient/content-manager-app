import axios from "axios";

// eslint-disable-next-line

export default async function activeResource(_, res) {
  const response = await axios.get(`${process.env.API_URL}/active-resource`);
  const resource = await response.data;

  return res.send(resource);
}
