function Home() {
    return(
        <div className="Home">
            <main>
                <sec className="tab_Grp" id="tab-Grp">
                    <tab className="tab_One" id="tab-One">
                        <h2 className="dis_Tot" id="dis-Tot"></h2>
                        <hr/>
                        <h4>Total Distance</h4>
                    </tab>
                    <tab className="tab_One" id="tab-One">
                        <h2 className="tim_Tot" id="tim-Tot"></h2>
                        <hr/>
                        <h4>Total Duration</h4>
                    </tab>
                    <tab className="tab_One" id="tab-One">
                        <h2 className="cal_Tot" id="cal-Tot"></h2>
                        <hr/>
                        <h4>Total Calories</h4>
                    </tab>
                    <tab className="tab_One" id="tab-One">
                        <h2 className="stp_Tot" id="stp-Tot"></h2>
                        <hr/>
                        <h4>Total Steps</h4>
                    </tab>
                    <tab className="tab_One" id="tab-One">
                        <h2 className="dat_Tod" id="dat-Tod"></h2>
                        <h4 className="day_Tod" id="day-Tod"></h4>
                    </tab>
                    <tab className="tab_One" id="tab-One">
                        <h2 className="str_Tot" id="str-Tot"></h2>
                        <hr/>
                        <h4>Active Streak</h4>
                    </tab>
                </sec>
            </main>
        </div>
    )
    
}
export default Home;