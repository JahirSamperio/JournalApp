import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { Navbar, Sidebar } from '../components';

const drawerWidth = 260;

export const JournalLayout = ({children}) => {
    return (
        <Box sx={{display: 'flex'}}>
            <Navbar drawerWidth={drawerWidth}/>

            <Sidebar drawerWidth={drawerWidth}/>
            <Box
                component='main'
                sx={{ flexGrow: 1, p:0}}
            >
                <Toolbar />

                {children}
            </Box>
        </Box>
    )
}
