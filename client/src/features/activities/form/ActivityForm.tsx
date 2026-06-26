import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useActivities } from "../../../lib/hooks/useActivites";
import { useNavigate, useParams } from "react-router";
import { useForm } from 'react-hook-form';
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";


export default function ActivityForm() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    const { control, reset, handleSubmit } = useForm<ActivitySchema>({
        resolver: zodResolver(activitySchema),
        mode: 'onTouched',
        defaultValues: {
            // 🌟 CRUCIAL: Safely instantiate the string to a real Date object
            date: activity?.date ? new Date(activity.date) : undefined
        }
    });

    useEffect(() => {
        if (activity) {
            reset({
                ...activity,
                // 🌟 THE FIX: Map the incoming ISO string back into a real Date object instance
                date: activity.date ? new Date(activity.date) : undefined,
                location: {
                    city: activity.city,
                    venue: activity.venue,
                    latitude: activity.latitude,
                    longitude: activity.longitude
                }
            });
        }
    }, [activity, reset]);

    const onSubmit = async (data: ActivitySchema) => {
        const { location, ...rest } = data;
        const flattenedData = { ...rest, ...location }

        try {
            if (activity) {
                updateActivity.mutate({ ...activity, ...flattenedData }, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                })
            } else {
                createActivity.mutate(flattenedData, {
                    onSuccess: (id) => navigate(`/activities/${id}`)
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    if (isLoadingActivity) return <Typography variant="h5">Loading Activity...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} onSubmit={handleSubmit(onSubmit)}>

                <TextInput label='Title' control={control} name='title' />
                <TextInput label='Description' control={control} name='description' multiline rows={3} />
                <Box sx={{ display: "flex", gap: 3 }}>
                    <SelectInput items={categoryOptions}
                        label='Category'
                        control={control}
                        name='category' />
                    <DateTimeInput label='Date' control={control} name='date' />
                </Box>

                <LocationInput control={control} label='Enter the location' name='location' />


                <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
                    <Button variant="contained" color="inherit">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained" color="success"
                        disabled={updateActivity.isPending || createActivity.isPending}>
                        Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}

