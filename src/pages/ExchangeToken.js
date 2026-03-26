import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ExchangeToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) {
      console.error("No code in URL");
      return;
    }

    fetch(`/api/exchange_token?code=${code}`)
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          // Success, go back to home
          navigate("/");
        } else {
          console.error("Failed to exchange token", data);
        }
      })
      .catch(err => console.error(err));
  }, [navigate]);

  return <div style={{ textAlign: "center", marginTop: "50px" }}>Connecting Strava...</div>;
}