import { ErrorDetails, Organisation, Project } from "../types/bugsnag";

type RequestArgs = {
  token: string;
  query?: { [key: string]: any };
};

type Cache = {
  organisations: { [token: string]: Organisation[] };
  projects: { [orgId: string]: Project[] };
  errors: { [projectId: string]: ErrorDetails[] };
};

const cache: Cache = {
  organisations: {},
  projects: {},
  errors: {},
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

  const fullUrl = new URL(`http://localhost:3000/api${url}`);
  fullUrl.search = new URLSearchParams({
    auth_token: token,
    ...query,
  }).toString();

  const response = await fetch(`${fullUrl}`).then((res) => res.json());
  console.log({ response });

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
