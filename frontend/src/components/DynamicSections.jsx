import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import { Container, Typography, Box, Skeleton, Grid } from "@mui/material";

const DynamicSections = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/sections`)
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dynamic sections:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Skeleton width="40%" height={60} sx={{ mx: "auto", mb: 4 }} />
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 4 }} />
      </Container>
    );
  }

  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => (
        <section
          key={section._id}
          className={`py-20 ${index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}`}
        >
          <Container maxWidth="lg" className="fade-in">
            <Box sx={{ textAlign: "center", mb: section.subtitle ? 4 : 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: "#1e293b",
                  fontSize: { xs: "2.5rem", md: "3.5rem" }
                }}
              >
                {section.title}
              </Typography>
              {section.subtitle && (
                <Typography variant="h5" sx={{ color: "#64748b", fontWeight: 600, mt: 2, mb: 4 }}>
                  {section.subtitle}
                </Typography>
              )}
            </Box>
            
            {section.image ? (
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: index % 2 === 0 ? 1 : 2 } }}>
                  <Box 
                    sx={{ 
                      color: "#475569", 
                      fontSize: "1.1rem", 
                      lineHeight: 1.8,
                      whiteSpace: "pre-wrap"
                    }}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: index % 2 === 0 ? 2 : 1 } }}>
                  <Box
                    component="img"
                    src={section.image}
                    alt={section.title}
                    sx={{
                      width: "100%",
                      borderRadius: 4,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      objectFit: "cover"
                    }}
                  />
                </Grid>
              </Grid>
            ) : (
              <Box 
                sx={{ 
                  maxWidth: "800px", 
                  mx: "auto", 
                  color: "#475569", 
                  fontSize: "1.1rem", 
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap"
                }}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
          </Container>
        </section>
      ))}
    </>
  );
};

export default DynamicSections;
