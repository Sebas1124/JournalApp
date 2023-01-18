import { AppBar, Grid, IconButton, Toolbar, Typography, duration } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { OnSideBar, startLogout } from './../../store/auth';

import { AnimatePresence, motion } from 'framer-motion';


export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch( startLogout() )
    }

    const onOpenSideBar = () =>{
        dispatch( OnSideBar() );
    }

  return (
    <AppBar 
        position='absolute'
        sx={{ 
            // width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
        }}
        >
        <Toolbar>
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 1 }}
                    onClick={ onOpenSideBar }
                >
                    <MenuOutlined />
                </IconButton>
                <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                <IconButton color='error' onClick={ onLogout }>
                    <LogoutOutlined />
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
