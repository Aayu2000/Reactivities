import { useState } from "react"
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivites";


function App() {
  //after using react query
  //const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activities,isPending} = useActivities();
  

  //commented after using react query
  // useEffect(() => {
  //   axios.get<Activity[]>('https://localhost:5001/api/activities')
  //     .then(response => setActivities(response.data))
  // }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(a => a.id === id));
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

  //commented after using react query
  // const handleSubmitForm = (activity: Activity) => {
  //   if (activity.id) {
  //     setSelectedActivity(activity);
  //     setActivities(activities.map(a => a.id === activity.id ? activity : a));
  //   }else {
  //     const newActivity = {...activity, id: activities.length.toString() } 
  //     setSelectedActivity(newActivity);
  //     setActivities([...activities, newActivity ]);
  //   }
  //   console.log(activity);
  //   setEditMode(false);
  // }

  //commented after using react query
  // const handleDeleteActivity = (id: string) => {
  //   console.log(id);
  // }


  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh', pb: 5 }}>
        {/* used to remove default styling of Navbar  */}
        <CssBaseline />
        <Navbar openForm={handleOpenForm} />
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          {!activities || isPending ? (
            <Typography>Loading activities...</Typography>
          ) : (
            <ActivityDashboard activities={activities}
              selectActivity={handleSelectActivity}
              cancelSelectActivity={handleCancelSelectActivity}
              selectedActivity={selectedActivity}
              editMode={editMode}
              openForm={handleOpenForm}
              closeForm={handleFormClose}
              //commented after using react query
              //submitForm={handleSubmitForm}
              //deleteActivity={handleDeleteActivity}
            />
          )}

        </Container>
      </Box>
    </>
  )
}

export default App
