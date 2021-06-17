import { get } from "./httpService";

const BASE_URL = "http://localhost:3001";

async function apiGetCities() {
  const allCities = await get(`${BASE_URL}/cities`);
  return allCities;
}

async function apiGetElections(cityId) {
  const allElections = await get(`${BASE_URL}/election?cityId=${cityId}`);
  return allElections;
}

async function apiGetAllCandidates() {
  const allCandidates = get(`${BASE_URL}/candidates`);
  return allCandidates;
}

export { apiGetCities, apiGetElections, apiGetAllCandidates };
