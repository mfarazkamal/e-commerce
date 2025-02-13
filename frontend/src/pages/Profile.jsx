import { useState, useEffect, useContext } from "react";
import { Container, Paper, Typography, Button, TextField, List, ListItem, ListItemText, Divider, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";

const ProfilePage = () => {
  const [section, setSection] = useState("view");
  const {user, setUser} = useContext(AuthContext);
  const [editUser, setEditUser] = useState({ name: "", address: ""});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const userId = "user-id-from-auth"; // Replace with actual user ID from auth state or context

  useEffect(()=>{
    if(user.email){
      setEditUser({ name: user.username, address: user.address});
    }
  }, [user])

  useEffect(() => {


    const fetchUserOrders = async () => {
      try {
        const response = await axios.get("/api/orders/");
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };

    fetchUserOrders();
  }, [userId]);

  const handleUpdate = async () => {
    if(editUser.name.length === 0 || editUser.address.length === 0){
      setError("Please fill in all fields");
    }
    try {
      await axios.put(`/api/user/${userId}`, {
        name: editUser.name,
        address: editUser.address,
      });
      setUser({ ...user, name: editUser.name, address: editUser.address });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      setError("Failed to update profile");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={3}>
        <Box flexShrink={0} width={isMobile ? "100%" : "25%"}>
          <Paper style={{ padding: 10 }}>
            <List>
              <ListItem button onClick={() => setSection("view")}><ListItemText primary="View Details" /></ListItem>
              <ListItem button onClick={() => setSection("update")}><ListItemText primary="Update Details" /></ListItem>
              <ListItem button onClick={() => setSection("orders")}><ListItemText primary="View Orders" /></ListItem>
              <Divider />
              <ListItem button><ListItemText primary="Logout" /></ListItem>
            </List>
          </Paper>
        </Box>
        <Box flexGrow={1}>
          <Paper style={{ padding: 20 }}>
            {section === "view" && (
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Typography variant="h5" fontWeight="bold" textAlign="center" width="100%">User Details</Typography>
                {user && ["Name", "Email", "Address",  "Orders Placed"].map((field, index) => (
                  <Card key={index} style={{ width: "100%" }}>
                    <CardContent>
                      <Typography variant="body1" style={{ fontSize: isMobile ? "14px" : "16px" }}>
                        <strong>{field}:</strong> {field === "Name" ? user.username : field === "Email" ? user.email : field === "Address" ? user.address : field === "Registered On" ? user.createdAt : orders.length}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}

            {section === "update" && (
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" gap={2}>
                <Typography  variant="h5" fontWeight="bold">Update Profile</Typography>
                <TextField error={editUser.name.length === 0} helperText={"Name is required"} label="Name" fullWidth margin="normal" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
                <TextField error={editUser.address.length === 0} helperText={"Address is required"} label="Address" fullWidth margin="normal" value={editUser.address} onChange={(e) => setEditUser({ ...editUser, address: e.target.value })} />
                <Button disabled={editUser.name.length === 0 || editUser.address.length === 0} variant="contained" color="primary" onClick={handleUpdate} style={{ marginTop: 10 }}>Update</Button>
              </Box>
            )}

            {section === "orders" && (
              <Box>
                <Typography variant="h5" fontWeight="bold" textAlign="center">Your Orders</Typography>
                <TableContainer component={Paper} style={{ marginTop: 10 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Order ID</strong></TableCell>
                        <TableCell><strong>Product Name</strong></TableCell>
                        <TableCell><strong>Order Date</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
