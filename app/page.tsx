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
  const [title, setSelectedTitle] = useState<string>("");

  useEffect(() => {
    const fetchChoices = async () => {
      const { data } = await axios.get("/api/choices");
      setChoices(data);
    };
    fetchChoices();
  }, []);

  const handleButtonClick = (choice: Choice) => {
    setSelectedDirection(choice.steps || []);
    setSelectedTitle(choice.name);
    setIsModalOpen(true);
  };

  return (
    <main className="flex justify-center items-center ps-5 pe-5">
      <div className="py-4 px-4">
        <div className="flex flex-col justify-center items-center mb-20">
          <Image src={"/logo.png"} alt="logo" width={100} height={100} />
          <h1 className="text-xl md:text-3xl font-bold mb-6 text-center">
            مرحبًا 👋 من فضلك إضغط على اسم المكتب للحصول على الإتجاهات
          </h1>
        </div>
        <ButtonGroup choices={choices} onButtonClick={handleButtonClick} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          steps={selectedDirection}
          title={title}
        />
      </div>
    </main>
  );
}
