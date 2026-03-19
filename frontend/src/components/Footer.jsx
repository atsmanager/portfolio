import React from "react";
import { Container, Typography, Box, IconButton, Divider } from "@mui/material";
import { GitHub, LinkedIn, Email, Instagram, Twitter } from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../config";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [profile, setProfile] = React.useState({
    name: "Md Abbas Ali",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    contactEmail: "",
    logoText: "Portfolio",
    footerText: "Made with React & Material UI",
    primaryColor: "#2563eb"
  });

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/profile`);
        if (res.data) setProfile(prev => ({ ...prev, ...res.data }));
      } catch (err) { console.error("Error fetching footer data:", err); }
    };
    fetchProfile();
  }, []);

  return (
    <footer className="bg-[#0f172a] text-white py-16 relative overflow-hidden">
      <Box sx={{ position: "absolute", bottom: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${profile.primaryColor}11 0%, transparent 70%)` }} />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8">
          <Box className="text-center md:text-left">
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: profile.primaryColor, letterSpacing: -1 }}>
              {profile.logoText}
            </Typography>
            <Typography variant="body1" sx={{ color: "#94a3b8", fontWeight: 600, maxWidth: 300 }}>
              Building digital experiences with precision and passion.
            </Typography>
          </Box>

          <Box className="flex space-x-2">
            {profile.githubUrl && (
              <IconButton href={profile.githubUrl} target="_blank" sx={{ color: "white", "&:hover": { color: profile.primaryColor, bgcolor: "rgba(255,255,255,0.05)" } }}><GitHub /></IconButton>
            )}
            {profile.linkedinUrl && (
              <IconButton href={profile.linkedinUrl} target="_blank" sx={{ color: "white", "&:hover": { color: profile.primaryColor, bgcolor: "rgba(255,255,255,0.05)" } }}><LinkedIn /></IconButton>
            )}
            {profile.twitterUrl && (
              <IconButton href={profile.twitterUrl} target="_blank" sx={{ color: "white", "&:hover": { color: profile.primaryColor, bgcolor: "rgba(255,255,255,0.05)" } }}><Twitter /></IconButton>
            )}
            {profile.instagramUrl && (
              <IconButton href={profile.instagramUrl} target="_blank" sx={{ color: "white", "&:hover": { color: profile.primaryColor, bgcolor: "rgba(255,255,255,0.05)" } }}><Instagram /></IconButton>
            )}
            {profile.contactEmail && (
              <IconButton href={`mailto:${profile.contactEmail}`} sx={{ color: "white", "&:hover": { color: profile.primaryColor, bgcolor: "rgba(255,255,255,0.05)" } }}><Email /></IconButton>
            )}
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />

        <Box className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            © {currentYear} {profile.name}. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
            {profile.footerText}
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
