import { useEffect, useState } from "react"
import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);

  }

  const handleFormClose = () => {
    setEditMode(false);
  }


  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setSelectedActivity(activity);
      setActivities(activities.map(a => a.id === activity.id ? activity : a));
    }else {
      const newActivity = {...activity, id: activities.length.toString() } 
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity ]);
    }
    setEditMode(false);
  }


  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  }


  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh', pb: 5 }}>
        {/* used to remove default styling of Navbar  */}
        <CssBaseline />
        <Navbar openForm={handleOpenForm} />
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          <ActivityDashboard activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm ={handleFormClose}
            submitForm={handleSubmitForm}
            deleteActivity={handleDeleteActivity}
          />
        </Container>
      </Box>
    </>
  )
}

export default App
