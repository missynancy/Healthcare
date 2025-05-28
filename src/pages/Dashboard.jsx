import React from "react";
import SymptomTracker from "../components/SymptomsTracker";

function Dashboard(){
 return(
    <div style={{padding: '20px'}}>
        <h1>ChronicCare Dashboard</h1>
        <div>
            <SymptomTracker/>
        </div>
    </div>
 );
}

export default Dashboard;