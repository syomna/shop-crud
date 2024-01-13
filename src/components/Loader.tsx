import { Box } from '@mui/material';
import { Circles } from 'react-loader-spinner';
import { primaryColor } from '../utils/theme';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100svh"
    >
      <Circles
        height="40"
        width="40"
        color={primaryColor}
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Box>
  );
}

export default Loader