import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography, IconButton, Badge } from '@mui/material';
import { ImageGallery } from '../components'
import { useForm } from './../../hooks/useForm';

import Swal from 'sweetalert2';
import { useRef, useState } from 'react';


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const { date, body, title, onInputChange, formState } = useForm( note );

    const fileInputRef = useRef();

    const [ filesCount, setFilesCount ] = useState(0)

    useEffect(() => {
        dispatch( setActiveNote( formState ) )
    }, [ formState ]);

    useEffect(() => {

        if ( messageSaved.length > 0 ) {
            Swal.fire('Acción completada', messageSaved, 'success');
        }

    }, [ messageSaved ])
    
    const onSaveNote = () => {
        dispatch( startSaveNote() );
        setFilesCount( 0 );
    }

    const onFileInputChange = ({ target }) => {
        if( target.files === 0) return;
        setFilesCount( target.files.length );

        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }


  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ date }</Typography>
        </Grid>
        <Grid item>

            <input 
            type="file" 
            multiple 
            onChange={ onFileInputChange }
            style={{ display: 'none' }}
            ref={ fileInputRef }
            />

            <Badge badgeContent={ filesCount } color='secondary'>
                <IconButton
                    color='primary'
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined/>
                </IconButton>
            </Badge>

            <Button
                disabled={ isSaving }
                onClick={ onSaveNote }
                color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name='title'
                value={ title }
                onChange={ onInputChange }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name='body'
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color='error'
            >
                <DeleteOutline/>
                Borrar
            </Button>

        </Grid>

        {/* Image gallery */}
        <ImageGallery images = { note.imageUrls } />

    </Grid>
  )
}
