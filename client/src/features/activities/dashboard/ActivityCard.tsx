import { Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivites";
import { Link } from "react-router";

type Props = {
    activity: Activity
    
    //commented after using react query
    //deleteActivity: (id: string) => void
}


export default function ActivityCard({ activity}: Props) {

    const {deleteActivity} = useActivities();
    return (
        <Paper
            elevation={1}
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    boxShadow: 4,
                    borderColor: 'primary.main'
                }
            }}
        >
            <Box sx={{ p: 2.5 }}>
                {/* Title */}
                <Typography variant="h5" sx={{ fontWeight: 500, mb: 0.5 }}>
                    {activity.title}
                </Typography>

                {/* ISO Date String */}
                <Typography variant="body2" color="text.secondary">
                    {activity.date}
                </Typography>

                {/* Relative Time Text */}
                <Typography variant="body2" sx={{ mt: 1.5, mb: 0.5 }}>
                    {activity.description} {/* logic for '6 months in future' goes here */}
                </Typography>

                {/* Full Address/Venue String */}
                <Typography variant="body2" color="text.primary">
                    {activity.city} / {activity.venue}
                </Typography>
            </Box>

            <Divider variant="fullWidth" />

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2.5,
                py: 1.5,
                bgcolor: 'background.paper'
            }}>
                <Chip
                    label={activity.category}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1.5, px: 0.5 }}
                />
                <Stack direction="row" spacing={2}>
                <Button
                    component={Link}
                    to={`/activities/${activity.id}`}
                    variant="contained"
                    size="medium"
                    sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        minWidth: 80
                    }}
                >
                    View
                </Button>
                <Button
                onClick={()=>deleteActivity.mutate(activity.id)}
                    disabled={deleteActivity.isPending}
                    variant="contained"
                    color="error"
                    size="medium"
                    sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        minWidth: 80
                    }}
                >
                    Delete
                </Button>
                </Stack>
            </Box>
        </Paper>

    )
}