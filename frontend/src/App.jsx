import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import DynamicSections from "./components/DynamicSections";


const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // Tailwind blue-600
    },
    secondary: {
      main: "#64748b", // Tailwind slate-500
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const path = window.location.pathname;

  if (path === "/admin") {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Admin />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ pt: { xs: "70px", md: "100px" } }}>
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <DynamicSections />
        <Contact />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
