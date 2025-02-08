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
    <div className="flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2">
      {choices.map((choice) => (
        <Button
          key={choice._id}
          onClick={() => onButtonClick(choice)}
          variant="outline"
          className="w-[250px] h-[80px] md:w-[350px] md:h-[100px] text-xl md:text-2xl rounded-lg hover:bg-gray-100 text-center"
        >
          {choice.name}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
