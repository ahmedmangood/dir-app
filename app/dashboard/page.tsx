"use client"; // Mark as a Client Component

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table } from "@/components/ui/table";
import { TableHeader } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import { TableHead } from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";
import { Trash2, Edit, Plus } from "lucide-react";
import { z } from "zod";
import { choiceSchema } from "@/lib/validation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";

export default function Dashboard() {
  const [choices, setChoices] = useState<
    { _id: string; name: string; steps: string[]; image: string }[]
  >([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    steps: "",
    image: "",
  });
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);

  useEffect(() => {
    fetchChoices();
  }, []);

  const fetchChoices = async () => {
    const { data } = await axios.get("/api/choices");
    setChoices(data);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors([]); // Clear errors when the user starts typing
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Set the returned image URL in the form data
      setFormData((prev) => ({ ...prev, image: response.data.url }));
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedSteps = formData.steps
      .split("\n")
      .map((step) => step.trim())
      .filter(Boolean);

    try {
      // Validate the form data
      const validatedData = choiceSchema.parse({
        _id: formData._id || undefined, // Include _id only for updates
        name: formData.name,
        steps: parsedSteps,
        image: formData.image || undefined, // Include image only if available
      });

      console.log("Submitting data:", validatedData); // Log the payload for debugging

      // Submit the validated data
      if (formData._id) {
        // Update existing choice
        await axios.put("/api/choices", validatedData);
      } else {
        // Create new choice
        await axios.post("/api/choices", validatedData);
      }

      fetchChoices();
      resetForm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.issues); // Set validation errors
      } else {
        console.error(error);
        alert("فشل في إرسال النموذج.");
      }
    }
  };

  const handleEdit = (choice: {
    _id: string;
    name: string;
    steps: string[];
    image?: string;
  }) => {
    setFormData({
      _id: choice._id,
      name: choice.name,
      steps: choice.steps.join("\n"),
      image: choice.image || "",
    });
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/choices?id=${id}`);
    fetchChoices();
  };

  const resetForm = () => {
    setFormData({ _id: "", name: "", steps: "", image: "" });
    setIsAdding(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>
      {/* Display Validation Errors */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Validation Error</AlertTitle>
          <AlertDescription>
            <ul>
              {errors.map((err, index) => (
                <li key={index}>{err.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input
            type="text"
            placeholder="الإسم"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Textarea
            placeholder="كتابة الإتجاهات (إضغط entrt لبدأ اتجاه جديد)"
            name="steps"
            value={formData.steps}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            placeholder="رابط الصورة"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
          <label className="block">
            <span className="sr-only">تحميل صورة</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
          <Button
            type="submit"
            className="bg-green-500 text-white me-2 rounded-md hover:bg-green-400 text-lg"
          >
            {formData._id ? "تعديل" : "إضافة"}
          </Button>
          <Button
            variant="default"
            onClick={resetForm}
            className="bg-gray-500 hover:bg-gray-400 text-white rounded-md text-lg"
          >
            إلغاء
          </Button>
        </form>
      )}

      {/* Add New Button */}
      {!isAdding && (
        <Button
          onClick={() => setIsAdding(true)}
          className="mb-6 bg-blue-500 text-white rounded-lg font-bold text-xl hover:bg-blue-400"
        >
          <span>إضافة</span>
          <Plus size={"25px"} />
        </Button>
      )}

      {/* Choices Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right text-lg">الإسم</TableHead>
            <TableHead className="text-right text-lg">الخطوات</TableHead>
            <TableHead className="text-right text-lg">الصورة</TableHead>
            <TableHead className="text-right text-lg">تعديل/حذف</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {choices.map((choice) => (
            <TableRow key={choice._id}>
              <TableCell>{choice.name}</TableCell>
              <TableCell>{choice.steps?.join(", ")}</TableCell>
              <TableCell>
                {choice.image && (
                  <Image
                    src={choice.image}
                    alt={choice.name}
                    className="w-16 h-16 object-cover rounded-md"
                    width={100}
                    height={100}
                  />
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(choice)}
                  className="me-2 bg-gray-200 hover:bg-gray-100"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(choice._id)}
                  className="me-2 bg-gray-200 hover:bg-gray-100"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
