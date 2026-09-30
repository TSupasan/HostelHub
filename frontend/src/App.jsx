import { useEffect, useState } from "react";
import { checkBackend } from "./services/api";

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
      <p>{message}</p>
    </div>
  );
}

export default App;