import { useEffect, useState } from "react";
import { checkBackend } from "./services/api";
import HostelAdminDashboard from './pages/HostelAdminDashboard';
import './App.css'

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
      <HostelAdminDashboard/>
    </div>
  );
}

export default App;