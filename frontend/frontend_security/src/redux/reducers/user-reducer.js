import userType from "../types/user-type";

const initialState = {
  users: [],
  user: {},
  userAndRoles: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userType.SHOW_LIST:
      var users = { ...state.users };
      users = payload.users;
      return {
        ...state,
        users,
      };

    case userType.RESET_USER_AND_ROLE:
      var users = { ...state.users };
      users = [];
      return {
        ...state,
        users,
      };

    case userType.SHOW_FIND_ALL_BY_ID_USER:
      var userAndRoles = { ...state.userAndRoles };
      userAndRoles = payload.userAndRoles;
      return {
        ...state,
        userAndRoles,
      };

    default:
      return state;
  }
};

export default userReducer;
