import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" component="div">
          EG Autocomplete - Part Deux
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
