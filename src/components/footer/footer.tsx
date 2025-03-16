import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="body2" color="inherit">
          © {currentYear} EG Autocomplete. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
