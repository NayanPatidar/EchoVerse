import React from "react";

interface ScrollAreaComponentProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const ScrollAreaComponent: React.FC<ScrollAreaComponentProps> = ({
  children,
}) => {
  return <div className="media-scroller">{children}</div>;
};

export default ScrollAreaComponent;
