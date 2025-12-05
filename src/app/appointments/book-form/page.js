'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Settings, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function BookAppointmentFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedDate = searchParams.get('date')

  const [searchType, setSearchType] = useState('enquiry')
  const [patientName, setPatientName] = useState('')
  const [mobileNo, setMobileNo] = useState('')

  // Mock enquiry data
  const [enquiries] = useState([
    { id: 1, enquiryNo: 'E166265', name: 'Shailja Dhaturaha', mobile: '9589038632', date: '02-Dec-2025' },
    { id: 2, enquiryNo: 'E166264', name: 'Shivu', mobile: '8073342774', date: '02-Dec-2025' },
    { id: 3, enquiryNo: 'E166263', name: 'Vishwanath Kapse', mobile: '7208773446', date: '02-Dec-2025' },
    { id: 4, enquiryNo: 'E166262', name: 'Gangadhar Rao', mobile: '9844154762', date: '02-Dec-2025' },
    { id: 5, enquiryNo: 'E166261', name: 'Arjun', mobile: '7075488763', date: '02-Dec-2025' },
    { id: 6, enquiryNo: 'E166260', name: 'Pushpendra', mobile: '7340541040', date: '02-Dec-2025' },
    { id: 7, enquiryNo: 'E166259', name: 'Ratna', mobile: '9623094876', date: '02-Dec-2025' },
    { id: 8, enquiryNo: 'E166258', name: 'Tushar Bugade', mobile: '8999923926', date: '02-Dec-2025' },
    { id: 9, enquiryNo: 'E166257', name: 'Abed khan', mobile: '9323168982', date: '02-Dec-2025' },
  ])

  const [filteredEnquiries, setFilteredEnquiries] = useState(enquiries)

  const handleSearch = () => {
    const filtered = enquiries.filter(enq => {
      const matchName = patientName ? enq.name.toLowerCase().includes(patientName.toLowerCase()) : true
      const matchMobile = mobileNo ? enq.mobile.includes(mobileNo) : true
      return matchName && matchMobile
    })
    setFilteredEnquiries(filtered)
  }

  const handleSelect = (enquiry) => {
    console.log('Selected enquiry:', enquiry, 'for date:', selectedDate)
    // Here you would proceed to book the appointment
  }

  const handleAddNew = () => {
    const clinic = searchParams.get('clinic')
    const doctor = searchParams.get('doctor')
    router.push(`/appointments/new-appointment?date=${selectedDate}&clinic=${clinic}&doctor=${doctor}`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#4DB8AC]/10 dark:bg-[#1E6B8C]/20">
            <Settings className="w-5 h-5 text-[#ffffff]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#ffffff]">BOOK APPOINTMENT</h1>
            {selectedDate && (
              <p className="text-sm text-muted-foreground">Selected Date: {selectedDate}</p>
            )}
          </div>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-[#4DB8AC] hover:bg-[#4DB8AC]/90 dark:bg-[#1E6B8C] dark:hover:bg-[#1E6B8C]/90"
        >
          Add New
        </Button>
      </div>

      {/* Search Type Toggle */}
      <div className="flex gap-6 items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="searchType"
            value="enquiry"
            checked={searchType === 'enquiry'}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-4 h-4 text-[#E74C3C] focus:ring-[#E74C3C] cursor-pointer"
          />
          <span className="text-sm font-medium">Enquiry</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="searchType"
            value="patient"
            checked={searchType === 'patient'}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-4 h-4 text-[#E74C3C] focus:ring-[#E74C3C] cursor-pointer"
          />
          <span className="text-sm font-medium">Patient</span>
        </label>
      </div>

      {/* Search Filters */}
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="patientName" className="text-sm font-medium">
            Patient Name
          </Label>
          <Input
            id="patientName"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="mobileNo" className="text-sm font-medium">
            Mobile No.
          </Label>
          <Input
            id="mobileNo"
            placeholder="Mobile No."
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-[#D35400] hover:bg-[#D35400]/90 text-white px-8"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Results Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-green-100 dark:bg-green-900/20">
              <th className="px-4 py-3 text-left text-sm font-medium">Sr. No.</th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {searchType === 'enquiry' ? 'Enquiry No' : 'Patient No'}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Mobile No</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.map((enquiry, index) => (
              <tr
                key={enquiry.id}
                className="border-t border-border hover:bg-accent/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{enquiry.enquiryNo}</td>
                <td className="px-4 py-3 text-sm">{enquiry.name}</td>
                <td className="px-4 py-3 text-sm">{enquiry.mobile}</td>
                <td className="px-4 py-3 text-sm">{enquiry.date}</td>
                <td className="px-4 py-3">
                  <Button
                    onClick={() => handleSelect(enquiry)}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-6"
                  >
                    Select
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEnquiries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No results found. Try adjusting your search criteria.
        </div>
      )}
    </div>
  )
}
