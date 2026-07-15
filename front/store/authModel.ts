import { Action, action } from "easy-peasy";

export interface IAuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

export interface AuthModel {
  user: IAuthResponse | null;
  isAuthenticated: boolean;
  setAuth: Action<AuthModel, IAuthResponse>;
  clearAuth: Action<AuthModel>;
}

const authModel: AuthModel = {
  user: null,
  isAuthenticated: false,

  setAuth: action((state, payload: IAuthResponse) => {
    state.user = payload;
    state.isAuthenticated = true;
    localStorage.setItem("token", payload.token);
  }),

  clearAuth: action((state) => {
    state.user = null;
    state.isAuthenticated = false;
    localStorage.removeItem("token");
  }),
};

export default authModel;
