import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Skeleton, IconButton, Tooltip } from "@mui/material";
import { Download, GitHub, LinkedIn, Instagram, Twitter } from "@mui/icons-material";
import { API_URL } from "../config";
import profileFallback from "../assets/portfile.jpg";
import CVFallback from "../assets/Abbas_FullStackWebDeveloper.pdf";

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center bg-[#0f172a] py-16">
        <Container maxWidth="lg">
          <Box className="text-center md:text-left md:flex items-center justify-between">
            <Box className="md:w-1/2">
              <Skeleton width="60%" height={80} sx={{ bgcolor: "rgba(255,255,255,0.05)" }} />
              <Skeleton width="40%" height={40} sx={{ mt: 2, bgcolor: "rgba(255,255,255,0.05)" }} />
            </Box>
          </Box>
        </Container>
      </section>
    );
  }

  const {
    name = "Md Abbas Ali",
    title = "MERN Stack Developer",
    heroSubtitle = "Passionate about building modern web applications...",
    profileImage = profileFallback,
    resumeUrl = CVFallback,
    githubUrl,
    linkedinUrl,
    heroGithubLabel = "GITHUB",
    heroLinkedinLabel = "LINKEDIN",
    heroResumeLabel = "DOWNLOAD CV",
    primaryColor = "#14b8a6",
  } = profile || {};

  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-[#0f172a] py-16 overflow-hidden relative"
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          alignItems: "center", 
          justifyContent: "space-between",
          gap: { xs: 6, md: 10 },
          textAlign: { xs: "center", md: "left" }
        }}>
          <Box sx={{ flex: { xs: "1 1 auto", md: "1 1 60%" }, width: "100%" }} className="fade-in">
            <Typography variant="h2" sx={{ 
              fontWeight: 900, 
              color: "white", 
              mb: 2, 
              fontSize: { xs: "2.5rem", md: "4.2rem" }, 
              lineHeight: 1.1,
              letterSpacing: "-2px"
            }}>
              Hi, I'm <span style={{ color: primaryColor }}>{name || "Md Abbas Ali"}</span>
            </Typography>
            <Typography variant="h4" sx={{ 
              color: "white", 
              mb: 3, 
              fontWeight: 700, 
              fontSize: { xs: "1.2rem", md: "2rem" },
              opacity: 0.9
            }}>
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ 
                color: "#94a3b8", 
                mb: 6, 
                fontSize: { xs: "1rem", md: "1.15rem" }, 
                lineHeight: 1.8, 
                maxWidth: "600px",
                mx: { xs: "auto", md: 0 }
              }}
            >
              {heroSubtitle}
            </Typography>
            
            <Box className="flex flex-wrap gap-4 justify-center md:justify-start items-center mb-8">
              <Button
                variant="contained"
                sx={{ 
                  bgcolor: primaryColor, 
                  color: "white",
                  px: 4, py: 1.8, 
                  borderRadius: "10px", 
                  fontWeight: 900,
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
                  letterSpacing: 1,
                  boxShadow: `0 10px 20px ${primaryColor}4D`,
                  "&:hover": { bgcolor: primaryColor, filter: "brightness(0.9)", transform: "translateY(-2px)" },
                  transition: "all 0.3s ease"
                }}
                startIcon={<Download />}
                component="a"
                href={resumeUrl}
                download
              >
                {heroResumeLabel}
              </Button>
              
              <Box className="flex gap-4">
                {githubUrl && (
                  <Button
                    variant="outlined"
                    component="a"
                    href={githubUrl}
                    target="_blank"
                    startIcon={<GitHub />}
                    sx={{ 
                      color: primaryColor, 
                      borderColor: `${primaryColor}66`,
                      px: 3, py: 1.8,
                      borderRadius: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      fontSize: "0.85rem",
                      "&:hover": { borderColor: primaryColor, bgcolor: `${primaryColor}0D`, transform: "translateY(-2px)" }
                    }}
                  >
                    {heroGithubLabel}
                  </Button>
                )}

                {linkedinUrl && (
                  <Button
                    variant="outlined"
                    component="a"
                    href={linkedinUrl}
                    target="_blank"
                    startIcon={<LinkedIn />}
                    sx={{ 
                      color: primaryColor, 
                      borderColor: `${primaryColor}66`,
                      px: 3, py: 1.8,
                      borderRadius: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      fontSize: "0.85rem",
                      "&:hover": { borderColor: primaryColor, bgcolor: `${primaryColor}0D`, transform: "translateY(-2px)" }
                    }}
                  >
                    {heroLinkedinLabel}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>

          <Box className="md:w-2/5 mt-12 md:mt-0 flex justify-center">
            <Box sx={{ 
              position: "relative",
              width: { xs: 260, md: 340 },
              height: { xs: 260, md: 340 }
            }}>
              <Box className="teal-glow-ring" sx={{ 
                width: "100%", height: "100%", 
                borderRadius: "50%",
                overflow: "hidden",
                bgcolor: "#1e293b",
                transition: "all 0.5s ease",
                boxShadow: `0 0 20px ${primaryColor}80, inset 0 0 10px ${primaryColor}4D`,
                border: `4px solid ${primaryColor}`
              }}>
                <img
                  src={profileImage || profileFallback}
                  className="w-full h-full object-cover"
                  alt={name}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Hero;
