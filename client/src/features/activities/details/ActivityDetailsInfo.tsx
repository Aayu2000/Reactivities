import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Divider, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { formatDate } from "../../../lib/util/util";

type Props = {
    activity: Activity
}

export default function ActivityDetailsInfo({ activity }: Props) {
    return (
        <Paper sx={{ mb: 2 }}>
    {/* Section 1: Description */}
    <Grid container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
        <Grid size={1}>
            <Info color="info" fontSize="large" />
        </Grid>
        <Grid size={11}>
            <Typography>{activity.description}</Typography>
        </Grid>
    </Grid>
    
    <Divider />
    
    {/* Section 2: Date and Time */}
    <Grid container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
        <Grid size={1}>
            <CalendarToday color="info" fontSize="large" />
        </Grid>
        <Grid size={11}>
            <Typography>{formatDate(activity.date)}</Typography>
        </Grid>
    </Grid>
    
    <Divider />

    {/* Section 3: Venue and City */}
    <Grid container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
        <Grid size={1}>
            <Place color="info" fontSize="large" />
        </Grid>
        <Grid size={11}>
            <Typography>
                {activity.venue} -- {activity.city}
            </Typography>
        </Grid>
    </Grid>
</Paper>
    )
}