import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, Container, Typography } from '@mui/material';
import { Group } from '@mui/icons-material';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
      }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

            {/* Left Side: Logo and Navigation Links */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>

              {/* Logo Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Group fontSize="large" />
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>
                  Reactivities
                </Typography>
              </Box>

              {/* Nav Links Section */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button sx={{ fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: 'bold', color: 'inherit' }}>
                  Activities
                </Button>
                <Button sx={{ fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: 'bold', color: 'inherit' }}>
                  About
                </Button>
                <Button sx={{ fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: 'bold', color: 'inherit' }}>
                  Contact
                </Button>
              </Box>
            </Box>

            {/* Right Side: Action Button */}
            <Button size="large" variant="contained" color='warning' sx={{ fontWeight: 'bold' }}>
              Create Activity
            </Button>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
