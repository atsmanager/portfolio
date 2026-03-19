import React, { useState, useEffect } from "react";
import {
  Container, Typography, Box, Paper, TextField, Button,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton,
  Chip, Alert, Tabs, Tab, Dialog, DialogTitle, DialogContent,
  DialogActions, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Drawer, AppBar, Toolbar, Avatar, Tooltip, Card, CardContent, Grid
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  Message as MessageIcon,
  PostAdd as SectionIcon,
  CameraAlt as CameraIcon,
  CloudUpload as UploadIcon,
  ColorLens as ThemeIcon,
  Reply as ReplyIcon,
  GitHub,
  LinkedIn,
  Instagram,
  Twitter,
  Language as SocialIcon,
  Brush, Speed, Cloud, Security, Smartphone, AutoGraph, Rocket, Storage, SupportAgent, DesignServices, DragIndicator
} from "@mui/icons-material";
import axios from "axios";

import { API_URL as API } from "../config";

// ─── Login Screen ────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/auth/login`, form);
      localStorage.setItem("adminToken", res.data.token);
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#0f172a" }}>
      <Paper elevation={0} sx={{ p: 5, width: 400, borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", bgcolor: "rgba(30, 41, 59, 0.7)", backdropFilter: "blur(20px)" }}>
        <Typography variant="h4" fontWeight={900} mb={1} textAlign="center" color="white" sx={{ letterSpacing: -1 }}>🔐 LOGIN</Typography>
        <Typography variant="body2" sx={{ color: "#94a3b8" }} textAlign="center" mb={4}>Enter credentials to access dashboard</Typography>
        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth label="Email" type="email" value={form.email} 
            onChange={e => setForm({ ...form, email: e.target.value })} 
            required sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 3, color: "white" }, "& .MuiInputLabel-root": { color: "#64748b" } }} 
          />
          <TextField 
            fullWidth label="Password" type="password" value={form.password} 
            onChange={e => setForm({ ...form, password: e.target.value })} 
            required sx={{ mb: 4, "& .MuiOutlinedInput-root": { borderRadius: 3, color: "white" }, "& .MuiInputLabel-root": { color: "#64748b" } }} 
          />
          <Button 
            fullWidth type="submit" variant="contained" size="large" disabled={loading} 
            sx={{ py: 1.8, borderRadius: 3, fontWeight: 800, bgcolor: "#2563eb", "&:hover": { bgcolor: "#3b82f6" }, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)" }}
          >
            {loading ? "AUTHENTICATING..." : "ACCESS DASHBOARD"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

// ─── Sidebar Item ───────────────────────────────────────────────────────────
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <ListItem disablePadding sx={{ mb: 1.5 }}>
    <ListItemButton 
      onClick={onClick}
      sx={{ 
        borderRadius: 3,
        bgcolor: active ? "#2563eb" : "transparent",
        color: active ? "white" : "#94a3b8",
        boxShadow: active ? "0 4px 12px rgba(37, 99, 235, 0.4)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "& .MuiListItemIcon-root": { color: active ? "white" : "#64748b", minWidth: 40 },
        "&:hover": { 
          bgcolor: active ? "#2563eb" : "rgba(255, 255, 255, 0.05)", 
          color: active ? "white" : "white",
          transform: active ? "none" : "translateX(4px)",
          "& .MuiListItemIcon-root": { color: "white" } 
        }
      }}
    >
      <ListItemIcon><Icon fontSize="small" /></ListItemIcon>
      <ListItemText primary={label} primaryTypographyProps={{ fontWeight: active ? 800 : 600, fontSize: "0.9rem" }} />
    </ListItemButton>
  </ListItem>
);

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);
  const [tab, setTab] = useState(0);

  // States
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", tech: "", github: "", live: "" });
  const [editProject, setEditProject] = useState(null);
  const [projectMsg, setProjectMsg] = useState("");

  const [skills, setSkills] = useState([]);
  const [skillForm, setSkillForm] = useState({ name: "", percentage: "" });
  const [skillMsg, setSkillMsg] = useState("");

  const [about, setAbout] = useState({
    aboutTitle: "",
    aboutDescription: "",
    aboutCards: []
  });

  const [profile, setProfile] = useState({
    name: "", title: "", heroSubtitle: "", aboutTitle: "", aboutDescription: "",
    profileImage: "", resumeUrl: "", githubUrl: "", linkedinUrl: "", instagramUrl: "", twitterUrl: "",
    logoText: "", contactEmail: "", phone: "", address: "", footerText: "",
    skillsTitle: "", skillsSubtitle1: "", skillsSubtitle2: "", projectsTitle: "",
    contactMainTitle: "", contactSectionTitle: "", contactFormTitle: "",
    heroGithubLabel: "GITHUB", heroLinkedinLabel: "LINKEDIN", heroResumeLabel: "DOWNLOAD CV",
    aboutCards: [],
    primaryColor: "#14b8a6", secondaryColor: "#4f46e5"
  });
  const [profileMsg, setProfileMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");

  const [sections, setSections] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [sectionForm, setSectionForm] = useState({ title: "", subtitle: "", content: "", image: "", order: 0 });
  const [editSection, setEditSection] = useState(null);

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (token) fetchAll();
  }, [token]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [p, s, m, pr, ab, sec] = await Promise.all([
        axios.get(`${API}/projects`),
        axios.get(`${API}/skills`),
        axios.get(`${API}/messages`, authHeaders),
        axios.get(`${API}/profile`),
        axios.get(`${API}/about`),
        axios.get(`${API}/sections`)
      ]);
      setProjects(p.data);
      setSkills(s.data);
      setMessages(m.data);
      setProfile(pr.data);
      setSections(sec.data);
      const aboutData = ab.data;
      if (!aboutData.aboutCards || aboutData.aboutCards.length === 0) {
        aboutData.aboutCards = [
          { icon: "Code", title: "Web Development", desc: "Passionate about creating responsive applications." },
          { icon: "School", title: "Continuous Learning", desc: "Always eager to learn new technologies." },
          { icon: "Psychology", title: "Problem Solving", desc: "Enjoy tackling complex challenges." }
        ];
      }
      setAbout(aboutData);
    } catch (err) { console.error("Fetch error:", err); }
    finally { setLoading(false); }
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const res = await axios.post(`${API}/upload`, formData, {
        headers: { ...authHeaders.headers, "Content-Type": "multipart/form-data" },
      });
      console.log("Upload Success:", res.data); // Debug info
      const newProfile = { ...profile, [field]: res.data.url };
      setProfile(newProfile);
      // Auto-save the profile with the new file URL
      await axios.put(`${API}/profile`, newProfile, authHeaders);
      setProfileMsg("✅ File uploaded & Profile Saved!");
      fetchAll();
    } catch (err) { 
      console.error("Upload Error:", err);
      setProfileMsg("❌ upload/save failed"); 
    }
    finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  const handleOpenReply = (msg) => {
    setSelectedMessage(msg);
    setReplyText("");
    setReplyDialogOpen(true);
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    setLoading(true);
    try {
      await axios.post(`${API}/messages/${selectedMessage._id}/reply`, { replyText }, authHeaders);
      setProfileMsg("✅ Reply sent successfully!");
      setReplyDialogOpen(false);
    } catch (err) {
      setProfileMsg("❌ Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <LoginScreen onLogin={setToken} />;

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 280, boxSizing: "border-box", borderRight: "1px solid rgba(255,255,255,0.05)", p: 2, bgcolor: "#0f172a", color: "white" },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, mb: 4, bgcolor: "rgba(255,255,255,0.03)", borderRadius: 4 }}>
          <input
            type="file"
            id="avatar-upload"
            hidden
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "profileImage")}
          />
          <Tooltip title="Change Profile Picture">
            <Avatar 
              onClick={() => document.getElementById("avatar-upload").click()}
              src={profile.profileImage} 
              sx={{ 
                width: 48, 
                height: 48, 
                cursor: "pointer", 
                bgcolor: "#2563eb", 
                fontWeight: 900, 
                boxShadow: "0 0 15px rgba(37,99,235,0.3)",
                position: "relative",
                "&:hover": {
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0, left: 0, right: 0, bottom: 0,
                    bgcolor: "rgba(0,0,0,0.4)",
                    borderRadius: "50%"
                  },
                  "& .camera-icon": { opacity: 1 }
                }
              }}
            >
              {!profile.profileImage && (profile.name?.[0] || "A")}
              <CameraIcon 
                className="camera-icon"
                sx={{ 
                  position: "absolute", 
                  fontSize: "1.2rem", 
                  opacity: 0, 
                  zIndex: 2,
                  transition: "opacity 0.2s" 
                }} 
              />
            </Avatar>
          </Tooltip>
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="subtitle2" fontWeight={800} noWrap sx={{ letterSpacing: 0.5 }}>{profile.name || "Admin"}</Typography>
            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700 }}>ADMIN PANEL</Typography>
          </Box>
        </Box>
        
        <List>
          <SidebarItem icon={DashboardIcon} label="Dashboard Overview" active={tab === 0} onClick={() => setTab(0)} />
          <SidebarItem icon={PersonIcon} label="Hero" active={tab === 1} onClick={() => setTab(1)} />
          <SidebarItem icon={AssessmentIcon} label="About Me Manager" active={tab === 2} onClick={() => setTab(2)} />
          <SidebarItem icon={WorkIcon} label="Projects Editor" active={tab === 3} onClick={() => setTab(3)} />
          <SidebarItem icon={AssessmentIcon} label="Skills Matrix" active={tab === 4} onClick={() => setTab(4)} />
          <SidebarItem icon={MessageIcon} label="Messages / Inquiries" active={tab === 5} onClick={() => setTab(5)} />
          <SidebarItem icon={ThemeIcon} label="UI & Branding" active={tab === 6} onClick={() => setTab(6)} />
          <SidebarItem icon={AssessmentIcon} label="Section Labels" active={tab === 7} onClick={() => setTab(7)} />
          <SidebarItem icon={SectionIcon} label="Dynamic Sections" active={tab === 8} onClick={() => setTab(8)} />
        </List>

        <Box sx={{ mt: "auto", p: 1 }}>
          <Button fullWidth startIcon={<LogoutIcon />} onClick={handleLogout} color="error" variant="outlined" sx={{ borderRadius: 2 }}>Logout</Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, width: { sm: `calc(100% - 280px)` } }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4, borderBottom: "1px solid #e2e8f0" }}>
          <Toolbar sx={{ px: "0 !important" }}>
            <Typography variant="h5" fontWeight={800} color="#1e293b">
              {["Dashboard Overview", "Hero", "About Me Manager", "Projects Editor", "Skills Matrix", "Inquiries / Messages", "UI Branding", "Label Editor", "Dynamic Sections Maker"][tab]}
            </Typography>
            {loading && <Box sx={{ ml: 2, color: "#2563eb" }}>Processing...</Box>}
          </Toolbar>
        </AppBar>

        {/* Tab 0: Overview */}
        {tab === 0 && (
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ borderRadius: 4, border: "1px solid #e2e8f0", boxShadow: "none" }}>
                <CardContent>
                  <Typography color="text.secondary" variant="subtitle2">Total Projects</Typography>
                  <Typography variant="h3" fontWeight={800}>{projects.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ borderRadius: 4, border: "1px solid #e2e8f0", boxShadow: "none" }}>
                <CardContent>
                  <Typography color="text.secondary" variant="subtitle2">Total Skills</Typography>
                  <Typography variant="h3" fontWeight={800} color="#2563eb">{skills.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ borderRadius: 4, border: "1px solid #e2e8f0", boxShadow: "none" }}>
                <CardContent>
                  <Typography color="text.secondary" variant="subtitle2">New Messages</Typography>
                  <Typography variant="h3" fontWeight={800} color="#ef4444">{messages.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Tab 1: Identity & Hero */}
        {tab === 1 && (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: "1px solid rgba(0,0,0,0.05)", bgcolor: "white" }}>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              try { 
                await axios.put(`${API}/profile`, profile, authHeaders); 
                setProfileMsg("✅ Hero Saved!"); 
                fetchAll(); 
              }
              catch { setProfileMsg("❌ Error"); } finally { setLoading(false); }
            }}>
              <Typography variant="h6" fontWeight={800} mb={3}>Hero Section Configuration</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="Full Name" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} /></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="Professional Title" value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} /></Grid>
                <Grid size={{ xs: 12 }}><TextField fullWidth label="Hero Subtitle" multiline rows={2} value={profile.heroSubtitle} onChange={e => setProfile({...profile, heroSubtitle: e.target.value})} /></Grid>
                
                <Grid size={{ xs: 12 }} sx={{ mt: 2 }}><Divider><Typography variant="body2" fontWeight={800} color="text.secondary">HERO BUTTONS & SOCIALS</Typography></Divider></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="GitHub Label" value={profile.heroGithubLabel} onChange={e => setProfile({...profile, heroGithubLabel: e.target.value})} /></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="LinkedIn Label" value={profile.heroLinkedinLabel} onChange={e => setProfile({...profile, heroLinkedinLabel: e.target.value})} /></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="GitHub URL" value={profile.githubUrl} onChange={e => setProfile({...profile, githubUrl: e.target.value})} InputProps={{ startAdornment: <GitHub sx={{ mr: 1, color: "#64748b" }} fontSize="small" /> }} /></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="LinkedIn URL" value={profile.linkedinUrl} onChange={e => setProfile({...profile, linkedinUrl: e.target.value})} InputProps={{ startAdornment: <LinkedIn sx={{ mr: 1, color: "#64748b" }} fontSize="small" /> }} /></Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 5, py: 1.8, px: 6, borderRadius: 3, fontWeight: 800 }}>SAVE IDENTITY</Button>
              {profileMsg && <Alert severity="success" sx={{ mt: 3, borderRadius: 3 }}>{profileMsg}</Alert>}
            </form>
          </Paper>
        )}

        {/* Tab 2: About Me Manager */}
        {tab === 2 && (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: "1px solid rgba(0,0,0,0.05)", bgcolor: "white" }}>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              try { 
                await axios.put(`${API}/about`, about, authHeaders); 
                setProfileMsg("✅ About Updated!"); 
                fetchAll(); 
              }
              catch { setProfileMsg("❌ Error"); } finally { setLoading(false); }
            }}>
              <Typography variant="h6" fontWeight={800} mb={3}>About Me Section Manager</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}><TextField fullWidth label="Section Main Title (e.g. About Me)" value={about.aboutTitle} onChange={e => setAbout({...about, aboutTitle: e.target.value})} /></Grid>
                <Grid size={{ xs: 12 }}><TextField fullWidth multiline rows={6} label="Biography / Description" value={about.aboutDescription} onChange={e => setAbout({...about, aboutDescription: e.target.value})} /></Grid>
                
                <Grid size={{ xs: 12 }} sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Divider sx={{ flexGrow: 1, mr: 2 }}><Typography variant="body2" fontWeight={800} color="text.secondary">HIGHLIGHT CARDS (DYNAMIC)</Typography></Divider>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => {
                      const n = [...(about.aboutCards || [])];
                      n.push({ icon: "Code", title: "New Highlight", desc: "" });
                      setAbout({ ...about, aboutCards: n });
                    }}
                    sx={{ borderRadius: 2, fontWeight: 700 }}
                  >
                    + ADD CARD
                  </Button>
                </Grid>
                
                {(() => {
                  const cards = about.aboutCards && about.aboutCards.length > 0 ? about.aboutCards : [];
                  return cards.map((card, idx) => (
                    <Grid size={{ xs: 12 }} key={idx} sx={{ p: 3, bgcolor: "#f8fafc", borderRadius: 4, mb: 1, border: "1px solid #e2e8f0", position: "relative" }}>
                       <IconButton 
                         color="error" 
                         size="small" 
                         onClick={() => {
                           const n = [...cards];
                           n.splice(idx, 1);
                           setAbout({ ...about, aboutCards: n });
                         }}
                         sx={{ position: "absolute", top: 10, right: 10 }}
                       >
                         <DeleteIcon fontSize="small" />
                       </IconButton>

                       <Box sx={{ display: "flex", gap: 2, mb: 2, pr: 4 }}>
                         <TextField select SelectProps={{ native: true }} label="Icon" value={card.icon} onChange={e => {
                           const n = [...cards]; n[idx].icon = e.target.value; setAbout({...about, aboutCards: n});
                         }} sx={{ width: 160 }}>
                           <option value="Code">💻 Code</option>
                           <option value="School">🎓 School</option>
                           <option value="Psychology">🧠 Problem Solving</option>
                           <option value="DesignServices">🎨 UI/UX Design</option>
                           <option value="Speed">⚡ Performance</option>
                           <option value="Cloud">☁️ Cloud / Backend</option>
                           <option value="Security">🛡️ Security</option>
                           <option value="Smartphone">📱 Mobile First</option>
                           <option value="AutoGraph">📈 Analytics</option>
                           <option value="Rocket">🚀 Scalability</option>
                           <option value="Storage">💾 Database</option>
                           <option value="SupportAgent">🤝 Client Support</option>
                           <option value="Brush">🖌️ Creativity</option>
                         </TextField>
                         <TextField fullWidth label={`Card ${idx+1} Title`} value={card.title} onChange={e => {
                           const n = [...cards]; n[idx].title = e.target.value; setAbout({...about, aboutCards: n});
                         }} />
                       </Box>
                       <TextField fullWidth multiline rows={2} label="Description" value={card.desc} onChange={e => {
                         const n = [...cards]; n[idx].desc = e.target.value; setAbout({...about, aboutCards: n});
                       }} />
                    </Grid>
                  ));
                })()}
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 5, py: 1.8, px: 6, borderRadius: 3, fontWeight: 800 }}>UPDATE ABOUT SECTION</Button>
              {profileMsg && <Alert severity="success" sx={{ mt: 3, borderRadius: 3 }}>{profileMsg}</Alert>}
            </form>
          </Paper>
        )}

        {/* Tab 3: Projects Editor */}
        {tab === 3 && (
          <Box>
            <Paper sx={{ p: 3, mb: 4, borderRadius: 4 }}>
              <Typography variant="h6" mb={2}>{editProject ? "Edit Project" : "Add New Project"}</Typography>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const payload = { ...projectForm, tech: typeof projectForm.tech === 'string' ? projectForm.tech.split(",").map(t => t.trim()) : projectForm.tech };
                if (editProject) await axios.put(`${API}/projects/${editProject}`, payload, authHeaders);
                else await axios.post(`${API}/projects`, payload, authHeaders);
                setProjectForm({ title: "", description: "", tech: "", github: "", live: "" });
                setEditProject(null);
                fetchAll();
              }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="Tech (comma separated)" value={projectForm.tech} onChange={e => setProjectForm({...projectForm, tech: e.target.value})} required /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="GitHub" value={projectForm.github} onChange={e => setProjectForm({...projectForm, github: e.target.value})} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="Live" value={projectForm.live} onChange={e => setProjectForm({...projectForm, live: e.target.value})} /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth multiline rows={2} label="Description" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} /></Grid>
                </Grid>
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>{editProject ? "Update" : "Add"}</Button>
              </form>
            </Paper>
            <Table>
              <TableHead><TableRow><TableCell>Project</TableCell><TableCell>Tech</TableCell><TableCell align="right">Action</TableCell></TableRow></TableHead>
              <TableBody>
                {projects.map(p => (
                  <TableRow key={p._id}>
                    <TableCell><b>{p.title}</b></TableCell>
                    <TableCell>{p.tech.join(", ")}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => {setEditProject(p._id); setProjectForm({...p, tech: p.tech.join(", ")});}}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={async () => { if (confirm("Delete?")) { await axios.delete(`${API}/projects/${p._id}`, authHeaders); fetchAll(); }}}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        {/* Tab 4: Skills Matrix */}
        {tab === 4 && (
          <Box>
            <Paper sx={{ p: 3, mb: 4, borderRadius: 4 }}>
              <form onSubmit={async (e) => {
                e.preventDefault();
                await axios.post(`${API}/skills`, { name: skillForm.name, percentage: Number(skillForm.percentage) }, authHeaders);
                setSkillForm({ name: "", percentage: "" });
                fetchAll();
              }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField label="Skill Name" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} required />
                  <TextField label="Level %" type="number" value={skillForm.percentage} onChange={e => setSkillForm({...skillForm, percentage: e.target.value})} required />
                  <Button type="submit" variant="contained">Add</Button>
                </Box>
              </form>
            </Paper>
            <Grid container spacing={2}>
              {skills.map(s => (
                <Grid size={{ xs: 12, md: 6 }} key={s._id}>
                  <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 3 }}>
                    <Box><Typography fontWeight={700}>{s.name}</Typography><Typography color="primary">{s.percentage}%</Typography></Box>
                    <IconButton color="error" onClick={async () => { await axios.delete(`${API}/skills/${s._id}`, authHeaders); fetchAll(); }}><DeleteIcon /></IconButton>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Tab 5: Inquiries / Messages */}
        {tab === 5 && (
          <Box>
            <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, border: "1px solid #e2e8f0" }}>
              <form onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  await axios.put(`${API}/profile`, profile, authHeaders);
                  setProfileMsg("✅ Contact Information Saved!");
                } catch {
                  setProfileMsg("❌ Error saving contact info");
                } finally {
                  setLoading(false);
                }
              }}>
                <Typography variant="h6" mb={3} fontWeight={800}>Quick Edit: Contact Information</Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="Contact Section Title" value={profile.contactSectionTitle || ""} onChange={e => setProfile({...profile, contactSectionTitle: e.target.value})} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="Contact Main Title" value={profile.contactMainTitle || ""} onChange={e => setProfile({...profile, contactMainTitle: e.target.value})} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="Contact Email" value={profile.contactEmail || ""} onChange={e => setProfile({...profile, contactEmail: e.target.value})} /></Grid>
                  <Grid size={{ xs: 6 }}><TextField fullWidth label="Phone Number" value={profile.phone || ""} onChange={e => setProfile({...profile, phone: e.target.value})} /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="Physical Address" value={profile.address || ""} onChange={e => setProfile({...profile, address: e.target.value})} /></Grid>
                </Grid>
                <Button type="submit" variant="contained" sx={{ mt: 3, py: 1.5, px: 4, borderRadius: 3, fontWeight: 700 }}>SAVE CONTACT INFO</Button>
                {profileMsg && <Alert severity={profileMsg.includes('❌') ? "error" : "success"} sx={{ mt: 3, borderRadius: 3 }}>{profileMsg}</Alert>}
              </form>
            </Paper>

            <Typography variant="h6" mb={2} fontWeight={800} color="#1e293b">User Messages</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sender</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {messages.map(m => (
                <TableRow key={m._id}>
                  <TableCell><b>{m.name}</b><br/>{m.email}</TableCell>
                  <TableCell>{m.message}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Reply">
                      <IconButton color="primary" onClick={() => handleOpenReply(m)}>
                        <ReplyIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Box>
        )}

        {/* Tab 6: UI & Branding */}
        {tab === 6 && (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid #e2e8f0" }}>
             <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              try { await axios.put(`${API}/profile`, profile, authHeaders); setProfileMsg("✅ UI Branding Saved!"); }
              catch { setProfileMsg("❌ Error"); } finally { setLoading(false); }
            }}>
              <Typography variant="h6" mb={3}>Global Branding</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="Logo Text" value={profile.logoText} onChange={e => setProfile({...profile, logoText: e.target.value})} /></Grid>
                <Grid size={{ xs: 6 }} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <TextField fullWidth label="Resume URL (PDF)" value={profile.resumeUrl} onChange={e => setProfile({...profile, resumeUrl: e.target.value})} />
                  <input
                    type="file"
                    id="resume-upload"
                    hidden
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, "resumeUrl")}
                  />
                  <Button 
                    variant="contained" 
                    onClick={() => document.getElementById("resume-upload").click()} 
                    sx={{ minWidth: 120, height: 56, borderRadius: 3 }}
                    startIcon={<UploadIcon />}
                  >
                    UPLOAD
                  </Button>
                </Grid>
                <Grid size={{ xs: 12 }}><Divider>Theme Colors & Brand Info</Divider></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="Primary Color" type="color" value={profile.primaryColor} onChange={e => setProfile({...profile, primaryColor: e.target.value})} /></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="Secondary Color" type="color" value={profile.secondaryColor} onChange={e => setProfile({...profile, secondaryColor: e.target.value})} /></Grid>
                
                <Grid size={{ xs: 12 }} sx={{ mt: 3 }}><Divider>Contact & Footer Information</Divider></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="Contact Email" value={profile.contactEmail} onChange={e => setProfile({...profile, contactEmail: e.target.value})} /></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="Phone Number" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} /></Grid>
                <Grid size={{ xs: 12 }}><TextField fullWidth label="Physical Address" value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} /></Grid>
                <Grid size={{ xs: 12 }}><TextField fullWidth label="Footer Copyright/Text" multiline rows={2} value={profile.footerText} onChange={e => setProfile({...profile, footerText: e.target.value})} /></Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 5, py: 1.5, px: 4, borderRadius: 3, fontWeight: 700 }}>UPDATE BRANDING & CONTACTS</Button>
            </form>
          </Paper>
        )}

        {/* Tab 7: Label Editor */}
        {tab === 7 && (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid #e2e8f0" }}>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              try { await axios.put(`${API}/profile`, profile, authHeaders); setProfileMsg("✅ Labels Saved!"); }
              catch { setProfileMsg("❌ Error"); } finally { setLoading(false); }
            }}>
              <Typography variant="h6" mb={3}>Section Heading Overrides</Typography>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}><Typography variant="subtitle2" fontWeight={800} color="primary">HERO SECTION</Typography></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="GitHub Button Label" value={profile.heroGithubLabel} onChange={e => setProfile({...profile, heroGithubLabel: e.target.value})} /></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="LinkedIn Button Label" value={profile.heroLinkedinLabel} onChange={e => setProfile({...profile, heroLinkedinLabel: e.target.value})} /></Grid>
                <Grid size={{ xs: 12 }}><Divider /></Grid>
                <Grid size={{ xs: 12 }}><Typography variant="subtitle2" fontWeight={800} color="primary">SKILLS SECTION</Typography></Grid>
                <Grid size={{ xs: 12 }}><TextField fullWidth label="Main Title" value={profile.skillsTitle} onChange={e => setProfile({...profile, skillsTitle: e.target.value})} /></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="Subtitle 1" value={profile.skillsSubtitle1} onChange={e => setProfile({...profile, skillsSubtitle1: e.target.value})} /></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="Subtitle 2" value={profile.skillsSubtitle2} onChange={e => setProfile({...profile, skillsSubtitle2: e.target.value})} /></Grid>
                <Grid size={{ xs: 12 }}><Divider /></Grid>
                <Grid size={{ xs: 12 }}><Typography variant="subtitle2" fontWeight={800} color="primary">PROJECTS SECTION</Typography></Grid>
                <Grid size={{ xs: 12 }}><TextField fullWidth label="Main Title" value={profile.projectsTitle} onChange={e => setProfile({...profile, projectsTitle: e.target.value})} /></Grid>
                <Grid size={{ xs: 12 }}><Divider /></Grid>
                <Grid size={{ xs: 12 }}><Typography variant="subtitle2" fontWeight={800} color="primary">CONTACT SECTION</Typography></Grid>
                <Grid size={{ xs: 12 }}><TextField fullWidth label="Main Title" value={profile.contactMainTitle} onChange={e => setProfile({...profile, contactMainTitle: e.target.value})} /></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="Section Title" value={profile.contactSectionTitle} onChange={e => setProfile({...profile, contactSectionTitle: e.target.value})} /></Grid>
                <Grid size={{ xs: 6 }}><TextField fullWidth label="Form Heading" value={profile.contactFormTitle} onChange={e => setProfile({...profile, contactFormTitle: e.target.value})} /></Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 5, py: 1.5, px: 4, borderRadius: 3, fontWeight: 700 }}>UPDATE LABELS</Button>
              {profileMsg && <Alert severity="success" sx={{ mt: 3, borderRadius: 3 }}>{profileMsg}</Alert>}
            </form>
          </Paper>
        )}

        {/* Tab 8: Dynamic Sections Editor */}
        {tab === 8 && (
          <Box>
            <Paper sx={{ p: 4, mb: 4, borderRadius: 6, border: "1px solid #e2e8f0" }}>
              <Typography variant="h6" fontWeight={800} mb={3}>{editSection ? "Edit Custom Section" : "Create Custom Section"}</Typography>
              <form onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  if (editSection) {
                    await axios.put(`${API}/sections/${editSection}`, sectionForm, authHeaders);
                    setProfileMsg("✅ Section Updated!");
                  } else {
                    await axios.post(`${API}/sections`, { ...sectionForm, order: sections.length }, authHeaders);
                    setProfileMsg("✅ Section Created!");
                  }
                  setSectionForm({ title: "", subtitle: "", content: "", image: "", order: 0 });
                  setEditSection(null);
                  fetchAll();
                } catch {
                  setProfileMsg("❌ Failed to save section");
                } finally {
                  setLoading(false);
                }
              }}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="Section Title (e.g., Experience)" value={sectionForm.title || ""} onChange={e => setSectionForm({...sectionForm, title: e.target.value})} required /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="Subtitle (Optional)" value={sectionForm.subtitle || ""} onChange={e => setSectionForm({...sectionForm, subtitle: e.target.value})} /></Grid>
                  <Grid size={{ xs: 12 }} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <TextField fullWidth label="Image URL (Optional)" value={sectionForm.image || ""} onChange={e => setSectionForm({...sectionForm, image: e.target.value})} />
                    <input type="file" id={`section-image-upload`} hidden accept="image/*" onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append("file", file);
                        setLoading(true);
                        try {
                          const res = await axios.post(`${API}/upload`, formData, { headers: { ...authHeaders.headers, "Content-Type": "multipart/form-data" } });
                          setSectionForm({ ...sectionForm, image: res.data.url });
                        } catch (err) { console.error(err); }
                        finally { setLoading(false); }
                    }} />
                    <Button variant="contained" onClick={() => document.getElementById(`section-image-upload`).click()} sx={{ minWidth: 120, height: 56, borderRadius: 3 }} startIcon={<UploadIcon />}>UPLOAD</Button>
                  </Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth multiline rows={8} label="Section Content (Supports basic text or HTML)" value={sectionForm.content || ""} onChange={e => setSectionForm({...sectionForm, content: e.target.value})} required /></Grid>
                </Grid>
                <Button type="submit" variant="contained" sx={{ mt: 3, py: 1.5, px: 4, borderRadius: 3, fontWeight: 700 }}>
                  {editSection ? "Update Section" : "Add Section"}
                </Button>
                {editSection && (
                  <Button variant="outlined" color="secondary" sx={{ mt: 3, ml: 2, py: 1.5, px: 4, borderRadius: 3 }} onClick={() => { setEditSection(null); setSectionForm({ title: "", subtitle: "", content: "", image: "", order: 0 }); }}>
                    Cancel
                  </Button>
                )}
                {profileMsg && <Alert severity={profileMsg.includes('❌') ? "error" : "success"} sx={{ mt: 3, borderRadius: 3 }}>{profileMsg}</Alert>}
              </form>
            </Paper>

            <Grid container spacing={3}>
              {sections.map((s, index) => (
                <Grid size={{ xs: 12 }} key={s._id}>
                  <Paper 
                    draggable
                    onDragStart={(e) => {
                      setDraggingIndex(index);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (draggingIndex !== null && draggingIndex !== index) {
                        setDragOverIndex(index);
                      }
                    }}
                    onDragLeave={() => setDragOverIndex(null)}
                    onDrop={async (e) => {
                      e.preventDefault();
                      setDragOverIndex(null);
                      if (draggingIndex === null || draggingIndex === index) return;
                      
                      const newSections = [...sections];
                      const draggedItem = newSections[draggingIndex];
                      newSections.splice(draggingIndex, 1);
                      newSections.splice(index, 0, draggedItem);
                      
                      newSections.forEach((sec, i) => sec.order = i);
                      setSections(newSections);
                      
                      setLoading(true);
                      try {
                        const payload = newSections.map(sec => ({ id: sec._id, order: sec.order }));
                        await axios.put(`${API}/sections/reorder`, { sections: payload }, authHeaders);
                        setProfileMsg("✅ Sections reordered successfully!");
                      } catch {
                        setProfileMsg("❌ Reorder failed");
                      } finally {
                        setLoading(false);
                        setDraggingIndex(null);
                      }
                    }}
                    onDragEnd={() => {
                        setDraggingIndex(null);
                        setDragOverIndex(null);
                    }}
                    sx={{ 
                        p: 3, 
                        borderRadius: 4, 
                        border: dragOverIndex === index ? "2px dashed #3b82f6" : "1px solid #e2e8f0", 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "flex-start", 
                        cursor: "grab", 
                        opacity: draggingIndex === index ? 0.4 : 1, 
                        transition: "all 0.2s",
                        bgcolor: dragOverIndex === index ? "#eff6ff" : "white"
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                      <DragIndicator sx={{ color: "#cbd5e1", mr: 2 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, mr: 2 }}>
                      <Typography variant="h6" fontWeight={800} color="primary" sx={{ mb: 1 }}>{s.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
                        {s.content.length > 150 ? `${s.content.substring(0, 150)}...` : s.content}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton color="primary" onClick={() => { setEditSection(s._id); setSectionForm({ title: s.title, subtitle: s.subtitle || "", content: s.content, image: s.image || "", order: s.order }); }}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={async () => { if(confirm("Delete this section?")) { await axios.delete(`${API}/sections/${s._id}`, authHeaders); fetchAll(); } }}><DeleteIcon /></IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Reply Dialog */}
        <Dialog open={replyDialogOpen} onClose={() => setReplyDialogOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 800 }}>Reply to {selectedMessage?.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2, color: "#64748b" }}>
              Original: "{selectedMessage?.message}"
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Your Response"
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setReplyDialogOpen(false)} sx={{ fontWeight: 700 }}>Cancel</Button>
            <Button 
              onClick={handleSendReply} 
              variant="contained" 
              disabled={loading || !replyText.trim()}
              sx={{ fontWeight: 800, px: 4, borderRadius: 2 }}
            >
              Send Reply
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Admin;
