import React from "react";
import FBDetail from "../components/FBDetail";
import ICDetail from "../components/ICDetail";
import { supabase } from "../utils/supabaseClient";

export const getFriends = async () => {
    const {data} = await supabase
    .from('profiles')
    .select("*") 
    return data;
    
};

const mockData = [
  {
    id:'f7103064-fd60-446e-8dbb-58937b46739b',
    username: "Dylen",
    location: "Singapore"
  }
];




class friend extends React.Component {
  state = {
    friends: [],
    innerCircle: []
  };

  componentDidMount() {
    this.setState({ friends: mockData });
  }

  addToIC = id => {
    this.setState(state => ({
      innerCircle:
        state.innerCircle.indexOf(id) < 0
          ? [...state.innerCircle, id]
          : [...state.innerCircle]
    }));
  };

  removeFromIC = id => {
    this.setState(state => ({
      innerCircle: [...state.innerCircle.filter(ele => ele !== id)]
    }));
  };

  render() {
    getFriends().then(console.log)
    const { friends, innerCircle } = this.state;
    return (
      <div>
        <div>
          <h2>Friend Search</h2>
          {friends.map(friend => {
            return (
              <FBDetail
                key={friend.id}
                friend={friend}
                addToIC={() => this.addToIC(friend.id)}
              />
            );
          })}
        </div>
        <div>
          <h2>My friends</h2>
          {friends
            .filter(friend => innerCircle.some(id => id === friend.id))
            .map(friend => {
              return (
                <ICDetail
                  key={friend.id}
                  friend={friend}
                  removeFromIC={() => this.removeFromIC(friend.id)}
                />
              );
            })}
        </div>
      </div>
    );
  }

}
export default friend;