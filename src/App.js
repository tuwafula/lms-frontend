import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Members from "./pages/Members";
import Transactions from "./pages/Transactions";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./ui/PageNotFound";
// import Dashboard from "./pages/Dashboard";
// import Dashboard from "./pages/Dashboard";
// import Dashboard from "./pages/Dashboard";
// import Dashboard from "./pages/Dashboard";
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="books" element={<Books />} />
            <Route path="members" element={<Members />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
