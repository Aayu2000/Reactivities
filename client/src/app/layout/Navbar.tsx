import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, Container, LinearProgress, Typography } from '@mui/material';
import { Group } from '@mui/icons-material';
import { NavLink } from 'react-router';
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';

export default function Navbar() {
  const {uiStore} = useStore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
        position: 'relative',
      }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

            {/* Left Side: Logo and Navigation Links */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>

              {/* Logo Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Group fontSize="large" />
                <Button 
                  component={NavLink} 
                  to="/" 
                  sx={{ fontSize: '1rem', textTransform: 'uppercase', fontWeight: 'bold', color: 'inherit' }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>
                    Reactivities
                  </Typography>
                </Button>
              </Box>

              {/* Nav Links Section */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button 
                  component={NavLink} 
                  to="/activities" 
                  sx={{ 
                    fontSize: '1.1rem', 
                    textTransform: 'uppercase', 
                    fontWeight: 'bold', 
                    color: 'white',
                    '&.active': {
                      color: 'yellow',
                    }
                  }}
                >
                  Activities
                </Button>
                
                <Button 
                  component={NavLink} 
                  to="/createActivity" 
                  sx={{ 
                    fontSize: '1.1rem', 
                    textTransform: 'uppercase', 
                    fontWeight: 'bold', 
                    color: 'white',
                    '&.active': {
                      color: 'yellow',
                    }
                  }}
                >
                  Create Activity
                </Button>
                <Button 
                  component={NavLink} 
                  to="/counter" 
                  sx={{ 
                    fontSize: '1.1rem', 
                    textTransform: 'uppercase', 
                    fontWeight: 'bold', 
                    color: 'white',
                    '&.active': {
                      color: 'yellow',
                    }
                  }}
                >
                  Counter
                </Button>
                <Button 
                  component={NavLink} 
                  to="/errors" 
                  sx={{ 
                    fontSize: '1.1rem', 
                    textTransform: 'uppercase', 
                    fontWeight: 'bold', 
                    color: 'white',
                    '&.active': {
                      color: 'yellow',
                    }
                  }}
                >
                  Errors
                </Button>
              </Box>
            </Box>

            {/* Right Side: Action Button */}
            <Button size="large" variant="contained" color='warning' sx={{ fontWeight: 'bold' }}>
              User Menu
            </Button>

          </Toolbar>
        </Container>
        
        <Observer>
          {() => uiStore.isLoading ? (
            <LinearProgress color="secondary" sx={{ position: 'absolute',bottom:0, left: 0, right: 0,height: 4 }} />
          ): null}
        </Observer>
      </AppBar>
    </Box>
  );
}