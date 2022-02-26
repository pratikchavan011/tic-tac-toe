import React from "react";

const Square = (props) => {
  return (
    <div
      id={props.num}
      className={`square ${props.isSelected}`}
      onClick={(props.isGameOver || props.isSelected) ? undefined : props?.squareClickHandler.bind(null, props.num)}
    ></div>
  );
};

export default React.memo(Square);
