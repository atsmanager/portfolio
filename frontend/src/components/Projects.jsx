import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import {
  Container, Typography, Box, Card, CardContent, CardActions,
  Button, Chip, Grid, Skeleton
} from "@mui/material";
import { GitHub, OpenInNew } from "@mui/icons-material";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    projectsTitle: "My Projects",
    primaryColor: "#14b8a6",
    githubUrl: "https://github.com/ABBASALI1001"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, profileRes] = await Promise.all([
          fetch(`${API_URL}/projects`).then(res => res.json()),
          fetch(`${API_URL}/profile`).then(res => res.json())
        ]);
        setProjects(projectsRes);
        if (profileRes) setProfile(prev => ({ ...prev, ...profileRes }));
      } catch (err) { console.error("Error fetching projects data:", err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 bg-white">
        <Container maxWidth="lg">
          <Skeleton width="30%" height={60} sx={{ mx: "auto", mb: 8 }} />
        </Container>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative" style={{ background: "radial-gradient(circle, #f8fafc 0%, #cbd5e1 100%)" }}>
      <Container maxWidth="lg" className="fade-in">
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, color: "#1e293b", mb: 2, fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
            {profile.projectsTitle}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
              <Card
                elevation={0}
                className="dark-surf-card h-full flex flex-col transition-all hover:-translate-y-2"
                sx={{ borderRadius: 5, p: 2 }}
              >
                <CardContent className="flex-grow">
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "white", fontSize: "1.2rem" }}>
                    🚀 {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#94a3b8", mb: 3, lineHeight: 1.6 }}>
                    {project.description}
                  </Typography>
                  <Box className="flex flex-wrap gap-1.5 mb-2">
                    {(project.tech || project.technologies || []).map((t, idx) => (
                      <Chip
                        key={idx}
                        label={t}
                        size="small"
                        sx={{ 
                          bgcolor: "rgba(255,255,255,0.05)", 
                          color: "#94a3b8", 
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          borderRadius: "6px"
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 2 }}>
                  {(project.github || project.githubUrl) && (
                    <Button
                      size="small"
                      startIcon={<GitHub />}
                      className="cyan-link"
                      variant="outlined"
                      sx={{ fontWeight: 800, textTransform: "uppercase", fontSize: "0.75rem", borderRadius: 2 }}
                      href={project.github || project.githubUrl}
                      target="_blank"
                    >
                      CODE
                    </Button>
                  )}
                  {(project.live || project.liveUrl) && (
                    <Button
                      size="small"
                      startIcon={<OpenInNew />}
                      className="cyan-link"
                      variant="contained"
                      sx={{ 
                        fontWeight: 800, 
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        bgcolor: profile.primaryColor || "#14b8a6",
                        color: "white",
                        borderRadius: 2,
                        "&:hover": { bgcolor: profile.primaryColor || "#14b8a6", filter: "brightness(0.9)" }
                      }}
                      href={project.live || project.liveUrl}
                      target="_blank"
                    >
                      LIVE DEMO
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 12, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#475569", mb: 2, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
            Want to see more of my work?
          </Typography>
          <Button
            variant="contained"
            component="a"
            href={profile.githubUrl || "https://github.com/ABBASALI1001"}
            target="_blank"
            startIcon={<GitHub />}
            sx={{ 
              bgcolor: profile.primaryColor || "#2563eb", 
              px: 4, py: 1.5, 
              borderRadius: "10px", 
              fontWeight: 800,
              textTransform: "uppercase",
              fontSize: "0.85rem",
              "&:hover": { bgcolor: profile.primaryColor || "#2563eb", filter: "brightness(0.9)" }
            }}
          >
            Visit My GitHub
          </Button>
        </Box>
      </Container>
    </section>
  );
};

export default Projects;
