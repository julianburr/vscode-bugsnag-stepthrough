import { API_BASE_URL } from "src/env";
import {
  ErrorDetails,
  EventDetails,
  Organisation,
  Project,
  TrendBucket,
} from "../types/bugsnag";

type RequestArgs = {
  token: string;
  query?: { [key: string]: any };
};

type Cache = {
  organisations: { [token: string]: Organisation[] };
  projects: { [orgId: string]: Project[] };
  errors: { [projectId: string]: ErrorDetails[] };
  event: { [errorId: string]: EventDetails };
  trends: { [key: string]: TrendBucket[] };
};

const cache: Cache = {
  organisations: {},
  projects: {},
  errors: {},
  event: {},
  trends: {},
};

export function clearCache(type: keyof typeof cache) {
  if (!type) {
    Object.keys(cache).forEach((key) => {
      cache[key as keyof typeof cache] = {};
    });
  } else {
    cache[type] = {};
  }
}

async function get<T = any>(
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

  const response = await fetch(`${fullUrl}`).then((res) => res.json());
  return response;
}

export async function getOrganisations({ token, query = {} }: RequestArgs) {
  if (cache.organisations[token]) {
    return cache.organisations[token];
  }

  const response = await get<Organisation[]>("/user/organizations", {
    token,
    query,
  });

  cache.organisations[token] = response;
  return response;
}

type GetProjectsArgs = RequestArgs & {
  orgId: string;
};

export async function getProjects({ token, orgId, query }: GetProjectsArgs) {
  if (cache.projects[orgId]) {
    return cache.projects[orgId];
  }

  const response = await get<Project[]>(`/organizations/${orgId}/projects`, {
    token,
    query,
  });

  cache.projects[orgId] = response;
  return response;
}

type GetErrorsArgs = RequestArgs & {
  projectId: string;
  filters: { sort: string; since: string };
};

export async function getErrors({
  token,
  projectId,
  filters,
  query = {},
}: GetErrorsArgs) {
  const cacheKey = `${projectId}--${JSON.stringify(filters)}`;
  if (cache.errors[cacheKey]) {
    return cache.errors[cacheKey];
  }

  const finalFilters = {
    "filters[event.since][][type]": "eq",
    "filters[event.since][][value]": filters.since,

    "filters[error.status][][type]": "eq",
    "filters[error.status][][value]": "open",

    "filters[error.severity][][type]": "eq",
    "filters[error.severity][][value]": "error",
  };

  const finalQuery = {
    ...query,
    ...finalFilters,
    sort: filters.sort,
  };
  const response = await get<ErrorDetails[]>(`/projects/${projectId}/errors`, {
    token,
    query: finalQuery,
  });

  cache.errors[cacheKey] = response;
  return response;
}

type GetErrorEventArgs = RequestArgs & {
  errorId: string;
};

export async function getErrorEvent({
  token,
  errorId,
  query,
}: GetErrorEventArgs) {
  if (cache.event[errorId]) {
    return cache.event[errorId];
  }

  const response = await get<EventDetails>(`/errors/${errorId}/latest_event`, {
    token,
    query,
  });

  cache.event[errorId] = response;
  return response;
}

type GetErrorTrendArgs = RequestArgs & {
  projectId: string;
  errorId: string;
};

export async function getErrorTrend({
  token,
  projectId,
  errorId,
  query,
}: GetErrorTrendArgs) {
  const cacheKey = `${projectId}--${errorId}`;
  if (cache.trends[cacheKey]) {
    return cache.trends[cacheKey];
  }

  const finalQuery = {
    ...query,
    "filters[event.since][][type]": "eq",
    "filters[event.since][][value]": "30d",
    buckets_count: 30,
  };
  const response = await get<TrendBucket[]>(
    `/projects/${projectId}/errors/${errorId}/trend`,
    {
      token,
      query: finalQuery,
    }
  );

  cache.trends[cacheKey] = response;
  return response;
}
