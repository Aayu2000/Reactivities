import { Box, Button, Card, CardActions, CardContent, Chip, Divider, Paper, Stack, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivites";

type Props = {
    activity: Activity
    selectActivity: (id: string) => void
    //commented after using react query
    //deleteActivity: (id: string) => void
}


export default function ActivityCard({ activity, selectActivity,
    //commented after using react query 
    //deleteActivity 
}: Props) {

    const {deleteActivity} = useActivities();
    return (
        // <Card sx={{ borderRadius: 3 }}>
        //     <CardContent>
        //         <Typography variant="h5">{activity.title}</Typography>
        //         <Typography sx={{ color: 'text.secondary', mb: 1 }}>{activity.date}</Typography>
        //         <Typography variant="body2">{activity.description}</Typography>
        //         <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
        //     </CardContent>
        //     <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
        //         <Chip label={activity.category} variant="outlined" />
        //         <Button size="medium" variant="contained">View</Button>

        //     </CardActions>
        // </Card>
        //         

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
                onClick={()=>selectActivity(activity.id)}
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