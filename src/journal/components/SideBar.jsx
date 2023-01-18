import { Box, Button, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { SidebarItem } from './';
import { CloseSideBar } from '../../store/auth';

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector( state => state.auth );
    const { notes, sideBar } = useSelector( state => state.journal );

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch ( CloseSideBar() );
    }

  return (
    <Box
        component='nav'
        hidden='true'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='temporary' // temporary
            open={ sideBar }
            onClose={ onClose }
            sx={{ 
                display: { xs: 'flex' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6' noWrap component='div'>
                    { displayName }
                </Typography>
                <Button color='error' onClick={ onClose } variant='outlined'>X</Button>
            </Toolbar>
            <Divider />

            <List>
                {
                    notes.map( note => (
                        <SidebarItem key={ note.id } { ...note }/>
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}
