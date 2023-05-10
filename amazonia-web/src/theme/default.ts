import { createTheme, responsiveFontSizes } from '@mui/material';
import { grey, pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: pink[500],
    },
    background: {
      default: grey[900],
    },
  },
});

export default responsiveFontSizes(theme);
