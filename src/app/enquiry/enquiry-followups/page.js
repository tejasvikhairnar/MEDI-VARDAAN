"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Phone,
  Mail,
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function EnquiryFollowupsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [enquiryTypeFilter, setEnquiryTypeFilter] = useState("all");

  // Sample enquiries data
  const enquiries = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
      enquiryType: "Appointment Request",
      source: "Website",
      status: "pending",
      createdDate: "2025-12-03",
      message: "Looking for consultation regarding knee pain",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 87654 32109",
      enquiryType: "Treatment Information",
      source: "Phone Call",
      status: "contacted",
      createdDate: "2025-12-02",
      message: "Wants information about physiotherapy sessions",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@example.com",
      phone: "+91 76543 21098",
      enquiryType: "Pricing Information",
      source: "Walk-in",
      status: "completed",
      createdDate: "2025-12-01",
      message: "Inquiry about package pricing for family",
    },
    {
      id: 4,
      name: "Sneha Verma",
      email: "sneha.verma@example.com",
      phone: "+91 65432 10987",
      enquiryType: "General Consultation",
      source: "Referral",
      status: "pending",
      createdDate: "2025-12-04",
      message: "General health checkup inquiry",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        variant: "outline",
        className: "border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-900/20",
        icon: Clock,
        label: "Pending",
      },
      contacted: {
        variant: "outline",
        className: "border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20",
        icon: Phone,
        label: "Contacted",
      },
      completed: {
        variant: "outline",
        className: "border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20",
        icon: CheckCircle,
        label: "Completed",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.phone.includes(searchQuery);

    const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter;
    const matchesType = enquiryTypeFilter === "all" || enquiry.enquiryType === enquiryTypeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: enquiries.length,
    pending: enquiries.filter((e) => e.status === "pending").length,
    contacted: enquiries.filter((e) => e.status === "contacted").length,
    completed: enquiries.filter((e) => e.status === "completed").length,
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1E6B8C] to-[#4DB8AC] bg-clip-text text-transparent">
            ENQUIRY FOLLOWUPS
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track and manage all enquiry followups
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#1E6B8C] shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Enquiries</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E6B8C]/20 to-[#4DB8AC]/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[#1E6B8C]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Contacted</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.contacted}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.completed}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 dark:border-gray-700"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={enquiryTypeFilter} onValueChange={setEnquiryTypeFilter}>
                <SelectTrigger className="border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="General Consultation">General Consultation</SelectItem>
                  <SelectItem value="Appointment Request">Appointment Request</SelectItem>
                  <SelectItem value="Treatment Information">Treatment Information</SelectItem>
                  <SelectItem value="Pricing Information">Pricing Information</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enquiries Table */}
      <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Enquiry List ({filteredEnquiries.length})
            </h2>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-[#E8F4F8] via-[#F0FAF9] to-[#E8F4F8] dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Enquiry Type</TableHead>
                  <TableHead className="font-semibold">Source</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No enquiries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                        {enquiry.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Mail className="w-3 h-3 mr-1" />
                            {enquiry.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="w-3 h-3 mr-1" />
                            {enquiry.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                        {enquiry.enquiryType}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                        {enquiry.source}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-3 h-3 mr-1" />
                          {enquiry.createdDate}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-[#1E6B8C]/10 hover:text-[#1E6B8C]"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
