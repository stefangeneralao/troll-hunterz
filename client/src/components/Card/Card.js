import React from "react";
import "./Card.scss";
import ProfileListItem from "../ProfileListItem/ProfileListItem";

/**
 * Component containing all the ProfileListItems.
 */

class Card extends React.Component {
  render() {
    const { entries } = this.props;
    const listItems = entries.map(entry => (
      <ProfileListItem entry={entry} key={entry.channelId} />
    ));

    return (
      <div className="BaseCard">
        <h2>{this.props.title}</h2>
        {listItems}
      </div>
    );
  }
}

export default Card;
