import { createStore, persist } from "easy-peasy";
import authModel, { AuthModel } from "./authModel";
export interface IAppStoreState {
  auth: AuthModel;
}
const model: IAppStoreState = {
  auth: persist(authModel, { storage: "localStorage" }),
};
export const store = createStore(model);

export type StoreStateType = typeof store;
