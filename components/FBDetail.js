import React from "react";

class FBDetail extends React.Component {
  render() {
    const { username, location } = this.props.friend;
    return (
      <div>
        <div>Username: {username}</div>
        <div>Location: {location}</div>
        <button onClick={this.props.addToIC}>Add to Friends</button>
      </div>
    );
  }
}

export default FBDetail;