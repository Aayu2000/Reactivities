import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivites";


type Props = {
    activity?: Activity
    closeForm: () => void
    //commented after using react query
    //submitForm: (activity: Activity) => void;
}


export default function ActivityForm({ activity, closeForm }: Props) {
    //commented after using react query
    //submitForm 


    const { updateActivity, createActivity } = useActivities();

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        // logic to create or update activity
        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value;
        });
        if (activity) {
            data.id = activity.id
            await updateActivity.mutateAsync(data as unknown as Activity);
            closeForm();
        } else {
            await createActivity.mutateAsync(data as unknown as Activity);
            closeForm();
        }

        //commented after using react query
        //submitForm(data as unknown as Activity);
    }

    return (
        <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                Create Activity
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} onSubmit={handleSubmit}>
                <TextField name="title" label="Title" variant="outlined" defaultValue={activity?.title} />
                <TextField name="description" label="Description" variant="outlined" multiline rows={3} defaultValue={activity?.description} />
                <TextField name="category" label="Category" variant="outlined" defaultValue={activity?.category} />
                <TextField name="date" label="Date" type="date" variant="outlined"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0]
                        : new Date().toISOString().split('T')[0]

                    }
                />
                <TextField name="city" label="City" variant="outlined" defaultValue={activity?.city} />
                <TextField name="venue" label="Venue" variant="outlined" defaultValue={activity?.venue} />
                <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
                    <Button onClick={closeForm} variant="contained" color="inherit">
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