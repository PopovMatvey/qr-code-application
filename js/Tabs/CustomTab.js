import React from "react"

const style = {
  padding: "2px 0",
  borderBottom: "3px solid transparent",
  borderRadius: "4px",
  display: "inline-block",
  margin: "7px",
  cursor: "pointer",
  backgroundColor: "#3F51B5",
  width: "19%",
  color: "rgba(255, 255, 255, .7)",
  fontFamily: "Sans-Serif",
  textAlign: "center"
}

const activeStyle = {
  ...style,
  color: "white",
  borderBottom: "3px solid #d71356"
}

const CustomTab = ({ children, isActive }) => (
  <span style={isActive ? activeStyle : style}>{children}</span>
)

export default CustomTab
