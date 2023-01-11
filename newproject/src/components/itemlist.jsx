import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchTerm: "",
    };
  }
  componentDidMount() {
    this.refreshData();
  }
  refreshData() {
    axios.get("http://localhost:5137/useritemsid").then(({ data }) => {
      this.setState({
        items: data,
      });
    });
  }

  delete(id) {
    axios
      .delete("http://localhost:5137/useritemsid/" + id)
      .then(() => this.refreshData());
  }

  //  update the search
  handleSearchTermChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    // filter the list
    const filteredItems = this.state.items.filter((item) =>
      item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );

    return (
      <Paper
        elevation={16}
        style={{
          width: "100%",
          minWidth: "200px",
          margin: "20px",
          padding: "20px",
        }}
      >
        <Typography color="#2B3A55" variant="h5" style={style}>
          User List
        </Typography>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
                type="text"
                placeholder="Search by Name..."
                value={this.state.searchTerm}
                onChange={this.handleSearchTermChange.bind(this)}
              />
            </Grid>
            <Grid item>
              <Button size="small" variant="contained" color="primary">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/addItem"
                >
                  Add User
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <Table>
          <TableBody>
            {/* filtered list */}
            {filteredItems.map((item) => (
              <TableRow style={{ cursor: "pointer" }} hover key={item.id}>
                <TableCell width="10%">
                  <Avatar style={{ backgroundColor: item.avatarColor }}>
                    {item.name.substring(0, 1).toUpperCase()}
                  </Avatar>
                </TableCell>
                <TableCell
                  onClick={() => (window.location.href = `/items/${item.id}`)}
                >
                  <Typography color="#2B3A55" fontFamily="Roboto" width="80%">
                    {item.name.substring(0, 1).toUpperCase() +
                      item.name.substring(1)}
                    &nbsp;
                    {item.lastName.substring(0, 1).toUpperCase() +
                      item.lastName.substring(1)}
                  </Typography>
                </TableCell>

                <TableCell width="10%">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => this.delete(item.id)}
                  >
                    <DeleteIcon sx={{ "&:hover": { color: "maroon" } }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
};
