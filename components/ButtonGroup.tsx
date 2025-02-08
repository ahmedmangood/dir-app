"use client"; // Mark as a Client Component

import React from "react";
import { Button } from "@/components/ui/button";
import { Choice } from "@/interfaces";

interface ButtonGroupProps {
  choices: Choice[]; // Add optional steps for future use
  onButtonClick: (choice: {
    _id: string;
    name: string;
    steps?: string[];
  }) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  choices,
  onButtonClick,
}) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
      {choices.map((choice) => (
        <Button
          key={choice._id}
          onClick={() => onButtonClick(choice)}
          variant="outline"
          className="w-[380px] h-[100px] text-2xl rounded-lg"
        >
          {choice.name}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
