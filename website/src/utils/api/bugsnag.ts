import { URL, URLSearchParams } from "url";
import fetch, { Response } from "node-fetch";

type ForwardToBugsnagResponse<T = any> = {
  response: Response;
  json: T;
  error: Error | null;
};

export async function forwardToBugsnag<T = any>(
  path: string,
  query: any
): Promise<ForwardToBugsnagResponse<T>> {
  const url = new URL(`https://api.bugsnag.com${path}`);
  url.search = new URLSearchParams(query).toString();

  const response = await fetch(url.toString());
  try {
    const json = (await response.json()) as any;
    return {
      response,
      json,
      error: null,
    };
  } catch (e: any) {
    return {
      response,
      json: {} as any,
      error: e,
    };
  }
}
