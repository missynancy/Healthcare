import React from "react";
import SymptomTracker from "../components/SymptomsTracker";
import MedicationManager from "../components/MedicationManagement";
import AppointmentScheduler from "../components/AppointmentScheduler";
import HealthTips from "../components/HealthTips";

function Dashboard(){
 return(
    <div style={{padding: '20px'}}>
        <h1>ChronicCare Dashboard</h1>
        <div>
            <SymptomTracker/>
            <MedicationManager />
            <AppointmentScheduler/>
            <HealthTips/>
        </div>
    </div>
 );
}

export default Dashboard;