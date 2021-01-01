import axios, { AxiosRequestConfig } from "axios";

type RequestConfig = Omit<AxiosRequestConfig, "url">;

export type GetEndpoints = {
  "/achievements/:id":
    | RequestConfig
    | {
        params: {
          id: number;
        };
      };
  "/achievements/me": RequestConfig | {};
  "/users/me": RequestConfig | {};
};

export type PostEndpoints = {
  "/auth/signin":
    | RequestConfig
    | {
        data: {
          login: string;
          password: string;
        };
      };

  "/auth/signup":
    | RequestConfig
    | {
        data: {
          login: string;
          name: string;
          password: string;
          confirmPassword: string;
        };
      };

  "/auth/signout": RequestConfig | {};

  "/achievements/give":
    | RequestConfig
    | {
        data: {
          user: number;
          achievemnts: number[];
        };
      };
};

export type PatchEndpoints = {};

export type PutEndpoints = {};

export type Endpoints =
  | keyof GetEndpoints
  | keyof PostEndpoints
  | keyof PatchEndpoints
  | keyof PutEndpoints;

export const request = async <T extends Endpoints>(
  path: T,
  options: RequestConfig
) => {
  return await axios.request({
    url: path,
    ...options,
  });
};

export const get = <T extends keyof GetEndpoints>(
  path: T,
  headers?: Headers
) => async (options?: GetEndpoints[T]) => {
  return await request(path, { ...options, headers, method: "GET" });
};

export const post = <T extends keyof PostEndpoints>(
  path: T,
  headers?: Headers
) => async (options?: PostEndpoints[T]) => {
  return await request(path, { ...options, headers, method: "POST" });
};

export const patch = <T extends keyof PatchEndpoints>(
  path: T,
  headers?: Headers
) => async (options?: PatchEndpoints[T]) => {
  return await request(path, { ...(options || {}), headers, method: "PATCH" });
};

export const put = <T extends keyof PutEndpoints>(
  path: T,
  headers?: Headers
) => async (options?: PutEndpoints[T]) => {
  return await request(path, { ...(options || {}), headers, method: "PUT" });
};

export default {
  get,
  post,
  patch,
  put,
};
