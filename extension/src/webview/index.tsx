import { render } from "react-dom";
import { HashRouter, Routes, Route, Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { SettingsProvider, useSettings } from "./hooks/use-settings";
import { DetailsScreen } from "./screens/details";
import { IntroScreen } from "./screens/intro";
import { OverviewScreen } from "./screens/overview";
import { SettingsScreen } from "./screens/settings";

const GlobalStyles = createGlobalStyle`
  :root {
    --vscode-custom-input-height: 28px;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  a:focus, input:focus, select:focus, textarea:focus {
    outline: none;
  }

  a {
    text-decoration: none;
  }
`;

function Panel() {
  const { loading, error } = useSettings();

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <IntroScreen
        message={
          <p>
            Oops... something went wrong while trying to load your settings!
          </p>
        }
      />
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
  <>
    <GlobalStyles />
    <SettingsProvider>
      <HashRouter>
        <Panel />
      </HashRouter>
    </SettingsProvider>
  </>,
  window.document.getElementById("app")
);
