import { AddOutlined, MailOutline } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

export const JournalPage = () => {
    return (
        <JournalLayout>
            {/* <Typography>Enim mollit cillum exercitation exercitation officia sint ad aliquip labore excepteur do ullamco quis.</Typography> */}
            <NothingSelectedView />
            {/* <NoteView /> */}
            <IconButton
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
 