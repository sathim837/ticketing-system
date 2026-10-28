import { Routes, Route, Navigate } from "react-router";

import UserLayout from "./layout/UserLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./Login";
import MyTickets from "./pages/MyTickets";
import CreateTicket from "./pages/CreateTicket";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<UserLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tickets" element={<MyTickets />} />
        <Route path="/tickets/create" element={<CreateTicket />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
