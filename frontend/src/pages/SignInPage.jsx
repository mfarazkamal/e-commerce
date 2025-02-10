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
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";

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

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/user/login", formData);

      console.log("Login successful:", response.data);
      setUser(response.data);
      localStorage.setItem("token", response.data.token); // Save token for authentication
      navigate("/profile"); // Redirect to dashboard/home page
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid email or password");
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
              LOGIN
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button
              disabled={formData.email === "" || formData.password === ""}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type="submit"
              sx={{ mt: 2 }}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </FormContainer>
        </Box>

        {/* Image Section */}
        <Box sx={{ flex: 1 }}>
          <StyledCard>
            <CardMedia
              component="img"
              height="400"
              image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Sign up illustration"
              sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Join Us Today!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign up for a free account and start your journey with us!{" "}
                <Link to="/register">Sign Up</Link>
              </Typography>
            </CardContent>
          </StyledCard>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
