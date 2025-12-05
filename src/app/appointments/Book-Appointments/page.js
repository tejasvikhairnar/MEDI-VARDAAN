'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth
} from 'date-fns'

export default function BookAppointmentsPage() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedClinic, setSelectedClinic] = useState('Panvel')
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [view, setView] = useState('month')

  // Mock appointment data
  const [appointments] = useState([
    { id: 1, date: '2025-12-01', time: '1p', patient: 'Rajesh', age: 70 },
    { id: 2, date: '2025-12-01', time: '3p', patient: 'Ravindra', age: 70 },
    { id: 3, date: '2025-12-03', time: '7p', patient: 'Akash', age: 70 },
    { id: 4, date: '2025-12-03', time: '7:30p', patient: 'Akash', age: 70 },
    { id: 5, date: '2025-12-04', time: '11a', patient: 'Jitendra', age: 70 },
    { id: 6, date: '2025-12-06', time: '2p', patient: 'Pooja Chauhan', age: 70 },
  ])

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
            className="h-8 px-3"
          >
            today
          </Button>
        </div>

        <h2 className="text-2xl font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>

        <div className="flex gap-1">
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('month')}
            className="h-8 px-3"
          >
            month
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
            className="h-8 px-3"
          >
            week
          </Button>
          <Button
            variant={view === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('day')}
            className="h-8 px-3"
          >
            day
          </Button>
        </div>
      </div>
    )
  }

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day, index) => (
          <div
            key={index}
            className="text-center py-2 text-sm font-medium bg-green-100 dark:bg-green-900/20"
          >
            {day}
          </div>
        ))}
      </div>
    )
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd')
        const cloneDay = day
        const dateStr = format(day, 'yyyy-MM-dd')

        // Get appointments for this day
        const dayAppointments = appointments.filter(
          apt => apt.date === dateStr
        )

        days.push(
          <div
            key={day}
            className={`min-h-[120px] border border-gray-300 dark:border-gray-600 p-2 ${
              !isSameMonth(day, monthStart)
                ? 'bg-gray-100 dark:bg-gray-800/50 text-muted-foreground'
                : 'bg-white dark:bg-gray-900'
            } hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer transition-colors`}
            onClick={() => handleDateClick(cloneDay)}
          >
            <div className="text-right mb-1">
              <span
                className={`text-sm font-semibold ${
                  !isSameMonth(day, monthStart)
                    ? 'text-gray-400 dark:text-gray-600'
                    : 'text-blue-600 dark:text-blue-400'
                }`}
              >
                {formattedDate}
              </span>
            </div>
            <div className="space-y-1">
              {dayAppointments.map((apt, idx) => (
                <div
                  key={idx}
                  className="text-xs bg-[#4DB8AC] hover:bg-[#4DB8AC]/90 dark:bg-[#1E6B8C] dark:hover:bg-[#1E6B8C]/90 text-white px-2 py-1 rounded shadow-sm"
                >
                  <div className="font-medium">{apt.time} {apt.patient} ({apt.age})</div>
                </div>
              ))}
            </div>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      )
      days = []
    }
    return <div>{rows}</div>
  }

  const handleDateClick = (day) => {
    const formattedDate = format(day, 'dd-MMM-yyyy')
    router.push(`/appointments/book-form?date=${formattedDate}&clinic=${selectedClinic}&doctor=${selectedDoctor}`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#4DB8AC]/10 dark:bg-[#1E6B8C]/20">
          <Settings className="w-5 h-5 text-[#ffffff]" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-[#e3dcdb]">APPOINTMENT</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select value={selectedClinic} onValueChange={setSelectedClinic}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Panvel">Panvel</SelectItem>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
            <SelectItem value="Thane">Thane</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
          <SelectTrigger>
            <SelectValue placeholder="-- Select Doctor --" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dr-smith">Dr. Smith</SelectItem>
            <SelectItem value="dr-patel">Dr. Patel</SelectItem>
            <SelectItem value="dr-kumar">Dr. Kumar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
        <div className="p-6">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      </div>
    </div>
  )
}
