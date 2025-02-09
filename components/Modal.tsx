"use client"; // Mark as a Client Component

import React from "react";
import { Dialog, DialogDescription } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { ArrowBigLeftIcon } from "lucide-react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: string[];
  title: string;
  img?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  steps,
  title,
  img,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[100%] max-w-[1000px] h-auto bg-white ">
        <DialogHeader className="mt-5">
          <DialogTitle className="text-right text-2xl font-bold">
            الإتجاهات
          </DialogTitle>
          <DialogDescription className="text-right text-xl">
            من فضلك اتبع الإتجاهات التالية للوصول الى {title}:
          </DialogDescription>
        </DialogHeader>
        <hr />
        {/* Display Steps */}
        <ul className="flex flex-wrap gap-4">
          {steps.length > 0 ? (
            steps.map((step, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="font-bold flex">
                  <span className="border-2 border-gray-400 border-dotted ps-[2px] pe-[2px] w-5 h-5 text-center rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>{" "}
                  <ArrowBigLeftIcon />
                </span>
                <span className="text-md">{step}</span>
              </li>
            ))
          ) : (
            <p>لا يوجد اتجاهات لهذا المكتب من فضلك تواصل مع المسؤول.</p>
          )}
        </ul>
        {/* Display Image */}
        {img && (
          <div className="flex justify-center mb-4 mt-5 w-[100%]">
            <Image
              src={img}
              alt={title}
              className="w-[1000px] h-[350px] rounded-md object-center"
              width={800}
              height={800}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
