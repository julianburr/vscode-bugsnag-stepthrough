export type Organisation = {
  id: string;
  name: string;
  slug: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
  collaborators_url: string;
  projects_url: string;
  created_at: string;
  updated_at: string;
  auto_upgrade: boolean;
  upgrade_url: string;
  can_start_pro_trial: boolean;
  pro_trial_ends_at: string | null;
  pro_trial_feature: boolean;
  billing_emails: string[];
};

export type Project = {
  id: string;
  organization_id: string;
  slug: string;
  name: string;
  api_key: string;
  type: string;
  is_full_view: boolean;
  release_stages: string[];
  language: string;
  created_at: string;
  updated_at: string;
  errors_url: string;
  events_url: string;
  url: string;
  html_url: string;
  open_error_count: number;
  for_review_error_count: number;
  collaborators_count: number;
  global_grouping: any[];
  location_grouping: any[];
  discarded_app_versions: string[];
  discarded_errors: any[];
  custom_event_fields_used: number;
  resolve_on_deploy: boolean;
  url_whitelist: string | null;
  ignore_old_browsers: boolean;
  ignored_browser_versions: any;
};

export type ErrorDetails = {
  id: string;
  project_id: string;
  error_class: string;
  message: string;
  context: string;
  severity: string;
  original_severity: string;
  overridden_severity: string | null;
  events: number;
  events_url: string;
  unthrottled_occurrence_count: number;
  users: number;
  first_seen: string;
  last_seen: string;
  first_seen_unfiltered: string;
  last_seen_unfiltered: string;
  status: string;
  created_issue: string | null;
  linked_issues: string[];
  reopen_rules: any;
  assigned_collaborator_id: string | null;
  comment_count: number;
  missing_dsyms: any[];
  release_stages: string[];
  grouping_reason: string;
  grouping_fields: {
    method: string;
    file: string;
    lineNumber: number;
  };
  url: string;
  project_url: string;

  // Data/methods I added for convenience
  _status: string;
  _open: () => Promise<void>;
  _skip: () => Promise<void>;
  _fix: () => Promise<void>;
};

export type EventTrace = {
  column_number: number;
  in_project: boolean | null;
  line_number: number;
  method: string;
  file: string;
  type: any;
  code: string | null;
  code_file: string | null;
  address_offset: any;
  macho_uuid: string | null;
  source_control_link: string | null;
  source_control_name: string;
};

export type EventBreadcrumb = {
  timestamp: string;
  name: string;
  type: string;
  metaData?: {
    title?: string;
    state?: any;
    prevState?: any;
    to?: string;
    from?: string;
  };
};

export type EventDetails = {
  id: string;
  url: string;
  project_url: string;
  is_full_report: boolean;
  error_id: string;
  received_at: string;
  exceptions: {
    error_class: string;
    message: string;
    type: string;
    stacktrace: EventTrace[];
    registers: any;
  }[];
  threads: any;
  metaData: {
    device: {
      userAgent: string;
    };
  };
  request: {
    url: string;
    clientIp: string;
    headers: any;
  };
  app: {
    releaseStage: string;
    type: string;
    duration: number;
  };
  device: {
    id: string;
    osName: string;
    browserName: string;
    browserVersion: string;
    orientation: string;
    locale: string;
    time: string;
  };
  user: any;
  breadcrumbs: EventBreadcrumb[];
  context: string;
  severity: string;
  unhandled: boolean;
  feature_flags: any[];
};

export type TrendBucket = {
  from: string;
  to: string;
  events_count: number;
};
