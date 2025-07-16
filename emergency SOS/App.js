import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Press the SOS button if you're in danger.");

  const sendSOS = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser.");
      return;
    }

    setStatus("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setStatus("Sending SOS...");

        try {
          await axios.post("http://localhost:5000/sos", {
            lat: latitude,
            lon: longitude,
          });

          setStatus("✅ SOS sent successfully!");
        } catch (error) {
          console.error(error);
          setStatus("❌ Failed to send SOS.");
        }
      },
      () => {
        setStatus("Unable to retrieve your location.");
      }
    );
  };

  return (
    <div className="container">
      <h1>🚨 Emergency SOS</h1>
      <button onClick={sendSOS}>Send SOS</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
