import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type RequestConfig = Omit<AxiosRequestConfig, "url">;

type TEndpoints<T extends Record<string, RequestConfig>> = {
  [P in keyof T]: T[P] | RequestConfig;
};

export type GetEndpoints = TEndpoints<{
  "/achievements/:id": {
    params: {
      id: number;
    };
  };
  "/achievements/me": {};
  "/users/me": {};
}>;

export type PostEndpoints = TEndpoints<{
  "/auth/signin": {
    data: {
      login: string;
      password: string;
    };
  };

  "/auth/signup": {
    data: {
      login: string;
      name: string;
      password: string;
      confirmPassword: string;
    };
  };

  "/auth/signout": {};

  "/achievements/give": {
    data: {
      user: number;
      achievemnts: number[];
    };
  };
}>;

export type PatchEndpoints = TEndpoints<{}>;

export type PutEndpoints = TEndpoints<{}>;

export type Endpoints =
  | keyof GetEndpoints
  | keyof PostEndpoints
  | keyof PatchEndpoints
  | keyof PutEndpoints;

export const request = async <T extends Endpoints, Data = any>(
  path: T,
  options: RequestConfig
): Promise<AxiosResponse<Data>> => {
  return await axios.request<Data>({
    url: path,
    ...options,
  });
};

export const get = <T extends keyof GetEndpoints>(
  path: T,
  headers?: Headers
) => async <Data = any>(
  options?: GetEndpoints[T]
): Promise<AxiosResponse<Data>> => {
  return await request<T, Data>(path, { ...options, headers, method: "GET" });
};

export const post = <T extends keyof PostEndpoints>(
  path: T,
  headers?: Headers
) => async <Data = any>(
  options?: PostEndpoints[T]
): Promise<AxiosResponse<Data>> => {
  return await request<T, Data>(path, { ...options, headers, method: "POST" });
};

export const patch = <T extends keyof PatchEndpoints>(
  path: T,
  headers?: Headers
) => async <Data = any>(
  options?: PatchEndpoints[T]
): Promise<AxiosResponse<Data>> => {
  return await request<T, Data>(path, {
    ...(options || {}),
    headers,
    method: "PATCH",
  });
};

export const put = <T extends keyof PutEndpoints>(
  path: T,
  headers?: Headers
) => async <Data = any>(
  options?: PutEndpoints[T]
): Promise<AxiosResponse<Data>> => {
  return await request<T, Data>(path, {
    ...(options || {}),
    headers,
    method: "PUT",
  });
};

export default {
  get,
  post,
  patch,
  put,
};
