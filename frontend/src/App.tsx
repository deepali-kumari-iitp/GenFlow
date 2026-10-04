import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import WorkflowBuilderPage from "./pages/WorkflowBuilderPage";
import MyWorkflowsPage from "./pages/MyWorkflowsPage";
import SettingsPage from "./pages/SettingsPage";
import ExecutionsPage from "./pages/ExecutionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/builder"
          element={<WorkflowBuilderPage />}
        />
        <Route
  path="/workflows"
  element={<MyWorkflowsPage />}
/>

<Route
  path="/settings"
  element={<SettingsPage />}
/>
       <Route
  path="/executions"
  element={<ExecutionsPage />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;