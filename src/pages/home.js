import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarDays } from "@fortawesome/free-regular-svg-icons"
import { faPersonWalkingDashedLineArrowRight, faFire, faShoePrints, faArrowsSpin} from "@fortawesome/free-solid-svg-icons";
function Home() {
    return(
        <div className="Home">
            <main>
                <div className="tab_Grp" id="tab-Grp">
                    <section className="tab_One" id="tab-One">
                        <h2 className="dis_Tot" id="dis-Tot">
                            <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} />
                            <span>0</span> Kms
                        </h2>
                        <hr/>
                        <h4>Total Distance</h4>
                    </section>
                    <section className="tab_Two" id="tab-Two">
                        <h2 className="tim_Tot" id="tim-Tot">
                            <FontAwesomeIcon icon={faClock} />
                            <span>0</span> Mins
                        </h2>
                        <hr/>
                        <h4>Total Duration</h4>
                    </section>
                    <section className="tab_Thr" id="tab-Thr">
                        <h2 className="cal_Tot" id="cal-Tot">
                            <FontAwesomeIcon icon={faFire} />
                            <span>0</span> Kcal
                        </h2>
                        <hr/>
                        <h4>Total Calories</h4>
                    </section>
                    <section className="tab_For" id="tab-For">
                        <h2 className="stp_Tot" id="stp-Tot">
                            <FontAwesomeIcon icon={faShoePrints} />
                            <span>0</span> Steps
                        </h2>
                        <hr/>
                        <h4>Total Steps</h4>
                    </section>
                    <section className="tab_Fiv" id="tab-Fiv">
                        <h2 className="dat_Whl" id="dat-Whl">
                            <FontAwesomeIcon icon={faCalendarDays} />
                            <span className="dat_Tod" id="dat-Tod">Date</span>
                        </h2>
                        <h4 className="day_Tod" id="day-Tod">day</h4>
                    </section>
                    <section className="tab_Six" id="tab-Six">
                        <h2 className="str_Tot" id="str-Tot">
                            <FontAwesomeIcon icon={faArrowsSpin} />
                            <span>0</span> Days
                        </h2>
                        <hr/>
                        <h4>Active Streak</h4>
                    </section>
                </div>
                <div className="grh_Tab" id="grh-Tab">
                    <div className="grh_One">
                        <h2>Weekly Distance</h2>    
                    </div>
                    <div className="grh_Two">
                        <h2>Pace Trend</h2>
                    </div>                    
                </div>
            </main>
        </div>
    )
    
}
export default Home;