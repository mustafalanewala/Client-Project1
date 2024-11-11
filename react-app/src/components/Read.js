import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { readUsers, deleteUser } from "./../services/user";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  appBar: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#2196f3",
  },
  title: {
    flexGrow: 1,
  },
  greeting: {
    marginRight: theme.spacing(2),
    fontWeight: "bold",
  },
  addButton: {
    marginBottom: theme.spacing(2),
    color: "#fff",
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  },
  tableContainer: {
    maxWidth: "80%",
    margin: "auto",
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
    "& th": {
      backgroundColor: "#f5f5f5",
      fontWeight: "bold",
    },
    "& th, & td": {
      padding: theme.spacing(2),
      textAlign: "center",
    },
  },
  iconButton: {
    cursor: "pointer",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  dialogContent: {
    width: "100%",
    maxWidth: 400,
    margin: "auto",
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
}));

function Read() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    loadUsers();
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const loadUsers = () => {
    readUsers().then(
      (data) => {
        setUsers(data || []);
      },
      (error) => {
        console.error("Error loading users:", error);
      }
    );
  };

  const openDialog = (_id) => {
    setOpen(true);
    setUserId(_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    deleteUser(userId).then(
      () => {
        setUsers(users.filter((user) => user._id !== userId));
        setOpen(false);
      },
      (error) => {
        console.error("Error deleting user:", error);
      }
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            React CRUD Application
          </Typography>
          <Typography variant="body1" className={classes.greeting}>
            Hey, {username}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Link to="/create" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          className={classes.addButton}
          startIcon={<AddIcon />}
        >
          Create Employee
        </Button>
      </Link>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.state}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(user.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link to={`/update/${user._id}`}>
                    <EditIcon className={classes.iconButton} />
                  </Link>
                </TableCell>
                <TableCell>
                  <DeleteIcon
                    className={`${classes.iconButton} ${classes.deleteButton}`}
                    onClick={() => openDialog(user._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="delete-user-dialog"
        >
          <DialogContent className={classes.dialogContent}>
            <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default Read;
