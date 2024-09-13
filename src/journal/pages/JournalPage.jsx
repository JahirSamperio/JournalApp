import { AddOutlined, MailOutline } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { useDispatch, useSelector } from "react-redux"
import {startNewNote} from '../../store/journal/thunks';
import { useMemo } from "react"

export const JournalPage = () => {

    const { isSaving, active } = useSelector(state => state.journal);

    const dispatch = useDispatch();

    const onClickNewNote = () => {
        dispatch(startNewNote())
    }

    return (
        <JournalLayout>
            {/* <Typography>Enim mollit cillum exercitation exercitation officia sint ad aliquip labore excepteur do ullamco quis.</Typography> */}


            {
                (!!active) ? <NoteView /> : <NothingSelectedView />
            }
            {/* <NoteView /> */}
            <IconButton
                disabled={isSaving}
                onClick={onClickNewNote}
                size="large"
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.85},
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{fontSize: 30}} />
            </IconButton>
        </JournalLayout>
    )
}
 