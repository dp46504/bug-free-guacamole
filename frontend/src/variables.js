const main = "http://localhost:5000/api";

const endpoints = {
  login: `${main}/login`,
  register: `${main}/register`,
  start_workday: `${main}/start-workday`,
};

module.exports = {
  endpoints,
};
