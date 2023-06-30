export const contacts = (state = [], action) => {
  switch (action.type) {
    case "Contacts":
      state = action.data;

      return state;
    default:
      return state;
  }
};
