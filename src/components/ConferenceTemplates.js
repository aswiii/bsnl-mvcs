import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
} from "@material-ui/core";
import { Add, Edit, Delete, Search, InfoOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import Homenavbarlite from "./Homenavbarlite";
const ConferenceTemplateList = require("../api/ConferenceTemplateList");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
    textAlign: "left",
    marginBottom: 40,
    marginTop: 40,
  },
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
  },
  searchInput: {
    background: "white",
    borderRadius: 20,
    width: "50%",
    padding: "1vh 0.8vw",
  },
  tableContainer: {
    marginTop: 8,
    maxHeight: "100vh",
  },
  tableBody: {
    overflowY: "auto",
  },
  tableHeaderCell: {
    backgroundColor: "#0161b0",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
  },
  tableCell: {
    fontFamily: "Poppins, sans-serif",
  },
  tableRow: {
    "&:nth-child(even)": {
      backgroundColor: "#D9D9D9",
    },
    "&:nth-child(odd)": {
      backgroundColor: "white",
    },
  },
  startButton: {
    backgroundColor: "#0161b0",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
    borderRadius: 15,
  },
  scheduleButton: {
    backgroundColor: "#0ce23b",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
  },
  tableCellButtons: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));
function getCookie(cookieName) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(":");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }

  return null; // Return null if the cookie is not found
}

const token = getCookie("user");

const ConferenceTemplates = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [templateData, setTemplateData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    ConferenceTemplateList(token)
      .then((res) => {
        const templateArray = Object.values(res)
          .filter((value) => typeof value === "object")
          .map((template) => template);
        setTemplateData(templateArray);
      })
      .catch((err) => {
        console.log(
          "Could not fetch template details. Please try again later."
        );
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTemplates = templateData.filter((template) => {
    const templateName = template.TemplateName.toLowerCase();
    const query = searchQuery.toLowerCase();
    return templateName.includes(query);
  });

  const handleCreateTemplate = () => {
    navigate("/home/createTemplate");
  };

  const handleStartNow = () => {
    // logic to start conference
  };

  const handleSchedule = () => {
    // logic to schedule conference
  };

  const handleEditTemplate = () => {
    // logic to edit template
  };

  const handleDeleteTemplate = () => {
    // logic to delete template
  };

  return (
    <div className={classes.root}>
      <Homenavbarlite />
      <Container>
        <Typography variant="h5" className={classes.title}>
          Conference Templates
        </Typography>
        <div className={classes.section}>
          <TextField
            placeholder="Search..."
            className={classes.searchInput}
            InputProps={{
              startAdornment: <Search />,
              disableUnderline: true,
              style: {
                fontFamily: "Poppins, sans-serif",
                fontSize: "1vw",
              },
            }}
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#0161b0",
              color: "white",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.9vw",
              borderRadius: 10,
              padding: "1vh 1vw",
              textTransform: "capitalize",
            }}
            startIcon={<Add />}
            onClick={handleCreateTemplate}
          >
            Create Template
          </Button>
        </div>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Duration
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Participants
                </TableCell>
                <TableCell className={classes.tableHeaderCell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {filteredTemplates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No templates found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTemplates.map((template, key) => (
                  <TableRow key={key} className={classes.tableRow}>
                    <TableCell className={classes.tableCell}>
                      {template.TemplateName}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {template.Length}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {template.Parties}{" "}
                      <IconButton className={classes.infoButton}>
                        <InfoOutlined />
                      </IconButton>
                    </TableCell>
                    <TableCell className={classes.tableCellButtons}>
                      <Button
                        variant="contained"
                        className={classes.startButton}
                        onClick={handleStartNow}
                      >
                        Start now
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.scheduleButton}
                        onClick={handleSchedule}
                      >
                        Schedule
                      </Button>
                      <IconButton onClick={handleEditTemplate}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={handleDeleteTemplate}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default ConferenceTemplates;
