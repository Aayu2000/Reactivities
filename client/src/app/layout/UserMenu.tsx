import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useId, useState } from 'react';
import { Avatar, Box, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { useAccount } from '../../lib/hooks/useAccount';
import { NavLink } from 'react-router';
import { Add, Logout, Person } from '@mui/icons-material';

export default function UserMenu() {
    const { currentUser, logoutUser } = useAccount();
    const id = useId();

    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                size='large'
                color='inherit'
                sx={{ fontSize: '1.1rem' }}
                onClick={handleClick}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar />
                    {currentUser?.displayName}
                </Box>
            </Button>
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                // slotProps={{
                //     list: {
                //         'aria-labelledby': buttonId,
                //     },
                // }}
            >
                <MenuItem component={NavLink} to='/createActivity' onClick={handleClose}>
                <ListItemIcon>
                    <Add />
                </ListItemIcon>
                <ListItemText>Create Activity</ListItemText>
                </MenuItem>
                <MenuItem component={NavLink} to='/profile' onClick={handleClose}>
                <ListItemIcon>
                    <Person />
                </ListItemIcon>
                <ListItemText>My Profile</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                    logoutUser.mutate()
                    handleClose();
                }}>
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
