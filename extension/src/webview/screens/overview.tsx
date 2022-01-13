import React from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../hooks/settings";

export function OverviewScreen() {
  const { settings } = useSettings();

  if (!settings?.global?.tokens?.length) {
    // Show message if no global tokens have been set yet
    return (
      <>
        <p>You are not connected to any Bugsnag accounts yet.</p>
        <Link to="/settings">Go to settings</Link>
      </>
    );
  }

  if (!settings?.workspace?.projects?.length) {
    // Show message if no projects have been selected for the current
    // workspace yet
    return (
      <>
        <p>You have not selected any projects for this workspace yet.</p>
        <Link to="/settings">Go to settings</Link>
      </>
    );
  }

  return (
    <>
      <h1>Overview</h1>
      <p>
        <Link to="/settings">Settings</Link>
      </p>

      <p>
        <label>Show errors from</label>
        <select name="timeframe">
          <option value="today">Today</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      </p>

      <p>
        <label>Sort errors by</label>
        <select name="sort">
          <option value="instances"># of instances</option>
          <option value="users"># of affected users</option>
          <option value="lastseen">Most recently seen</option>
        </select>
      </p>

      <p>
        33 errors
        <br />
        12 skipped errors
        <br />8 marked as resolved
      </p>

      <p>
        <Link to="/details/1">Start stepthrough</Link>
      </p>
      <p>
        or click on any of the errors below to start the stepthrough from that
        particular item
      </p>

      <ul>
        <li>
          <Link to="/details/1">Example Error #1</Link>
        </li>
      </ul>
    </>
  );
}
