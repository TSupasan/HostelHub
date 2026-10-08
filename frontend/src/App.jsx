import { useEffect, useState } from "react";
import { checkBackend } from "./services/api";
import HostelAdminDashboard from './pages/HostelAdminDashboard';

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    checkBackend()
      .then((data) => {
        setMessage(data.message);
      })
      .catch(() => {
        setMessage("Backend connection failed");
      });
  }, []);

  return (
    <div>
      <h1>HostelHub</h1>
      <HostelAdminDashboard />
      <p>{message}</p>
    </div>
  );
}

export default App;