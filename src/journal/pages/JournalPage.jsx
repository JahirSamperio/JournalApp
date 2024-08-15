import { MailOutline } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../views"

export const JournalPage = () => {
    return (
        <JournalLayout>
            {/* <Typography>Enim mollit cillum exercitation exercitation officia sint ad aliquip labore excepteur do ullamco quis.</Typography> */}
            <NothingSelectedView />
        </JournalLayout>
    )
}
