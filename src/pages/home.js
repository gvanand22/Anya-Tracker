// pages/Home.js
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faPersonWalkingDashedLineArrowRight, faFire, faShoePrints, faArrowsSpin } from "@fortawesome/free-solid-svg-icons";

function Home() {
    const [stats, setStats] = useState({
        distance: 0,
        duration: 0,
        calories: 0,
        steps: 0,
        streak: 0,
        date: new Date(),
    });

    // Connect Strava button
    const connectStrava = () => {
        const clientId = process.env.REACT_APP_CLIENT_ID; // Vercel environment
        if (!clientId) {
            alert("Client ID is missing. Please set REACT_APP_CLIENT_ID in Vercel.");
            return;
        }

        const redirectUri = "https://anya-tracker.vercel.app/exchange_token";
        const scope = "activity:read_all";
        const approvalPrompt = "force";

        window.location.href =
            `https://www.strava.com/oauth/authorize?client_id=${clientId}` +
            `&response_type=code&redirect_uri=${redirectUri}` +
            `&approval_prompt=${approvalPrompt}&scope=${scope}`;
    };

    useEffect(() => {
        fetch("/api/activities")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length) {
                    const today = new Date().toDateString();

                    // Filter only today's activities
                    const todayActivities = data.filter(
                        act => new Date(act.start_date_local).toDateString() === today
                    );

                    // Sum today's stats safely
                    const totalDistance = todayActivities.reduce((sum, act) => sum + (act.distance || 0) / 1000, 0); // km
                    const totalDuration = todayActivities.reduce((sum, act) => sum + (act.elapsed_time || 0) / 60, 0); // mins
                    //const totalCalories = todayActivities.reduce((sum, act) => sum + (act.calories || 0), 0);
                    //const totalSteps = todayActivities.reduce((sum, act) => sum + (act.hasOwnProperty('steps') ? act.steps : 0), 0);


                    // Estimate calories and steps if missing
                    const totalCalories = todayActivities.reduce((sum, act) => {
                        if (act.calories) return sum + act.calories;
                        // Estimate: assume weight 85kg
                        return sum + 85 * (act.distance / 1000) * 1.036;
                    }, 0);

                    const totalSteps = todayActivities.reduce((sum, act) => {
                        if (act.steps) return sum + act.steps;
                        // Estimate steps: distance in meters / 0.8
                        return sum + (act.distance || 0) / 0.8;
                    }, 0);

                    // Compute overall streak
                    let streak = 0;
                    const sortedDates = data
                        .map(act => new Date(act.start_date_local).toDateString())
                        .sort((a, b) => new Date(b) - new Date(a));
                    let lastDate = new Date();
                    for (const day of sortedDates) {
                        const current = new Date(day);
                        const diff = (lastDate - current) / (1000 * 60 * 60 * 24);
                        if (diff <= 1) streak += 1;
                        else break;
                        lastDate = current;
                    }

                    setStats({
                        distance: totalDistance.toFixed(2),
                        duration: totalDuration.toFixed(0),
                        calories: totalCalories.toFixed(0),
                        steps: totalSteps,
                        streak,
                        date: new Date(),
                    });
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="Home">
            <div className="connect-strava" style={{ textAlign: "center", margin: "20px 0" }}>
                <button
                    onClick={connectStrava}
                    style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
                >
                    Connect Strava
                </button>
            </div>

            <main>
                <div className="tab_Grp" id="tab-Grp">
                    <section className="tab_One">
                        <h2 className="dis_Tot">
                            <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} />
                            <span>{stats.distance}</span> Kms
                        </h2>
                        <hr />
                        <h4>Total Distance (Today)</h4>
                    </section>

                    <section className="tab_Two">
                        <h2 className="tim_Tot">
                            <FontAwesomeIcon icon={faClock} />
                            <span>{stats.duration}</span> Mins
                        </h2>
                        <hr />
                        <h4>Total Duration (Today)</h4>
                    </section>

                    <section className="tab_Thr">
                        <h2 className="cal_Tot">
                            <FontAwesomeIcon icon={faFire} />
                            <span>{stats.calories}</span> Kcal
                        </h2>
                        <hr />
                        <h4>Calories (Today)</h4>
                    </section>

                    <section className="tab_For">
                        <h2 className="stp_Tot">
                            <FontAwesomeIcon icon={faShoePrints} />
                            <span>{stats.steps}</span> Steps
                        </h2>
                        <hr />
                        <h4>Steps (Today)</h4>
                    </section>

                    <section className="tab_Fiv">
                        <h2 className="dat_Whl">
                            <FontAwesomeIcon icon={faCalendarDays} />
                            <span>{stats.date.toDateString()}</span>
                        </h2>
                        <h4>{stats.date.toLocaleDateString('en-US', { weekday: 'long' })}</h4>
                    </section>

                    <section className="tab_Six">
                        <h2 className="str_Tot">
                            <FontAwesomeIcon icon={faArrowsSpin} />
                            <span>{stats.streak}</span> Days
                        </h2>
                        <hr />
                        <h4>Active Streak</h4>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Home;

// --DEPRECATED
// //home.js
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClock, faCalendarDays } from "@fortawesome/free-regular-svg-icons"
// import { faPersonWalkingDashedLineArrowRight, faFire, faShoePrints, faArrowsSpin } from "@fortawesome/free-solid-svg-icons";
// import { useEffect, useState } from "react";
// function Home() {
//     const [stats, setStats] = useState({
//         distance: 0,
//         duration: 0,
//         calories: 0,
//         steps: 0,
//         streak: 0,
//         date: new Date()
//     });

//     const connectStrava = () => {
//         const clientId = process.env.REACT_APP_CLIENT_ID; // Read from Vercel environment
//         if (!clientId) {
//             alert("Client ID is missing. Please set REACT_APP_CLIENT_ID in Vercel.");
//             return;
//         }

//         const redirectUri = "https://anya-tracker.vercel.app/exchange_token";
//         const scope = "activity:read_all";
//         const approvalPrompt = "force";

//         window.location.href =
//             `https://www.strava.com/oauth/authorize?client_id=${clientId}` +
//             `&response_type=code&redirect_uri=${redirectUri}` +
//             `&approval_prompt=${approvalPrompt}&scope=${scope}`;
//     };

//     // copied code starts
//     useEffect(() => {
//         fetch("/api/activities")
//             .then(res => res.json())
//             .then(data => {
//                 if (Array.isArray(data) && data.length) {
//                     const totalDistance = data.reduce((sum, act) => sum + act.distance / 1000, 0); // km
//                     const totalDuration = data.reduce((sum, act) => sum + act.elapsed_time / 60, 0); // mins
//                     const totalCalories = data.reduce((sum, act) => sum + (act.calories || 0), 0); // kcal
//                     const totalSteps = data.reduce((sum, act) => sum + (act.steps || 0), 0); // steps

//                     // Compute streak: consecutive days with activity
//                     let streak = 0;
//                     const sorted = data
//                         .map(act => new Date(act.start_date_local).toDateString())
//                         .sort((a, b) => new Date(b) - new Date(a));
//                     let lastDate = new Date();
//                     for (const day of sorted) {
//                         const current = new Date(day);
//                         const diff = (lastDate - current) / (1000 * 60 * 60 * 24);
//                         if (diff <= 1) streak += 1;
//                         else break;
//                         lastDate = current;
//                     }

//                     setStats({
//                         distance: totalDistance.toFixed(2),
//                         duration: totalDuration.toFixed(0),
//                         calories: totalCalories.toFixed(0),
//                         steps: totalSteps,
//                         streak,
//                         date: new Date()
//                     });
//                 }
//             })
//             .catch(err => console.error(err));
//     }, []);

//     // copied code ends

//     return (
//         <div className="Home">
//             <div className="connect-strava" style={{ textAlign: "center", margin: "20px 0" }}>
//                 <button onClick={connectStrava}
//                     style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
//                 >
//                     Connect Strava
//                 </button>
//             </div>
//             <main>
//                 <div className="tab_Grp" id="tab-Grp">
//                     <section className="tab_One" id="tab-One">
//                         <h2 className="dis_Tot" id="dis-Tot">
//                             <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} />
//                             <span>{stats.distance}</span> Kms
//                         </h2>
//                         <hr />
//                         <h4>Total Distance</h4>
//                     </section>
//                     <section className="tab_Two" id="tab-Two">
//                         <h2 className="tim_Tot" id="tim-Tot">
//                             <FontAwesomeIcon icon={faClock} />
//                             <span>{stats.duration}</span> Mins
//                         </h2>
//                         <hr />
//                         <h4>Total Duration</h4>
//                     </section>
//                     <section className="tab_Thr" id="tab-Thr">
//                         <h2 className="cal_Tot" id="cal-Tot">
//                             <FontAwesomeIcon icon={faFire} />
//                             <span>{stats.calories}</span> Kcal
//                         </h2>
//                         <hr />
//                         <h4>Total Calories</h4>
//                     </section>
//                     <section className="tab_For" id="tab-For">
//                         <h2 className="stp_Tot" id="stp-Tot">
//                             <FontAwesomeIcon icon={faShoePrints} />
//                             <span>{stats.steps}</span> Steps
//                         </h2>
//                         <hr />
//                         <h4>Total Steps</h4>
//                     </section>
//                     <section className="tab_Fiv" id="tab-Fiv">
//                         <h2 className="dat_Whl" id="dat-Whl">
//                             <FontAwesomeIcon icon={faCalendarDays} />
//                             <span className="dat_Tod" id="dat-Tod">{stats.date.toDateString()}</span>
//                         </h2>
//                         <h4 className="day_Tod" id="day-Tod">{stats.date.toLocaleDateString('en-US', { weekday: 'long' })}</h4>
//                     </section>
//                     <section className="tab_Six" id="tab-Six">
//                         <h2 className="str_Tot" id="str-Tot">
//                             <FontAwesomeIcon icon={faArrowsSpin} />
//                             <span>{stats.streak}</span> Days
//                         </h2>
//                         <hr />
//                         <h4>Active Streak</h4>
//                     </section>
//                 </div>
//                 <div className="grh_Tab" id="grh-Tab">
//                     <div className="grh_One">
//                         <h2>Weekly Distance</h2>
//                     </div>
//                     <div className="grh_Two">
//                         <h2>Pace Trend</h2>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     )

// }
// export default Home;