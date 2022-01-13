import React from "react";
import { render } from "react-dom";
import { HashRouter, Routes, Route, Outlet } from "react-router-dom";

import { SettingsProvider, useSettings } from "./hooks/settings";
import { DetailsScreen } from "./screens/details";
import { OverviewScreen } from "./screens/overview";
import { SettingsScreen } from "./screens/settings";

function Panel() {
  const { loading, error } = useSettings();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>Oops... something went wrong while trying to load your settings!</p>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<OverviewScreen />} />
        <Route path="settings" element={<SettingsScreen />} />
        <Route path="details/:id" element={<DetailsScreen />} />
      </Route>
    </Routes>
  );
}

render(
  <SettingsProvider>
    <HashRouter>
      <Panel />
    </HashRouter>
  </SettingsProvider>,
  window.document.getElementById("app")
);
