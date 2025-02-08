"use client"; // Mark as a Client Component

import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from '@/components/ui';
import { Dialog, DialogDescription } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { ArrowBigLeftIcon } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: string[];
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, steps, title }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[100%] md:w-[800px] h-auto bg-white ">
        <DialogHeader className="mt-10">
          <DialogTitle className="text-right text-2xl font-bold">
            الإتجاهات
          </DialogTitle>
          <DialogDescription className="text-right text-xl">
            من فضلك اتبع الإتجاهات التالية للوصول الى {title}:
          </DialogDescription>
        </DialogHeader>
        <hr />
        {/* Display Steps */}
        <ul className="flex flex-col gap-4">
          {steps.length > 0 ? (
            steps.map((step, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="font-bold">
                  <ArrowBigLeftIcon />
                </span>
                <span className="text-xl">{step}</span>
              </li>
            ))
          ) : (
            <p>لا يوجد اتجاهات لهذا المكتب من فضلك تواصل مع المسؤول.</p>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
