import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

export default class AddItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { item: null, error: null };
    this.addItem = this.addItem.bind(this);
  }

  addItem(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5137/useritemsid/", {
        Name: event.target.itemName.value,
        Age: event.target.itemAge.value,
        LastName: event.target.itemLastName.value,
        Email: event.target.itemEmail.value,
        AvatarColor: generateRandomColor(),
      })
      .then(({ data }) => {
        this.setState({ item: data, error: null });
      });
  }
  render() {
    let { item } = this.state;
    return (
      <Paper
        className="items"
        elevation={16}
        style={{
          width: "50%",
          minWidth: "320px",
          margin: "20px",
          padding: "20px",
        }}
      >
        <Typography color="#2B3A55" variant="h5" style={style}>
          Add User
        </Typography>
        <form onSubmit={this.addItem}>
          {item && <Navigate to="/" replace={true} />}
          <div className="lyg">
            <TextField
              fullWidth
              margin="none"
              required
              variant="standard"
              id="itemName"
              label="First Name"
              type="text"
              size="small"
              autoFocus
            />

            <TextField
              size="small"
              fullWidth
              margin="none"
              variant="standard"
              id="itemLastName"
              label="Last Name"
              type="text"
              required
            />

            <TextField
              size="small"
              variant="standard"
              fullWidth
              margin="none"
              id="itemAge"
              label="Age"
              type="number"
              required
            />
            <TextField
              size="small"
              variant="standard"
              fullWidth
              margin="none"
              id="itemEmail"
              label="Email"
              type="email"
            />
          </div>
          <div className="FormButtons">
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="contained" color="inherit">
              <Link style={{ color: "black", textDecoration: "none" }} to={"/"}>
                cancel
              </Link>
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
  flexdirection: "column",
};
