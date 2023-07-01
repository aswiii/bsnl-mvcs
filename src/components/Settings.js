import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [pin, setPIN] = useState("1234");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [allowChairpersonView, setAllowChairpersonView] = useState("Yes");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPIN, setUpdatedPIN] = useState("");
  const [updatedTelephone, setUpdatedTelephone] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedAllowChairpersonView, setUpdatedAllowChairpersonView] = useState("Yes");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setUpdatedName(name);
    setUpdatedPIN(pin);
    setUpdatedTelephone(telephone);
    setUpdatedEmail(email);
    setUpdatedAllowChairpersonView(allowChairpersonView);
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      setShowChangePassword(false);
      // Update password logic
      console.log("Password changed successfully!");
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setName(updatedName);
    setPIN(updatedPIN);
    setTelephone(updatedTelephone);
    setEmail(updatedEmail);
    setAllowChairpersonView(updatedAllowChairpersonView);
    // Update settings logic
    console.log("Settings saved successfully!");
  };

  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const generateRandomNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  // Set initial values for non-editable fields
  if (!isEditing && name === "") {
    setName(generateRandomString());
  }

  if (!isEditing && telephone === "") {
    setTelephone(generateRandomNumber());
  }

  return (
    <Box p={2}>
      <Paper elevation={2}>
        <Box p={2}>
          <Typography variant="h5" gutterBottom>
            Account Settings
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={isEditing ? updatedName : name}
                onChange={(e) => setUpdatedName(e.target.value)}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="PIN"
                value={isEditing ? updatedPIN : pin}
                onChange={(e) => setUpdatedPIN(e.target.value)}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Telephone"
                value={isEditing ? updatedTelephone : telephone}
                onChange={(e) => setUpdatedTelephone(e.target.value)}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                value={isEditing ? updatedEmail : email}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <InputLabel>Allow Chairperson View</InputLabel>
                <Box mt={1} display="flex" flexDirection="row" flexWrap="wrap">
                  <FormControlLabel
                    value="Yes"
                    control={
                      <RadioBubble
                        checked={isEditing ? updatedAllowChairpersonView === "Yes" : allowChairpersonView === "Yes"}
                        onChange={(e) => setUpdatedAllowChairpersonView(e.target.value)}
                        disabled={!isEditing}
                        label="Yes"
                      />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    value="No"
                    control={
                      <RadioBubble
                        checked={isEditing ? updatedAllowChairpersonView === "No" : allowChairpersonView === "No"}
                        onChange={(e) => setUpdatedAllowChairpersonView(e.target.value)}
                        disabled={!isEditing}
                        label="No"
                      />
                    }
                    label="No"
                  />
                </Box>
              </FormControl>
            </Grid>
            {!isEditing && (
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={toggleEditing}>
                  Edit
                </Button>
                <Button variant="contained" color="primary" onClick={handleChangePassword}>
                  Change Password
                </Button>
              </Grid>
            )}
            {isEditing && (
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="contained" onClick={toggleEditing}>
                  Cancel
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>
      {showChangePassword && (
        <Paper elevation={2} style={{ marginTop: "16px" }}>
          <Box p={2}>
            <Typography variant="h5" gutterBottom>
              Change Password
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Current Password</InputLabel>
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button onClick={toggleShowCurrentPassword}>
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>New Password</InputLabel>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button onClick={toggleShowNewPassword}>
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Confirm Password</InputLabel>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button onClick={toggleShowConfirmPassword}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {passwordMatchError && (
                  <Typography variant="body2" color="error" style={{ marginTop: "8px" }}>
                    Passwords do not match.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handlePasswordSave}>
                  Save Password
                </Button>
                <Button variant="contained" onClick={() => setShowChangePassword(false)}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

function RadioBubble({ checked, onChange, disabled, label }) {
  return (
    <Button
      variant={checked ? "contained" : "outlined"}
      color={checked ? "primary" : "default"}
      onClick={onChange}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}

export default Settings;
