import { useDispatch, useSelector } from 'react-redux';

import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

import { AnimatePresence, motion } from 'framer-motion'
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {

  const { isSaving, active } = useSelector( state => state.journal );

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch( startNewNote() )
  }


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0.2 }}
        layout
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{
          opacity: { ease: "linear" },
          layout: { duration: 0.3 }
        }}
      >
          <JournalLayout>
          
          {/* <Typography>Sint id officia amet velit do aliqua aliqua est ea velit minim voluptate duis laboris. Esse esse consectetur ullamco excepteur ullamco amet. Mollit est nostrud nisi irure magna dolor eiusmod aliquip aliqua nostrud incididunt enim. Velit ipsum laborum Lorem anim laboris aute ullamco ipsum do adipisicing irure.</Typography> */}

          {
            ( !!active ) 
              ? <NoteView />
              : <NothingSelectedView />

          }


          <IconButton
            onClick={ onClickNewNote }
            disabled={ ( isSaving ) ? true : false }
            size='large'
            sx={{
              color: 'white',
              backgroundColor: ( isSaving ) ? 'grey' : 'error.main',
              ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
              position: 'fixed',
              right: 50,
              bottom: 50
            }}
          >
            <AddOutlined sx={{ fontSize: 30 }} />
          </IconButton>

        </JournalLayout>
      </motion.div>
    </AnimatePresence>
  )
}
