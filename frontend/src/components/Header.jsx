import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Button, IconButton, Drawer,
  Box, List, ListItem, useScrollTrigger
} from "@mui/material";
import { Menu, Close, MoreVert } from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../config";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profile, setProfile] = useState({ logoText: "Portfolio", primaryColor: "#2563eb" });

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/profile`);
        if (res.data) setProfile(res.data);
      } catch (err) { console.error("Error fetching header data:", err); }
    };
    fetchProfile();
  }, []);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setDrawerOpen(false);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: "#0f172a",
        backdropFilter: "blur(20px)",
        boxShadow: trigger ? "0 10px 30px rgba(0,0,0,0.2)" : "none",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        color: "white",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <Toolbar sx={{ 
        justifyContent: "space-between", 
        height: trigger ? 70 : 100, 
        transition: "all 0.4s ease",
        position: "relative", // Required for absolute centering of children
        px: { xs: 2, md: 4 }
      }}>
        {/* Logo - Positioned Left */}
        <Typography 
          variant="h5" 
          onClick={() => scrollToSection("#home")}
          sx={{ 
            fontWeight: 900, 
            cursor: "pointer", 
            color: profile.primaryColor || "#14b8a6",
            letterSpacing: "-1px",
            fontSize: { xs: "1.4rem", md: "1.8rem" },
            zIndex: 2
          }}
        >
          {profile.logoText}
        </Typography>

        {/* Desktop Menu - True Absolute Center */}
        <Box sx={{ 
          display: { xs: "none", md: "flex" }, 
          gap: 1, 
          alignItems: "center",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1
        }}>
          {menuItems.map((item) => (
            <Button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              sx={{ 
                color: "inherit", 
                textTransform: "none", 
                fontWeight: 700,
                px: 1.5,
                fontSize: "0.95rem",
                "&:hover": { color: profile.primaryColor || "#14b8a6", bgcolor: "transparent" }
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu Button - Positioned Right */}
        <Box sx={{ display: { xs: "flex", md: "none" }, zIndex: 2 }}>
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ 
              p: 1,
              "& .MuiSvgIcon-root": { fontSize: "1.8rem" }
            }}
          >
            <MoreVert />
          </IconButton>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: { width: 280, p: 2 } }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={() => setDrawerOpen(false)}><Close /></IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                <Button
                  fullWidth
                  onClick={() => scrollToSection(item.href)}
                  sx={{ 
                    justifyContent: "center", 
                    px: 2, py: 1.5,
                    borderRadius: 2,
                    color: "#475569",
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": { bgcolor: `${profile.primaryColor || "#14b8a6"}1A`, color: profile.primaryColor || "#14b8a6" }
                  }}
                >
                  {item.name}
                </Button>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
