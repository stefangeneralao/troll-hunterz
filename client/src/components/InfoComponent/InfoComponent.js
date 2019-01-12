import React from "react";
import "./InfoComponent.scss";

class InfoComponent extends React.Component {
  render() {
    return (
      <div className="info-component">
        <h3>About Troll-Hunterz</h3>
        <p>
          You can search on a YouTube-channel and Troll-Hunterz will dislay a
          sentimental score based on comments in that channels top 10 most
          popular videos.
        </p>
      </div>
    );
  }
}

export default InfoComponent;
