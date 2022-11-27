import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar, SideBar } from '../components';

import { motion } from 'framer-motion';


const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <motion.div layout transition={{ duration: 0.4 }}>
      <Box sx={{ display: 'flex' }}>
        <NavBar drawerWidth={ drawerWidth } />

        <SideBar drawerWidth={ drawerWidth } />

        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />

            { children }
            
        </Box>
        </Box>
    </motion.div>
  )
}
