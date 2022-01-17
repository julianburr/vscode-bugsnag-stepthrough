import { API_BASE_URL } from "src/env";

export type RequestArgs = {
  token: string;
  query?: { [key: string]: any };
};

export async function get<T = any>(
  url: string,
  { token, query }: RequestArgs
): Promise<T> {
  if (!token) {
    throw new Error("No token specified");
  }

  const fullUrl = new URL(`${API_BASE_URL}/api${url}`);
  fullUrl.search = new URLSearchParams({
    auth_token: token,
    ...query,
  }).toString();

  // TODO: add error handling
  // https://github.com/julianburr/vscode-bugsnag-stepthrough/issues/5

  const response = await fetch(`${fullUrl}`).then((res) => res.json());
  return response;
}
