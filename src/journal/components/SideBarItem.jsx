import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { setActiveNote } from '../../store/journal/journalSlice'
import { useDispatch } from 'react-redux'

export const SideBarItem = ({title, body, id, date, imageUrls = []}) => {

    const dispatch = useDispatch();

    const newTitle = useMemo ( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    },[title])

    const handleActiveNote = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrls }));
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => handleActiveNote()}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={title} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
