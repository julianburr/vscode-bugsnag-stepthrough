import { useEffect, useState } from "react";
import { useForm } from "react-cool-form";

import { useVSCode } from "../providers/vscode";
import { useBugsnag } from "../providers/bugsnag";
import { TitleBar } from "../title-bar";
import { Select } from "../select";
import { Spacer } from "../spacer";
import { SuccessMessage } from "../message/success";
import { LoadingMessage } from "../message/loading";
import { IntroMessage } from "../message/intro";
import { Tabs } from "../tabs";
import { ErrorsList } from "../list/errors";
import { IconButtonLink } from "../button/icon-link";

import SettingsSvg from "../../assets/icons/vscode/settings-gear.svg";

export function OverviewScreen() {
  const { settings, updateSetting } = useVSCode();
  const { errors, loadErrors } = useBugsnag();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    loadErrors?.({
      projects: settings?.workspace?.projects || [],
      filters: settings?.workspace?.filters,
      skipped: settings?.workspace?.skippedErrors,
      fixed: settings?.workspace?.fixedErrors,
    })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        // TODO: add error handling
        // https://github.com/julianburr/vscode-bugsnag-stepthrough/issues/5
        console.error(e);
        setLoading(false);
      });
  }, [
    JSON.stringify(settings?.workspace?.projects),
    JSON.stringify(settings?.workspace?.filters),
    JSON.stringify(settings?.workspace?.skippedErrors),
    JSON.stringify(settings?.workspace?.fixedErrors),
  ]);

  const { form, use } = useForm({
    defaultValues: {
      since: settings?.workspace?.filters?.since || "1d",
      sort: settings?.workspace?.filters?.sort || "users",
    },
  });

  const values = use("values");
  useEffect(() => {
    updateSetting?.workspace?.({ key: "filters", value: values });
  }, [values]);

  if (!settings?.global?.tokens?.length) {
    // Show message if no global tokens have been set yet
    return (
      <IntroMessage
        message={<p>You are not connected to any Bugsnag accounts yet.</p>}
      />
    );
  }

  if (!settings?.workspace?.projects?.length) {
    // Show message if no projects have been selected for the current
    // workspace yet
    return (
      <IntroMessage
        message={
          <p>You have not selected any projects for this workspace yet.</p>
        }
      />
    );
  }

  const totalErrors = errors
    ? errors?.open?.length + errors?.skipped?.length + errors?.fixed?.length
    : 0;

  return (
    <>
      <TitleBar
        title="Overview"
        actionsRight={<IconButtonLink to="/settings" icon={<SettingsSvg />} />}
      />

      <Spacer height="6px" />
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
        <Spacer height="8px" />
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

      <Spacer height="35px" />

      {loading ? (
        <>
          <Spacer height="20px" />
          <LoadingMessage message="Loading errors from bugsnag..." />
        </>
      ) : (
        <>
          <Tabs
            open={errors?.open?.length || 0}
            skipped={errors?.skipped?.length || 0}
            fixed={errors?.fixed?.length || 0}
            activeTab={settings.workspace?.activeTab || "open"}
            onChange={(tab) =>
              updateSetting?.workspace?.({ key: "activeTab", value: tab })
            }
          />

          <Spacer height="30px" />

          {totalErrors === 0 ? (
            <>
              <Spacer height="25px" />
              <SuccessMessage />
            </>
          ) : (
            <ErrorsList
              items={
                errors
                  ? errors[
                      (settings?.workspace?.activeTab as
                        | "open"
                        | "fixed"
                        | "skipped") || "open"
                    ]
                  : []
              }
            />
          )}
        </>
      )}
    </>
  );
}
