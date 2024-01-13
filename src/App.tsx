import "./App.css";
import { Box, ThemeProvider } from "@mui/material";
import { defaultTheme } from "./utils/theme";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box px={{ xs: 2, md: 8 }} py={{ xs: 2, md: 4 }}>
        <Home />
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}

export default App;
