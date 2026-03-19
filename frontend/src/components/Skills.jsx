import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import {
  Container, Typography, Box, LinearProgress, Paper, Skeleton, Grid
} from "@mui/material";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    skillsTitle: "Skills & Technologies",
    skillsSubtitle1: "Technical Skills",
    skillsSubtitle2: "Technologies I Work With",
    primaryColor: "#14b8a6"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, profileRes] = await Promise.all([
          fetch(`${API_URL}/skills`).then(res => res.json()),
          fetch(`${API_URL}/profile`).then(res => res.json())
        ]);
        setSkills(skillsRes.map(s => ({ name: s.name, level: s.percentage || s.level || 0 })));
        if (profileRes) setProfile(prev => ({ ...prev, ...profileRes }));
      } catch (err) { console.error("Error fetching skills data:", err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-24 bg-[#0f172a]">
        <Container maxWidth="lg">
          <Skeleton width="40%" height={60} sx={{ mx: "auto", mb: 8, bgcolor: "rgba(255,255,255,0.05)" }} />
        </Container>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 bg-[#0f172a] relative">
      <Container maxWidth="lg" className="fade-in">
        <Box sx={{ textAlign: "center", mb: 12 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, color: "white", mb: 2, fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
            {profile.skillsTitle}
          </Typography>
          <Box sx={{ width: 80, height: 6, bgcolor: "white", mx: "auto", borderRadius: 10 }} />
        </Box>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 6, color: "#22d3ee", fontSize: "1.8rem" }}
            >
              {profile.skillsSubtitle1}
            </Typography>
            {skills.map((skill, index) => (
              <Box key={index} className="mb-8">
                <Box className="flex justify-between mb-2">
                  <Typography variant="body1" sx={{ fontWeight: 700, color: "#94a3b8" }}>
                    {skill.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white", fontWeight: 800 }}>
                    {skill.level}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={skill.level}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: "white",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: profile.primaryColor || "#14b8a6",
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>
            ))}
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 6, color: "#22d3ee", fontSize: "1.8rem" }}
            >
              {profile.skillsSubtitle2}
            </Typography>
            <Box className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  className="dark-surf-card"
                  sx={{ 
                    px: 4, py: 2, 
                    borderRadius: "10px",
                    textAlign: "center",
                    minWidth: 140,
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 800, color: "white" }}>
                    {skill.name}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Skills;
