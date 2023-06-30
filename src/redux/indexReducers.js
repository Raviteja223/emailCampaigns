import { combineReducers } from "redux";

import { contacts } from "./reducers";

const allReducers = combineReducers({
  contacts,
});

export default allReducers;
