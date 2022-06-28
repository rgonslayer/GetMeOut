import React from "react";

class ICDetail extends React.Component {
  render() {
    const { username, location } = this.props.friend;
    return (
      <div>
        <div>Username: {username}</div>
        <div>Location: {location}</div>
        <button onClick={this.props.removeFromIC}>
          Remove from Inner Circle
        </button>
      </div>
    );
  }
}

export default ICDetail;