import { useEffect, useState } from "react"
import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))

    return () => { }
  }, [])

  return (
    <>
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh', pb: 5 }}>
      {/* used to remove default styling of Navbar  */}
      <CssBaseline />
      <Navbar />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
       <ActivityDashboard activities={activities}/>
      </Container>
    </Box>
    </>
  )
}

export default App
