// /api/exchange_token.js
import cookie from "cookie";

export default async function handler(req, res) {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).json({ success: false, error: "Authorization code missing" });

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
    });

    const response = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      body: params,
    });
    const data = await response.json();

    if (!data.access_token) return res.status(400).json({ success: false, error: "Failed to get access token" });

    // Set HTTP-only cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("strava_token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: data.expires_at - Math.floor(Date.now() / 1000),
        path: "/",
        sameSite: "lax",
      })
    );

    return res.status(200).json({ success: true }); // important: success always present
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
}


// // /api/exchange_token.js
// import cookie from "cookie";

// export default async function handler(req, res) {
//   try {
//     const code = req.query.code;
//     if (!code) return res.status(400).json({ error: "Authorization code missing" });

//     const clientId = process.env.CLIENT_ID;
//     const clientSecret = process.env.CLIENT_SECRET;

//     const params = new URLSearchParams({
//       client_id: clientId,
//       client_secret: clientSecret,
//       code,
//       grant_type: "authorization_code",
//     });

//     const response = await fetch("https://www.strava.com/oauth/token", {
//       method: "POST",
//       body: params,
//     });
//     const data = await response.json();

//     if (!data.access_token) return res.status(400).json({ error: "Failed to get access token" });

//     // Set HTTP-only cookie
//     res.setHeader(
//       "Set-Cookie",
//       cookie.serialize("strava_token", data.access_token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: data.expires_at - Math.floor(Date.now() / 1000), // expires in seconds
//         path: "/",
//         sameSite: "lax",
//       })
//     );

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// }




// import cookie from "cookie";

// export default async function handler(req, res) {
//   const code = req.query.code;
//   const clientId = process.env.CLIENT_ID;
//   const clientSecret = process.env.CLIENT_SECRET;

//   const params = new URLSearchParams({
//     client_id: clientId,
//     client_secret: clientSecret,
//     code,
//     grant_type: "authorization_code",
//   });

//   const response = await fetch("https://www.strava.com/oauth/token", {
//     method: "POST",
//     body: params,
//   });
//   const data = await response.json();

//   if (data.access_token) {
//     res.setHeader(
//       "Set-Cookie",
//       cookie.serialize("strava_token", data.access_token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: data.expires_at - Math.floor(Date.now() / 1000), // seconds until expiration
//         path: "/",
//         sameSite: "lax",
//       })
//     );
//   }

//   res.status(200).json({ success: !!data.access_token });
// }



// /*--deprecated--*/
// // /api/exchange_token.js
// export default async function handler(req, res) {
//   try {
//     const code = req.query.code;

//     if (!code) {
//       return res.status(400).json({ error: "Authorization code missing" });
//     }

//     const clientId = process.env.CLIENT_ID;           // Public
//     const clientSecret = process.env.CLIENT_SECRET;   // Sensitive (hidden in Vercel)

//     const params = new URLSearchParams({
//       client_id: clientId,
//       client_secret: clientSecret,
//       code,
//       grant_type: "authorization_code",
//     });

//     const response = await fetch("https://www.strava.com/oauth/token", {
//       method: "POST",
//       body: params,
//     });

//     const data = await response.json();
//     return res.status(200).json(data); // Contains access_token, refresh_token, expires_at
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Server error" });
//   }
// }