import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import leadReducer from "./slices/lead.slice";

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

export const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

const rootReducer = combineReducers({
  leadReducer,
});

export default rootReducer;
