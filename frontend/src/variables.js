const main = "http://localhost:5000/api";

const endpoints = {
  login: `${main}/login`,
  register: `${main}/register`,
  start_workday: `${main}/user/start-workday`,
  day_info: `${main}/user/day-info`,
  users_worktimes: `${main}/admin/users-worktimes`, //Worktime all uzytkownikow
  user_worktimes: `${main}/admin/user-worktimes`, //all worktimes for one person
  admin_search: `${main}/admin/search-users`, //Searching users by name
};

module.exports = {
  endpoints,
};
