import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const style = {
    flexGrow: 1,
    
}
const NavBar = () => {
    return (
        <div >
            <AppBar position="static"  sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <Toolbar className='nav' variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={style}>
                        Users App
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;