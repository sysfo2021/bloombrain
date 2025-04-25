import React from "react";
import Tree from "react-d3-tree";

// Extended tree data with additional nodes and user details
const treeData = {
  name: "Root",
  attributes: { role: "Admin", age: 50 },
  children: [
    {
      name: "Left Child",
      attributes: { role: "Manager", age: 40 },
      children: [
        { name: "Left-Left Grandchild", attributes: { role: "Employee", age: 25 } },
        { name: "Left-Right Grandchild", attributes: { role: "Employee", age: 28 } },
      ],
    },
    {
      name: "Right Child",
      attributes: { role: "Manager", age: 38 },
      children: [
        { name: "Right-Left Grandchild", attributes: { role: "Employee", age: 30 } },
        { name: "Right-Right Grandchild", attributes: { role: "Employee", age: 26 } },
      ],
    },
  ],
};

const BinaryTree = () => {
  // Handler for node clicks
  const handleClick = (nodeData:any) => {
    alert(`Node clicked: ${nodeData.name}`);
  };

  // Custom node rendering
  const renderCustomNodeElement = ({ nodeDatum }:any) => (
    <g>
      {/* Node shape */}
      <rect
        width="150"
        height="70"
        x="-75"
        y="-35"
        fill="#ffd700"
        stroke="#333"
        strokeWidth="1.5"
        rx="10"
      />
      {/* Node text */}
      <text fill="#000" fontSize="12" textAnchor="middle">
        <tspan x="0" dy="-5" fontWeight="bold">
          {nodeDatum.name}
        </tspan>
        {nodeDatum.attributes &&
          Object.entries(nodeDatum.attributes).map(([key, value], index) => (
            <tspan key={key} x="0" dy={`${15 * (index + 1)}`}>
              {`${key}: ${value}`}
            </tspan>
          ))}
      </text>
    </g>
  );

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="elbow"
        collapsible={false}
        onNodeClick={handleClick}
        renderCustomNodeElement={renderCustomNodeElement}
      />
    </div>
  );
};

export default BinaryTree;