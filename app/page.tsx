"use client"; // Mark as a Client Component

import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from "../components/ButtonGroup";
import Modal from "../components/Modal";
import { Choice } from "@/interfaces";
import Image from "next/image";

export default function Home() {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [selectedDirection, setSelectedDirection] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchChoices = async () => {
      const { data } = await axios.get("/api/choices");
      setChoices(data);
    };
    fetchChoices();
  }, []);

  const handleButtonClick = (choice: Choice) => {
    setSelectedDirection(choice.steps || []);
    setIsModalOpen(true);
  };

  return (
    <main className="flex justify-center items-center">
      <div className="p-8">
        <div className="flex flex-col justify-center items-center mb-20">
          <h1 className="text-3xl font-bold mb-6 text-center">
            مرحبًا! اضغط على اسم المكتب للحصول على الاتجاهات
          </h1>
          <Image src={"/logo.png"} alt="logo" width={100} height={100} />
        </div>
        <ButtonGroup choices={choices} onButtonClick={handleButtonClick} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          steps={selectedDirection}
        />
      </div>
    </main>
  );
}
