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
import { Settings, Eye, Trash2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewEnquiryPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    name: "",
    mobileNo: "",
    clinic: "",
    fromDate: "",
    toDate: "",
  });

  // Sample enquiry data matching the screenshot
  const enquiries = [
    {
      srNo: 1,
      enquiryNo: "E166213",
      name: "minakshi chhattise",
      mobileNo: "9930401219",
      clinicName: "Panvel",
      sourceName: "Google",
      status: "Patient",
      date: "01-Dec-2025",
    },
    {
      srNo: 2,
      enquiryNo: "E161505",
      name: "amit gharat",
      mobileNo: "9619002384",
      clinicName: "Panvel",
      sourceName: "Google",
      status: "Patient",
      date: "13-Nov-2025",
    },
    {
      srNo: 3,
      enquiryNo: "E160559",
      name: "santosh Ahire",
      mobileNo: "9819827259",
      clinicName: "Panvel",
      sourceName: "Google",
      status: "Patient",
      date: "10-Nov-2025",
    },
    {
      srNo: 4,
      enquiryNo: "E159030",
      name: "vikrant jadhav",
      mobileNo: "8451962017",
      clinicName: "Panvel",
      sourceName: "Google",
      status: "Patient",
      date: "03-Nov-2025",
    },
    {
      srNo: 5,
      enquiryNo: "E159030",
      name: "vikrant jadhav",
      mobileNo: "8451962017",
      clinicName: "Panvel",
      sourceName: "Google",
      status: "Patient",
      date: "03-Nov-2025",
    },
    {
      srNo: 6,
      enquiryNo: "E159030",
      name: "vikrant jadhav",
      mobileNo: "8451962017",
      clinicName: "Panvel",
      sourceName: "Google",
      status: "Patient",
      date: "03-Nov-2025",
    },
    {
      srNo: 7,
      enquiryNo: "E145791",
      name: "dattatray sonawane",
      mobileNo: "9768656219",
      clinicName: "Panvel",
      sourceName: "Facebook",
      status: "Patient",
      date: "20-Aug-2025",
    },
    {
      srNo: 8,
      enquiryNo: "E144775",
      name: "yogita dhende",
      mobileNo: "9322325088",
      clinicName: "Panvel",
      sourceName: "Facebook",
      status: "Patient",
      date: "06-Aug-2025",
    },
    {
      srNo: 9,
      enquiryNo: "E144775",
      name: "yogita dhende",
      mobileNo: "9322325088",
      clinicName: "Panvel",
      sourceName: "Facebook",
      status: "Patient",
      date: "06-Aug-2025",
    },
    {
      srNo: 10,
      enquiryNo: "E143341",
      name: "namdev patil",
      mobileNo: "7715881924",
      clinicName: "Panvel",
      sourceName: "Facebook",
      status: "Patient",
      date: "22-Jul-2025",
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

  const handleAddNewEnquiry = () => {
    router.push("/enquiry/add-enquiry-form");
  };

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <Settings className="w-4 h-4 text-red-600" />
        </div>
        <h1 className="text-xl font-bold text-red-600 dark:text-red-500">
          ENQUIRY
        </h1>
      </div>

      {/* Search Filters */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Name"
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
                className="border-gray-300 dark:border-gray-700"
              />
              <Input
                placeholder="Mobile No"
                value={filters.mobileNo}
                onChange={(e) => handleFilterChange("mobileNo", e.target.value)}
                className="border-gray-300 dark:border-gray-700"
              />
              <Select value={filters.clinic} onValueChange={(value) => handleFilterChange("clinic", value)}>
                <SelectTrigger className="border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="-- Select Clinic --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clinics</SelectItem>
                  <SelectItem value="panvel">Panvel</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <Input
                type="date"
                placeholder="From Enquiry Date"
                value={filters.fromDate}
                onChange={(e) => handleFilterChange("fromDate", e.target.value)}
                className="border-gray-300 dark:border-gray-700"
              />
              <Input
                type="date"
                placeholder="To Enquiry Date"
                value={filters.toDate}
                onChange={(e) => handleFilterChange("toDate", e.target.value)}
                className="border-gray-300 dark:border-gray-700"
              />
              <Button
                onClick={handleSearch}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons and Total */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={handleExcelUpload}
            variant="outline"
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
          >
            Excel Upload
          </Button>
          <Button
            onClick={handleAddNewEnquiry}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add New Enquiry
          </Button>
        </div>
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Total : {enquiries.length}
        </div>
      </div>

      {/* Enquiries Table */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-100 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/20">
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Sr. No.</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Enquiry No</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Name</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Mobile No</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Clinic Name</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Source Name</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Date</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-gray-100 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.map((enquiry, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <TableCell className="text-gray-900 dark:text-gray-100">{enquiry.srNo}</TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{enquiry.enquiryNo}</TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{enquiry.name}</TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{enquiry.mobileNo}</TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{enquiry.clinicName}</TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{enquiry.sourceName}</TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{enquiry.status}</TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{enquiry.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          onClick={() => console.log("View", enquiry.enquiryNo)}
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          onClick={() => console.log("Edit", enquiry.enquiryNo)}
                        >
                          <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          onClick={() => console.log("Delete", enquiry.enquiryNo)}
                        >
                          <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
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
    </div>
  );
}
