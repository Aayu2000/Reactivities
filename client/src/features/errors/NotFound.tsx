import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router";

export default function NotFound() {
    
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                    textAlign: "center",
                    px: 3,
                }}
            >
                {/* Large Styled 404 Header */}
                <Typography
                    variant="h1"
                    
                    sx={{
                        fontSize: { xs: "6rem", sm: "10rem" },
                        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 1,
                        lineHeight: 1,
                        fontWeight:"900"
                    }}
                >
                    404
                </Typography>

                {/* Primary Message */}
                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem",fontWeight:"bold" } }}
                >
                    Oops! Page Not Found
                </Typography>

                {/* Secondary Clarifying Message */}
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: "480px", mb: 4 }}
                >
                    The page you are looking for might have been removed, had its name changed,
                    or is temporarily unavailable. Let's get you back on track.
                </Typography>

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: { xs: "column", sm: "row" },
                        width: { xs: "100%", sm: "auto" }
                    }}
                >
                    {/* Go Back Button */}
                    <Button
                        component={NavLink}
                        to="/activities"
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<ArrowBackIcon />}
                        sx={{ borderRadius: 2, px: 3 }}
                    >
                        Go Back
                    </Button>

                    {/* Home Button */}
                    <Button
                        component={NavLink}
                        to='/'
                        variant="contained"
                        color="primary"
                        size="large"
                        href="/" // Change to your routing link, e.g., component={Link} to="/" if using react-router
                        sx={{
                            borderRadius: 2,
                            px: 4,
                            boxShadow: "0px 4px 20px rgba(33, 150, 243, 0.3)"
                        }}
                    >
                        Take Me Home
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}