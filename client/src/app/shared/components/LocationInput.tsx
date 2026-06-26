import { useMemo, useState } from "react";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import type { LocationIQSuggestion } from "../../../lib/types";
import { Box, debounce, List, ListItemButton, TextField, Typography } from "@mui/material";
import axios from "axios";

type Props<T extends FieldValues> = {
    label: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    // Destructure to separate custom props from internal hook configs
    const { label, name, control, rules, defaultValue, shouldUnregister } = props;
    const { field, fieldState } = useController({ name, control, rules, defaultValue, shouldUnregister });

    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);

    // 1. DERIVE VALUE ON RENDER: No state, no useEffect, no linting errors.
    const displayValue = field.value && typeof field.value === 'object'
        ? (field.value.venue || '')
        : (field.value || '');

    const locationUrl = 'https://api.locationiq.com/v1/autocomplete?key=pk.3ddbf46354c18df53e49f92af3242db9&limit=5&dedupe=1&';

    const fetchSuggestions = useMemo(
        () => debounce(async (query: string) => {
            if (!query || query.length < 3) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const res = await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${query}`);
                setSuggestions(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }, 500), [locationUrl]
    );

    // 2. Clear out suggestions if field text is cleared out manually
    const handleChange = async (value: string) => {
        field.onChange(value); // Overwrites current object tracking state with text
        if (value.length < 3) {
            setSuggestions([]);
        } else {
            await fetchSuggestions(value);
        }
    };

    const handleSelect = (location: LocationIQSuggestion) => {
        const city = location.address?.city || location.address?.town || location.address?.village || '';
        const venue = location.display_name;
        const latitude = Number(location.lat);
        const longitude = Number(location.lon);

        // Sets the compound object data structure right back to React Hook Form
        field.onChange({ city, venue, latitude, longitude });
        setSuggestions([]);
    };

    return (
        <Box sx={{ position: "relative" }}>
            <TextField
                label={label}
                value={displayValue}
                onChange={e => handleChange(e.target.value)}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />

            {loading && <Typography sx={{ mt: 1, px: 1 }}>Loading...</Typography>}

            {suggestions.length > 0 && (
                <List
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                        position: 'absolute',
                        zIndex: 10,
                        width: '100%',
                        maxHeight: '250px',
                        overflowY: 'auto',
                        boxShadow: 3,
                        mt: 0.5
                    }}
                >
                    {suggestions.map(suggestion => (
                        <ListItemButton
                            divider
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion)}
                        >
                            {suggestion.display_name}
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    );
}