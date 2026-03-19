import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import {
  Container, Typography, Box, TextField, Button, Alert, Paper, Grid
} from "@mui/material";
import { Email, Phone, LocationOn, Send } from "@mui/icons-material";

const ContactCard = ({ icon: Icon, title, subtitle, primaryColor }) => (
  <Paper 
    elevation={0} 
    sx={{ 
      p: 3, 
      display: "flex", 
      alignItems: "center", 
      gap: 3, 
      borderRadius: 4, 
      border: "1px solid #e2e8f0",
      transition: "all 0.3s ease",
      "&:hover": { borderColor: primaryColor, transform: "translateY(-5px)", boxShadow: `0 10px 25px ${primaryColor}1A` }
    }}
  >
    <Box sx={{ bgcolor: `${primaryColor}1A`, p: 1.5, borderRadius: 3, color: primaryColor }}>
      <Icon />
    </Box>
    <Box>
      <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{title}</Typography>
      <Typography variant="body1" sx={{ fontWeight: 800, color: "#1e293b" }}>{subtitle}</Typography>
    </Box>
  </Paper>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [profile, setProfile] = useState({
    contactEmail: "abbasalimohammad8165@gmail.com",
    phone: "+91 7670888165",
    address: "Hyderabad, India",
    contactMainTitle: "Get In Touch",
    contactSectionTitle: "Contact Information",
    contactFormTitle: "Send me a Message",
    primaryColor: "#14b8a6"
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/profile`);
        if (res.data) setProfile(prev => ({ ...prev, ...res.data }));
      } catch (err) { console.error("Error fetching contact info:", err); }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/messages`, formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const {
    contactMainTitle = "Get In Touch",
    contactSectionTitle = "Contact Information",
    contactFormTitle = "Send me a Message",
    contactEmail, phone, address, primaryColor
  } = profile || {};

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h2" sx={{ fontWeight: 900, textAlign: "center", mb: 10, letterSpacing: -1 }}>
          {contactMainTitle}
        </Typography>
        
        <Grid container spacing={6}>
          {/* Contact Info Cards */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h5" fontWeight={800} mb={4} color="#1e293b">
              {contactSectionTitle}
            </Typography>
            
            <Box className="flex flex-col gap-6">
              <ContactCard icon={Email} title="Email" subtitle={contactEmail || "abbas@example.com"} primaryColor={primaryColor} />
              <ContactCard icon={Phone} title="Phone" subtitle={phone || "+91 1234567890"} primaryColor={primaryColor} />
              <ContactCard icon={LocationOn} title="Location" subtitle={address || "India"} primaryColor={primaryColor} />
            </Box>

            <Paper elevation={0} className="dark-surf-card" sx={{ p: 4, borderRadius: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "white" }}>
                Open for Opportunities
              </Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "0.95rem" }}>
                I'm actively looking for entry-level MERN Stack Developer roles and internship 
                opportunities. If you have an exciting project or role, feel free to connect with me!
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={0} className="dark-surf-card shadow-2xl" sx={{ p: { xs: 4, md: 6 }, borderRadius: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 6, color: "white", fontSize: "1.5rem" }}>
                {profile.contactFormTitle}
              </Typography>

              {submitStatus === "success" && (
                <Alert severity="success" sx={{ mb: 4, borderRadius: 2 }}>
                  Success! I'll get back to you soon.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Box className="flex flex-col gap-4">
                  <TextField
                    fullWidth label="Your Name *" name="name"
                    value={formData.name} onChange={handleChange} required
                    variant="outlined"
                    sx={{ 
                      "& .MuiOutlinedInput-root": { borderRadius: 4, color: "white", border: "1px solid rgba(255,255,255,0.1)" },
                      "& .MuiInputLabel-root": { color: "#94a3b8" }
                    }}
                  />
                  <TextField
                    fullWidth label="Email Address *" name="email" type="email"
                    value={formData.email} onChange={handleChange} required
                    variant="outlined"
                    sx={{ 
                      "& .MuiOutlinedInput-root": { borderRadius: 4, color: "white", border: "1px solid rgba(255,255,255,0.1)" },
                      "& .MuiInputLabel-root": { color: "#94a3b8" }
                    }}
                  />
                  <TextField
                    fullWidth label="Your Message *" name="message" multiline rows={6}
                    value={formData.message} onChange={handleChange} required
                    variant="outlined"
                    sx={{ 
                      "& .MuiOutlinedInput-root": { borderRadius: 4, color: "white", border: "1px solid rgba(255,255,255,0.1)" },
                      "& .MuiInputLabel-root": { color: "#94a3b8" }
                    }}
                  />
                  
                  <Button
                    type="submit" variant="contained" size="large"
                    startIcon={<Send />}
                    sx={{ 
                      mt: 2, px: 6, py: 2, 
                      borderRadius: 4, 
                      bgcolor: primaryColor, 
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      fontSize: "0.9rem",
                      alignSelf: "flex-start",
                      "&:hover": { bgcolor: primaryColor, filter: "brightness(0.9)" }
                    }}
                  >
                    SEND MESSAGE
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Contact;
