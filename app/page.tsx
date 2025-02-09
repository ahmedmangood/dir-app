"use client"; // Mark as a Client Component

import React, { useState, useEffect, useRef } from "react";
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
  const [image, setSelectedImage] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    setSelectedImage(choice.image || ""); // Set the image URL
    setIsModalOpen(true);
    // Clear any existing timer to avoid multiple timers running
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer to close the modal after 10 seconds
    timerRef.current = setTimeout(() => {
      setIsModalOpen(false);
    }, 10000); // 10 seconds
  };

  // Clear the timer when the component unmounts or the modal is closed manually
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
          onClose={() => {
            setIsModalOpen(false);
            if (timerRef.current) {
              clearTimeout(timerRef.current); // Clear the timer when manually closing the modal
            }
          }}
          steps={selectedDirection}
          title={title}
          img={image}
        />
      </div>
    </main>
  );
}
