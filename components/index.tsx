import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import styled from "styled-components";

import { useVSCode } from "./src/providers/vscode";
import { OverviewScreen } from "./src/screens/overview";
import { DetailsScreen } from "./src/screens/details";
import { SettingsScreen } from "./src/screens/settings";

const Container = styled.div`
  --vscode-custom-input-height: 28px;

  line-height: 1.4;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
  }

  a {
    text-decoration: none;
  }
`;

function Router() {
  // TODO: add error handling
  // https://github.com/julianburr/vscode-bugsnag-stepthrough/issues/5
  const { loading } = useVSCode();

  if (loading) {
    return null;
  }

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<OverviewScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
          <Route path="details/:id" element={<DetailsScreen />} />
        </Route>
      </Routes>
    </Container>
  );
}

export function Root() {
  return (
    <MemoryRouter>
      <Router />
    </MemoryRouter>
  );
}
