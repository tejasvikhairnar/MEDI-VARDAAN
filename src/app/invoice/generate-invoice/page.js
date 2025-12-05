'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings } from 'lucide-react'

export default function GenerateInvoicePage() {
  const [formData, setFormData] = useState({
    patientName: '',
    clinicName: '',
    doctorName: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paidAmount: '',
    membership: false,
    totalCost: '',
    totalDiscount: '',
    totalTax: '',
    grandTotal: '',
    paymentType: 'Other',
    creditNote: false,
    payAmount: '0',
    pendingAmount: '',
    paymentMode: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-calculate pending amount
    if (field === 'payAmount' || field === 'grandTotal') {
      const grand = parseFloat(field === 'grandTotal' ? value : formData.grandTotal) || 0
      const pay = parseFloat(field === 'payAmount' ? value : formData.payAmount) || 0
      setFormData(prev => ({
        ...prev,
        pendingAmount: (grand - pay).toString()
      }))
    }
  }

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Invoice submitted:', formData)
  }

  const handleCancel = () => {
    setFormData({
      patientName: '',
      clinicName: '',
      doctorName: '',
      paymentDate: new Date().toISOString().split('T')[0],
      paidAmount: '',
      membership: false,
      totalCost: '',
      totalDiscount: '',
      totalTax: '',
      grandTotal: '',
      paymentType: 'Other',
      creditNote: false,
      payAmount: '0',
      pendingAmount: '',
      paymentMode: ''
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#4DB8AC]/10 dark:bg-[#1E6B8C]/20">
          <Settings className="w-5 h-5 text-[#4DB8AC] dark:text-[#1E6B8C]" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Generate Invoice</h1>
          <p className="text-sm text-muted-foreground">Create a new invoice for patient</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Top Row - Patient, Clinic, Doctor, Payment Date */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <Label htmlFor="patientName" className="text-sm font-medium">
              Patient Name
            </Label>
            <Input
              id="patientName"
              placeholder="Enter patient name"
              value={formData.patientName}
              onChange={(e) => handleInputChange('patientName', e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="clinicName" className="text-sm font-medium">
              Clinic Name
            </Label>
            <Select
              value={formData.clinicName}
              onValueChange={(value) => handleInputChange('clinicName', value)}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="-- Select Clinic --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Panvel">Panvel</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Thane">Thane</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="doctorName" className="text-sm font-medium">
              Doctor Name
            </Label>
            <Select
              value={formData.doctorName}
              onValueChange={(value) => handleInputChange('doctorName', value)}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="--- Select ---" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                <SelectItem value="Dr. Patel">Dr. Patel</SelectItem>
                <SelectItem value="Dr. Kumar">Dr. Kumar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="paymentDate" className="text-sm font-medium">
              Payment Date
            </Label>
            <Input
              id="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={(e) => handleInputChange('paymentDate', e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>

        {/* Paid Amount */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <Label htmlFor="paidAmount" className="text-sm font-medium">
              Paid Amount (₹)
            </Label>
            <Input
              id="paidAmount"
              type="number"
              placeholder="0.00"
              value={formData.paidAmount}
              onChange={(e) => handleInputChange('paidAmount', e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>

        {/* Membership Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="membership"
            checked={formData.membership}
            onChange={() => handleCheckboxChange('membership')}
            className="w-4 h-4 rounded border-input text-[#4DB8AC] focus:ring-[#4DB8AC] dark:text-[#1E6B8C] dark:focus:ring-[#1E6B8C] cursor-pointer"
          />
          <Label htmlFor="membership" className="text-sm font-medium cursor-pointer">
            Membership
          </Label>
        </div>

        {/* Total Cost, Discount, Tax, Grand Total */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <Label htmlFor="totalCost" className="text-sm font-medium">
              Total Cost (₹)
            </Label>
            <Input
              id="totalCost"
              type="number"
              placeholder="0.00"
              value={formData.totalCost}
              onChange={(e) => handleInputChange('totalCost', e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="totalDiscount" className="text-sm font-medium">
              Total Discount (₹)
            </Label>
            <Input
              id="totalDiscount"
              type="number"
              placeholder="0.00"
              value={formData.totalDiscount}
              onChange={(e) => handleInputChange('totalDiscount', e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="totalTax" className="text-sm font-medium">
              Total Tax (₹)
            </Label>
            <Input
              id="totalTax"
              type="number"
              placeholder="0.00"
              value={formData.totalTax}
              onChange={(e) => handleInputChange('totalTax', e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="grandTotal" className="text-sm font-medium">
              Grand Total (₹)
            </Label>
            <Input
              id="grandTotal"
              type="number"
              placeholder="0.00"
              value={formData.grandTotal}
              onChange={(e) => handleInputChange('grandTotal', e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>

        {/* Payment Type Radio Buttons */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Payment Type</Label>
          <div className="flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="Finance"
                checked={formData.paymentType === 'Finance'}
                onChange={(e) => handleInputChange('paymentType', e.target.value)}
                className="w-4 h-4 border-input text-[#4DB8AC] focus:ring-[#4DB8AC] dark:text-[#1E6B8C] dark:focus:ring-[#1E6B8C] cursor-pointer"
              />
              <span className="text-sm">Finance</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="Cheque"
                checked={formData.paymentType === 'Cheque'}
                onChange={(e) => handleInputChange('paymentType', e.target.value)}
                className="w-4 h-4 border-input text-[#4DB8AC] focus:ring-[#4DB8AC] dark:text-[#1E6B8C] dark:focus:ring-[#1E6B8C] cursor-pointer"
              />
              <span className="text-sm">Cheque</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="Other"
                checked={formData.paymentType === 'Other'}
                onChange={(e) => handleInputChange('paymentType', e.target.value)}
                className="w-4 h-4 border-input text-[#4DB8AC] focus:ring-[#4DB8AC] dark:text-[#1E6B8C] dark:focus:ring-[#1E6B8C] cursor-pointer"
              />
              <span className="text-sm">Other</span>
            </label>

            <span className="text-xs text-muted-foreground ml-2">(Select for Payment Modes)</span>
          </div>
        </div>

        {/* Credit Note Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="creditNote"
            checked={formData.creditNote}
            onChange={() => handleCheckboxChange('creditNote')}
            className="w-4 h-4 rounded border-input text-[#4DB8AC] focus:ring-[#4DB8AC] dark:text-[#1E6B8C] dark:focus:ring-[#1E6B8C] cursor-pointer"
          />
          <Label htmlFor="creditNote" className="text-sm font-medium cursor-pointer">
            Credit Note
          </Label>
        </div>

        {/* Pay Amount and Pending Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="payAmount" className="text-sm font-medium">
              Pay Amount (₹)
            </Label>
            <Input
              id="payAmount"
              type="number"
              placeholder="0.00"
              value={formData.payAmount}
              onChange={(e) => handleInputChange('payAmount', e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="pendingAmount" className="text-sm font-medium">
              Pending Amount (₹)
            </Label>
            <Input
              id="pendingAmount"
              type="number"
              value={formData.pendingAmount}
              placeholder="0.00"
              className="mt-1.5"
              readOnly
            />
          </div>
        </div>

        {/* Payment Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="paymentMode" className="text-sm font-medium">
              Payment Mode
            </Label>
            <Select
              value={formData.paymentMode}
              onValueChange={(value) => handleInputChange('paymentMode', value)}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="--- Select ---" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Net Banking">Net Banking</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="px-8"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-8 bg-[#4DB8AC] hover:bg-[#4DB8AC]/90 dark:bg-[#1E6B8C] dark:hover:bg-[#1E6B8C]/90"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
