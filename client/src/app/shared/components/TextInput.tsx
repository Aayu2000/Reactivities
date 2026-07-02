import { useState } from "react";
import { TextField, type TextFieldProps, IconButton, InputAdornment } from "@mui/material";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps;

export default function TextInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });
    
    // 1. Manage visibility toggling locally inside the field context
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = props.type === "password";
    
    // 2. Dynamically calculate the active text visibility layout state
    const dynamicType = isPasswordType ? (showPassword ? "text" : "password") : props.type;

    return (
        <TextField 
            {...props}
            {...field}
            type={dynamicType} // Swaps type between 'text' and 'password' on the fly
            value={field.value || ''}
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            
            // 3. Inject the toggle button seamlessly using modern slotProps layout
            slotProps={{
                input: {
                    endAdornment: isPasswordType ? (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={(e) => e.preventDefault()} // Prevents the text field from losing focus
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ) : undefined
                }
            }}
        />
    );
}