// /pages/ExchangeToken.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ExchangeToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    fetch(`/api/exchange_token?code=${code}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          navigate("/"); // Go back to Home
        } else {
          console.error("Failed to exchange token", data);
        }
      })
      .catch(err => console.error(err));
  }, [navigate]);

  return <div>Connecting Strava...</div>;
}