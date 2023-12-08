import { AppBar, Typography } from '@mui/material';

const Header = () => {

    return(
        <AppBar position="static">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, m:3 }}>
            ISAR Aerospace
          </Typography>
        </AppBar>
    )

}
export default Header;