import { useEffect } from "react";
import { useForm } from "react-cool-form";

import { IntroScreen } from "./intro";

import { useSettings } from "../hooks/settings";
import { useBugsnagErrors } from "../hooks/bugsnag";
import { Header } from "../components/header";
import { Select } from "../components/select";
import { Spacer } from "../components/spacer";
import { Hr } from "../components/hr";
import { OverviewStats } from "../components/overview-stats";
import { OverviewList } from "../components/overview-list";
import { EmptyMessage } from "../components/empty-message";
import { LoadingMessage } from "../components/loading-message";

export function OverviewScreen() {
  const { settings, update } = useSettings();

  const { form, use } = useForm({
    defaultValues: {
      since: settings?.workspace.filters?.since || "1d",
      sort: settings?.workspace.filters?.sort || "users",
    },
  });

  const values = use("values");
  useEffect(() => {
    update.workspace?.("filters", values);
  }, [values]);

  const { loading, errors } = useBugsnagErrors({
    projects: settings?.workspace.projects || [],
    filters: values,
  });

  if (!settings?.global?.tokens?.length) {
    // Show message if no global tokens have been set yet
    return (
      <IntroScreen
        message={<p>You are not connected to any Bugsnag accounts yet.</p>}
      />
    );
  }

  if (!settings?.workspace?.projects?.length) {
    // Show message if no projects have been selected for the current
    // workspace yet
    return (
      <IntroScreen
        message={
          <p>You have not selected any projects for this workspace yet.</p>
        }
      />
    );
  }

  const totalErrors =
    errors?.open?.length + errors?.skipped?.length + errors?.resolved?.length;

  return (
    <>
      <Header title="Overview" settingsLink />

      <form ref={form}>
        <Select
          name="since"
          label="Show errors from"
          items={[
            { label: "Today", value: "1d" },
            { label: "This week", value: "7d" },
            { label: "This month", value: "30d" },
          ]}
        />
        <Spacer height="4px" />
        <Select
          name="sort"
          label="Sort errors by"
          items={[
            { label: "Affected users", value: "users" },
            { label: "Instances", value: "events" },
            { label: "Last seen", value: "last_seen" },
          ]}
        />
      </form>

      <Spacer height="20px" />
      <Hr />
      <Spacer height="15px" />

      {loading ? (
        <>
          <Spacer height="20px" />
          <LoadingMessage message="Loading errors from bugsnag..." />
        </>
      ) : (
        <>
          <OverviewStats
            open={errors.open.length}
            skipped={errors.skipped.length}
            resolved={errors.resolved.length}
            active={settings.workspace.activeTab || "open"}
            onClick={(tab) => update.workspace?.("activeTab", tab)}
          />

          <Spacer height="30px" />

          {totalErrors === 0 ? (
            <>
              <Spacer height="25px" />
              <EmptyMessage />
            </>
          ) : (
            <OverviewList
              errors={
                errors[
                  (settings.workspace.activeTab ||
                    "open") as keyof typeof errors
                ]
              }
            />
          )}
        </>
      )}
    </>
  );
}
