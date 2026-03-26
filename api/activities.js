// /api/activities.js
import cookie from "cookie";

export default async function handler(req, res) {
    try {
        const cookies = cookie.parse(req.headers.cookie || "");
        const token = cookies.strava_token;

        if (!token) return res.status(401).json({ error: "No token, please connect Strava" });

        const response = await fetch("https://www.strava.com/api/v3/athlete/activities", {
            headers: { Authorization: `Bearer ${token}` },
        });

        // 
        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }
        // 
        
        const activities = await response.json();
        res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// /*--deprecated--*/
// // /api/activities.js
// export default async function handler(req, res) {
//   try {
//     const token = req.query.token; // access_token from frontend
//     if (!token) {
//       return res.status(400).json({ error: "Access token missing" });
//     }

//     const response = await fetch("https://www.strava.com/api/v3/athlete/activities", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const activities = await response.json();
//     return res.status(200).json(activities);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Server error" });
//   }
// }