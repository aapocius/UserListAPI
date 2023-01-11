import React from "react";
import Avatar from "@mui/material/Avatar";

class AvatarColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: props.name[0],
      color: this.generateRandomColor(),
    };
  }

  generateRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    return (
      <Avatar
        className="Avatar"
        style={{ backgroundColor: this.state.color, color: "white" }}
      >
        {this.state.letter}
      </Avatar>
    );
  }
}

export default AvatarColor;
