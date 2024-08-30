import React from "react";
import calculateScore from "../utils/ScoreCalculator";

interface DartboardProps {
  onScoreCalculated: (score: number, distance: number, angle: number) => void;
}

const DartboardComponent: React.FC<DartboardProps> = ({
  onScoreCalculated,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const dartboardElement = event.currentTarget;
    const rect = dartboardElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const { score, distance, angle } = calculateScore(
      x,
      y,
      rect.width / 2,
      rect.height / 2
    );
    onScoreCalculated(score, distance, angle);
  };

  return (
    <div
      style={{ width: "100%", maxWidth: "500px", position: "relative" }}
      onClick={handleClick}
    >
      <img
        // src="/images/dartboard.png"
        src="/images/dartboard_low_contrast.png"
        alt="Dartboard"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default DartboardComponent;
