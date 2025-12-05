"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { MinusSquare } from "lucide-react";

export default function ConsultationPage() {
  const printRef = useRef(null);

  const [form, setForm] = useState({
    height: "",
    weight: "",
    bloodPressure: "",
    pulseRate: "",
    diagnosis: "",
    labTests: [],
    notes: "",
    nextConsultationDate: "",
    nextConsultationTime: "",
  });

  const patientInfo = {
    name: "Aman Sharma",
    id: "PT-2025-00123",
    age: 29,
    gender: "Male",
    contact: "+91 98765 43210",
    registrationDate: "2023-04-15",
    dob: "1996-06-25",
    visits: 5,
    lastDiagnosis: "Tooth Extraction",
  };

  const clinicInfo = {
    name: "MEDIVARDAAN",
    regNo: "REG-456789",
    address: "12, Harmony Street, Pune, Maharashtra",
    phone: "+91 20 1234 5678",
  };

  const doctorInfo = {
    name: "Dr. Kavita Rao",
    qualification: "BDS, MDS (Prosthodontics)",
    regDate: "2020-03-15",
    signature: "Dr. Kavita Rao",
  };

  const [ongoingTreatments, setOngoingTreatments] = useState([
    { name: "Scaling" },
    { name: "Cavity Filling" },
  ]);

  const [ongoingMedicines, setOngoingMedicines] = useState([
    { name: "Paracetamol 500mg", dosage: "1 tab BD" },
    { name: "Calcium 500mg", dosage: "1 tab OD" },
  ]);

  const [newTreatment, setNewTreatment] = useState("");
  const [newMedicine, setNewMedicine] = useState({ name: "", dosage: "" });
  const [newLabTest, setNewLabTest] = useState("");

  const addLabTest = () => {
    const value = newLabTest.trim();
    if (!value) return;
    setForm((s) => ({ ...s, labTests: [...(s.labTests || []), value] }));
    setNewLabTest("");
  };

  const removeLabTest = (index) => {
    setForm((s) => ({
      ...s,
      labTests: (s.labTests || []).filter((_, i) => i !== index),
    }));
  };

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  const addTreatment = () => {
    if (newTreatment.trim()) {
      setOngoingTreatments([...ongoingTreatments, { name: newTreatment }]);
      setNewTreatment("");
    }
  };

  const addMedicine = () => {
    if (newMedicine.name.trim() && newMedicine.dosage.trim()) {
      setOngoingMedicines([...ongoingMedicines, newMedicine]);
      setNewMedicine({ name: "", dosage: "" });
    }
  };

  const removeTreatment = (index) => {
    setOngoingTreatments((s) => s.filter((_, i) => i !== index));
  };

  const removeMedicine = (index) => {
    setOngoingMedicines((s) => s.filter((_, i) => i !== index));
  };

 const handlePrint = () => {
  if (!printRef.current) return;

  // clone printable DOM so we can mutate safely
  const clone = printRef.current.cloneNode(true);

  // remove elements that should not be printed
  clone.querySelectorAll("[data-no-print]").forEach((el) => el.remove());

  // optional: also remove any dialog modals or elements you don't want
  clone.querySelectorAll(".react-modal, .dialog").forEach((el) => el.remove());

  const win = window.open("", "_blank", "width=900,height=800");
  if (!win) return;

  win.document.write(`
    <html>
        <head>
          <title>Consultation Report</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <style>
            * { box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; margin: 40px; color: #111; }
            h1,h2,h3,h4,h5,h6 { margin: 0; }
            .card { border: 1px solid #000; padding: 16px; border-radius: 8px; margin-bottom: 16px; }
            .section-title { font-weight: bold; font-size: 16px; margin-bottom: 8px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            .label { font-weight: 500; }

            /* --- Print-specific Styling --- */
            @media print {
              body { margin: 10mm 15mm; font-size: 13px; line-height: 1.5; color: #000; background: #fff; }
              table, th, td { border-color: #333; }
              .no-print, [data-no-print] { display: none !important; }
              .card { box-shadow: none !important; border: 1px solid #000; }
              button, input, textarea { display: none !important; }
              .text-sm { font-size: 12px; }
              .text-lg { font-size: 15px; font-weight: 600; }
              .text-xl { font-size: 18px; font-weight: 700; }
            }
          </style>
        </head>
        <body>${printRef.current.innerHTML}</body>
      </html>
  `);

  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
};


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6" ref={printRef}>
        {/* Clinic & Doctor Details */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
          <CardHeader className="p-6 bg-[#1E6B8C] border-b border-[#1E6B8C]">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">{clinicInfo.name}</h1>
                <p className="text-sm text-gray-100 mt-1">{clinicInfo.address}</p>
                <p className="text-sm text-gray-100">
                  Reg: {clinicInfo.regNo} | {clinicInfo.phone}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-200 uppercase tracking-wide">Doctor</p>
                <h2 className="font-semibold text-white text-lg">{doctorInfo.name}</h2>
                <p className="text-sm text-gray-100">{doctorInfo.qualification}</p>
                <p className="text-sm text-gray-100">Reg Date: {doctorInfo.regDate}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Patient Info Section */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="font-semibold text-xl text-gray-900 dark:text-white">{patientInfo.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {patientInfo.age} yrs • {patientInfo.gender}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{patientInfo.contact}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <p><span className="font-medium">Reg Date:</span> {patientInfo.registrationDate}</p>
              <p><span className="font-medium">DOB:</span> {patientInfo.dob}</p>
              <p><span className="font-medium">Visits:</span> {patientInfo.visits}</p>
              <div className="flex items-center justify-between col-span-2">
                <p><span className="font-medium">Last Diagnosis:</span> {patientInfo.lastDiagnosis}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" data-no-print size="sm" className="print:hidden border-[#4DB8AC] text-[#4DB8AC] hover:bg-[#4DB8AC] hover:text-white">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Previous Diagnosis History</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 text-sm">
                      <p>15/04/2023 - Tooth Extraction</p>
                      <p>10/02/2023 - Root Canal</p>
                      <p>05/01/2023 - Cleaning</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consultation Section */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
          <CardHeader className="p-5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xl font-semibold text-[#1E6B8C] dark:text-[#4DB8AC]">
              Consultation Details
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Date of Consultation</Label>
                <Input type="date" className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Height (cm)</Label>
                <Input name="height" value={form.height} onChange={handleChange} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Weight (kg)</Label>
                <Input name="weight" value={form.weight} onChange={handleChange} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Blood Pressure</Label>
                <Input name="bloodPressure" value={form.bloodPressure} onChange={handleChange} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Pulse Rate</Label>
                <Input name="pulseRate" value={form.pulseRate} onChange={handleChange} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]" />
              </div>
            </div>

            {/* Diagnosis */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Diagnosis Details</Label>
              <Textarea name="diagnosis" value={form.diagnosis} onChange={handleChange} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC] min-h-[100px]" />
            </div>

            {/* Ongoing Treatments */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Ongoing Treatments</Label>
                <div className="flex gap-2 print:hidden">
                  <Input
                    placeholder="Add new treatment"
                    value={newTreatment}
                    onChange={(e) => setNewTreatment(e.target.value)}
                    className="w-48 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]"
                    data-no-print
                  />
                  <Button onClick={addTreatment} data-no-print className="bg-[#4DB8AC] hover:bg-[#3a9d92] text-white"><Plus className="h-4 w-4"/></Button>
                </div>
              </div>
              <ul className="mt-2 space-y-2">
                {ongoingTreatments.map((t, i) => (
                  <li key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-800 dark:text-gray-100">{t.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeTreatment(i)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950 print:hidden"
                      data-no-print
                    >
                      <MinusSquare className="h-4 w-4"/>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medicines */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Medicines (Ongoing)</Label>
                <div className="flex gap-2 print:hidden">
                  <Input
                    placeholder="Medicine"
                    value={newMedicine.name}
                    onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                    className="w-40 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]"
                    data-no-print
                  />
                  <Input
                    placeholder="Dosage"
                    value={newMedicine.dosage}
                    onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                    className="w-32 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]"
                    data-no-print
                  />
                  <Button onClick={addMedicine} data-no-print className="bg-[#4DB8AC] hover:bg-[#3a9d92] text-white"><Plus className="h-4 w-4"/></Button>
                </div>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1E6B8C] dark:bg-[#1E6B8C] text-white">
                      <th className="p-3 text-left font-medium">Medicine</th>
                      <th className="p-3 text-left font-medium">Dosage</th>
                      <th className="p-3 text-left font-medium print:hidden">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800">
                    {ongoingMedicines.map((m, i) => (
                      <tr
                        key={i}
                        className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        <td className="p-3 text-gray-800 dark:text-gray-100">{m.name}</td>
                        <td className="p-3 text-gray-800 dark:text-gray-100">{m.dosage}</td>
                        <td className="p-3 print:hidden" data-no-print>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeMedicine(i)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
                            data-no-print
                          >
                            <MinusSquare className="h-4 w-4"/>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lab Tests */}
            <div className="space-y-3">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Lab Tests</Label>
                <div className="flex items-center gap-3 print:hidden" data-no-print>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" data-no-print className="border-[#4DB8AC] text-[#4DB8AC] hover:bg-[#4DB8AC] hover:text-white">
                        View Previous Tests
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Previous Lab Tests</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 text-sm">
                        <p>Blood Sugar - Normal</p>
                        <p>X-Ray - Clean</p>
                        <p>Calcium Levels - Slightly Low</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter lab test"
                      value={newLabTest}
                      onChange={(e) => setNewLabTest(e.target.value)}
                      className="w-64 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]"
                      data-no-print
                    />
                    <Button onClick={addLabTest} data-no-print className="bg-[#4DB8AC] hover:bg-[#3a9d92] text-white"><Plus className="h-4 w-4"/></Button>
                  </div>
                </div>
              </div>
              <ul className="space-y-2">
                {(form.labTests || []).map((t, i) => (
                  <li key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
                    <span className="text-gray-800 dark:text-gray-200">{t}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeLabTest(i)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 print:hidden"
                      data-no-print
                    >
                      <MinusSquare className="h-4 w-4"/>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notes + Next Consultation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Notes */}
              <div className="lg:col-span-2 space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</Label>
                  <Dialog data-no-print>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="print:hidden border-[#4DB8AC] text-[#4DB8AC] hover:bg-[#4DB8AC] hover:text-white" data-no-print>
                        History
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Previous Notes</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 text-sm">
                        <p>Patient advised soft diet.</p>
                        <p>Follow up after 7 days.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Enter consultation notes..."
                  className="min-h-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]"
                />
              </div>

              {/* Next Consultation */}
              <div className="p-5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-750 space-y-4 shadow-sm">
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">Next Consultation</h3>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</Label>
                  <Input
                    type="date"
                    name="nextConsultationDate"
                    value={form.nextConsultationDate}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time</Label>
                  <Input
                    type="time"
                    name="nextConsultationTime"
                    value={form.nextConsultationTime}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#4DB8AC] focus:border-[#4DB8AC]"
                  />
                </div>
                <Button className="w-full mt-4 print:hidden bg-[#4DB8AC] hover:bg-[#3a9d92] text-white" data-no-print>Book Appointment</Button>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-8 flex justify-end gap-3 print:hidden border-t border-gray-200 dark:border-gray-700 pt-6">
              <Button variant="outline" data-no-print onClick={handlePrint} className="px-6 border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                Print
              </Button>
              <Button data-no-print className="px-8 bg-[#4DB8AC] hover:bg-[#3a9d92] text-white">Submit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
