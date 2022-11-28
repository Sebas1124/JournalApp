import { useMemo } from 'react'
import { useDispatch } from 'react-redux';

import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import { startSetNote } from '../../store/journal';

export const SidebarItem = ({ id, title, body, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const onActiveNote = () => {
        dispatch( startSetNote({ id, title, body, date, imageUrls }) );
    }

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    }, [ title ]);

    const newBody = useMemo( () => {
        return body.length > 25
            ? body.substring(0,25) + '...'
            : body;
    }, [ body ]);

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onActiveNote }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ newBody } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
