import { promiseWrapper } from "../../utils/PromiseWrapper";
import { AuthPayload, AuthResponse } from "./Auth.types";
import { api } from "../../api";

//login
export const loginApi = async ({
  username,
  password,
}: AuthPayload): AuthResponse => {
  return promiseWrapper(
    api.post(`/login`, {
      username,
      password,
    })
  );
};

//registration
export const registerApi = async ({ username, password }: AuthPayload) => {
  return promiseWrapper(
    api.post(`/register`, {
      username,
      password,
    })
  );
};
