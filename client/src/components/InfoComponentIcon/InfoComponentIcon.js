import React from "react";
import InfoIcon from "../../images/baseline_info_white_48dp.png";
import "./InfoComponentIcon.scss";
import { animateScroll } from "react-scroll";

class InfoComponentIcon extends React.Component {
  render() {
    const scrollToBottom = () => {
      animateScroll.scrollToBottom();
    };

    return (
      <div className="info-component-icon">
        <img
          className="cursor-pointer"
          src={InfoIcon}
          alt="Info"
          onClick={() => scrollToBottom()}
        />
      </div>
    );
  }
}

export default InfoComponentIcon;
