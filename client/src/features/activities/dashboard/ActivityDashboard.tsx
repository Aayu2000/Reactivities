import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    selectedActivity?: Activity;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;
    //commented after using react query
    //submitForm: (activity: Activity) => void;
    //deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({ activities, cancelSelectActivity,
    selectedActivity,
    selectActivity,
    openForm,
    closeForm,
    editMode,
    //commented after using react query
    //submitForm,
    //deleteActivity 
}: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    //commented after using react query
                    //deleteActivity={deleteActivity}
                />
            </Grid>
            <Grid size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        selectedActivity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />}
                {editMode &&
                    <ActivityForm closeForm={closeForm}
                        activity={selectedActivity}
                    //commented after using react query
                    //submitForm={submitForm}
                    />}

            </Grid>
        </Grid>


    )
}