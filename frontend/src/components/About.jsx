import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Paper, Skeleton, Grid } from "@mui/material";
import { 
  Code, School, Psychology, Brush, Speed, Cloud, Security, 
  Smartphone, AutoGraph, Rocket, Storage, SupportAgent, DesignServices 
} from "@mui/icons-material";
import { API_URL } from "../config";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [profile, setProfile] = useState({ primaryColor: "#2563eb" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, profileRes] = await Promise.all([
          fetch(`${API_URL}/about`).then(res => res.json()),
          fetch(`${API_URL}/profile`).then(res => res.json())
        ]);
        setAboutData(aboutRes);
        if (profileRes) setProfile(profileRes);
      } catch (err) {
        console.error("Error fetching about/profile data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-24 bg-white">
        <Container maxWidth="lg">
          <Skeleton width="30%" height={60} sx={{ mx: "auto", mb: 8 }} />
          <Grid container spacing={8}>
            {[1, 2, 3].map(i => <Grid size={{ xs: 12, md: 4 }} key={i}><Skeleton variant="rectangular" height={250} sx={{ borderRadius: 4 }} /></Grid>)}
          </Grid>
        </Container>
      </section>
    );
  }

  const {
    aboutTitle = "About Me",
    aboutDescription = "I'm a passionate MERN stack developer...",
    aboutCards = []
  } = (aboutData || {});

  // Fallback if no cards exist in DB
  const displayCards = (aboutCards && aboutCards.length > 0) ? aboutCards : [
    { icon: "Code", title: "Web Development", desc: "Passionate about creating responsive and user-friendly web applications using modern technologies." },
    { icon: "School", title: "Continuous Learning", desc: "Always eager to learn new technologies and improve my skills through projects and courses." },
    { icon: "Psychology", title: "Problem Solving", desc: "Enjoy tackling challenges and finding efficient solutions to complex problems." }
  ];

  const iconMap = {
    Code: Code,
    School: School,
    Psychology: Psychology,
    DesignServices: DesignServices,
    Brush: Brush,
    Speed: Speed,
    Cloud: Cloud,
    Security: Security,
    Smartphone: Smartphone,
    AutoGraph: AutoGraph,
    Rocket: Rocket,
    Storage: Storage,
    SupportAgent: SupportAgent,
  };

  return (
    <section id="about" className="py-24 bg-white">
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            textAlign: "center",
            mb: 10,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -15,
              left: "50%",
              transform: "translateX(-50%)",
              width: 80,
              height: 6,
              bgcolor: "#0f172a",
              borderRadius: 3
            }
          }}
        >
          {aboutTitle}
        </Typography>

        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: {
            xs: "1fr",
            md: displayCards.length === 2 ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
          },
          gap: 4, 
          mb: 16 
        }}>
          {displayCards.map((card, idx) => {
            const IconComponent = iconMap[card.icon] || Code;
            return (
              <Paper
                key={idx}
                elevation={0}
                className="dark-surf-card p-10 text-center transition-all hover:-translate-y-2"
                sx={{ borderRadius: 5, display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <IconComponent sx={{ color: profile.primaryColor || "#2563eb", fontSize: "2.5rem", mb: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: "white" }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "0.95rem" }}>
                  {card.desc}
                </Typography>
              </Paper>
            );
          })}
        </Box>

        <Box className="max-w-5xl mx-auto">
          <Typography
            variant="body1"
            sx={{ color: "#334155", fontWeight: 600, textAlign: "left", lineHeight: 1.8, fontSize: "1.1rem" }}
          >
            {aboutDescription}
          </Typography>
        </Box>
      </Container>
    </section>
  );
};

export default About;

