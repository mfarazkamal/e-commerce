import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Container,
  } from "@mui/material";
  import { styled } from "@mui/system";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import axios from "axios";
  
  const StyledCard = styled(Card)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "15px",
    overflow: "hidden",
  });
  
  const FormContainer = styled(Box)({
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "400px",
    margin: "0 auto",
  });
  


  const SignUpAdmin = () => {
    const [formData, setFormData] = useState({
      username: "",
      address: "",
      email: "",
      user_type: "admin",
      password: "",
      confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
  
      setLoading(true);
  
      try {
        const response = await axios.post("/api/user/admin", {
          username: formData.username,
          address: formData.address,
          email: formData.email,
          password: formData.password,
          user_type: formData.user_type
        });
  
        console.log("User registered:", response.data);
        alert("Registration successful! You can now log in as an admin.");
      } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Container maxWidth="lg" sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, width: "100%" }}>
          {/* Form Section */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <FormContainer component="form" onSubmit={handleSubmit}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Create Account
              </Typography>
              {error && <Typography color="error">{error}</Typography>}
  
              <TextField fullWidth label="Full Name" name="username" value={formData.username} onChange={handleChange} required />
              <TextField fullWidth label="Your Address" name="address" value={formData.address} onChange={handleChange} required />
              <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <TextField fullWidth label="User Type"  name="user_type" value="admin" onChange={handleChange} required />
              <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
              <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
  
              <Button disabled={formData.username === "" || formData.address === "" || formData.email === "" || formData.password === "" || formData.confirmPassword === ""} variant="contained" color="primary" fullWidth size="large" type="submit" sx={{ mt: 2 }}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </FormContainer>
          </Box>
  
          {/* Image Section */}
          <Box sx={{ flex: 1 }}>
            <StyledCard>
              <CardMedia
                component="img"
                height="400"
                image="https://images.unsplash.com/photo-1449247666642-264389f5f5b1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Sign up illustration"
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Login to continue your buying journey.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Already have an account? <Link to="/login">Sign In</Link>
                </Typography>
              </CardContent>
            </StyledCard>
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default SignUpAdmin;
  