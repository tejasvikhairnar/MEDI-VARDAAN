"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Settings, Eye, Edit, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DoctorRegistrationPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    doctorName: "",
    mobileNo: "",
    panel: "",
  });

  // Sample doctor data 
  const doctors = [
    {
      srNo: 1,
      photo: "/placeholder-doctor.png",
      name: "Sayali Jadhav",
      mobileNo: "9665316531",
      emailId: "sayalijadhav002@gmail.com",
      regDate: "08-11-2018",
    },
  ];

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
    // Add your search logic here
  };

  const handleExcelUpload = () => {
    console.log("Excel Upload clicked");
    // Add your excel upload logic here
  };

  const handleAddNew = () => {
    router.push("/doctor/add-doctor");
  };

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <Settings className="w-4 h-4 text-red-600" />
        </div>
        <h1 className="text-xl font-bold text-red-600 dark:text-red-500">
          DOCTOR
        </h1>
      </div>

      {/* Search Filters */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <Input
              placeholder="Doctor Name"
              value={filters.doctorName}
              onChange={(e) => handleFilterChange("doctorName", e.target.value)}
              className="border-gray-300 dark:border-gray-700"
            />
            <Input
              placeholder="Mobile No."
              value={filters.mobileNo}
              onChange={(e) => handleFilterChange("mobileNo", e.target.value)}
              className="border-gray-300 dark:border-gray-700"
            />
            <Select
              value={filters.panel}
              onValueChange={(value) => handleFilterChange("panel", value)}
            >
              <SelectTrigger className="border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="Panvel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Panels</SelectItem>
                <SelectItem value="panvel">Panvel</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleSearch}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        {/* <Button
          onClick={handleExcelUpload}
          variant="outline"
          className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
        >
          Excel Upload
        </Button> */}
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add New
        </Button>
      </div>

      {/* Doctors Table */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-100 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/20">
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
                    Sr. No.
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
                    Photo
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
                    Name
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
                    Mobile No.
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
                    Email ID
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
                    Reg Date
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100 text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map((doctor, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <TableCell className="text-gray-900 dark:text-gray-100">
                      {doctor.srNo}
                    </TableCell>
                    <TableCell>
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          No Image
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">
                      {doctor.name}
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">
                      {doctor.mobileNo}
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">
                      {doctor.emailId}
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">
                      {doctor.regDate}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          onClick={() => console.log("Edit", doctor.name)}
                        >
                          <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          onClick={() => console.log("View", doctor.name)}
                        >
                          <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          onClick={() => console.log("Schedule", doctor.name)}
                        >
                          <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Excel Download Icon
      <div className="flex items-start">
        <div className="w-12 h-12 bg-green-600 rounded flex items-center justify-center cursor-pointer hover:bg-green-700 transition-colors">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M12.9,14.5L15.8,19H14L12,15.6L10,19H8.2L11.1,14.5L8.2,10H10L12,13.4L14,10H15.8L12.9,14.5Z" />
          </svg>
        </div>
      </div> */}
    </div>
  );
}
