import React from "react";
interface Props {
  className?: string;
}
const AnimateBackGrid: React.FC<Props> = ({ className }) => {
  return (
    <>
      <div className={`absolute inset-0 ${className}`}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                linear-gradient(#00ff9533 1px, transparent 1px),
                linear-gradient(90deg, #00ff9533 1px, transparent 1px)
              `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>
    </>
  );
};
export default AnimateBackGrid;
