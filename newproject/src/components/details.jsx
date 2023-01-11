import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [],
    };
  }
  componentDidMount() {
    const { UserId } = this.props.params;
    axios
      .get("http://localhost:5137/useritemsid/" + UserId)
      .then(({ data }) => {
        this.setState({
          details: data,
        });
      });
  }
  render() {
    return (
      <Paper
        className="Details"
        elevation={16}
        style={{ minWidth: "320spx", margin: "20px", padding: "20px" }}
      >
        <Typography color="#2B3A55" variant="h5" style={style}>
          {this.state.details.name} Details
        </Typography>
        <div className="avatarFlex" style={avatar}>
          <Avatar
            style={{
              backgroundColor: this.state.details.avatarColor,
              width: 100,
              height: 100,
            }}
          />
          <TableContainer style={{ marginTop: 10, marginBottom: 20 }}>
            <Table className="tableStyle" size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Id:</TableCell>
                  <TableCell>{this.state.details.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name:</TableCell>
                  <TableCell>{this.state.details.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>LastName:</TableCell>
                  <TableCell>{this.state.details.lastName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Age:</TableCell>
                  <TableCell>{this.state.details.age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Email:</TableCell>
                  <TableCell>{this.state.details.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ textAlign: "right" }}>
          <Button variant="contained" color="primary">
            <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>
              back
            </Link>
          </Button>
        </div>
      </Paper>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
  flexdirection: "column",
};
const avatar = {
  display: "flex",
  justifyContent: "left",
  flexdirection: "row",
  alignItems: "center",
  gap: 50,
};

export default withParams(Details);
