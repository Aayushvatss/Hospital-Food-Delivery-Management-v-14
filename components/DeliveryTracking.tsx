import { useState, useEffect } from 'react'
import { getMealDeliveries, updateMealDeliveryStatus } from '../services/api'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

interface Delivery {
  id: number;
  patientName: string;
  roomNumber: string;
  mealType: string;
  status: string;
}

interface DeliveryTrackingProps {
  deliveries: Delivery[];
  setDeliveries: React.Dispatch<React.SetStateAction<Delivery[]>>;
}

export default function DeliveryTracking({ deliveries, setDeliveries }: DeliveryTrackingProps) {
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([])
  const [filter, setFilter] = useState('ALL')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (filter === 'ALL') {
      setFilteredDeliveries(deliveries)
    } else {
      setFilteredDeliveries(deliveries.filter(delivery => delivery.status === filter))
    }
  }, [deliveries, filter])

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await updateMealDeliveryStatus(id, newStatus)
      setDeliveries(deliveries.map(delivery => 
        delivery.id === id ? { ...delivery, status: newStatus } : delivery
      ))
      setError(null)
    } catch (error) {
      console.error('Error updating delivery status:', error)
      setError('Failed to update delivery status. Please try again.')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Delivery Tracking</h2>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center space-x-2">
        <label htmlFor="status-filter" className="font-medium">Filter by status:</label>
        <Select
          id="status-filter"
          value={filter}
          onValueChange={(value) => setFilter(value)}
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </Select>
      </div>

      {filteredDeliveries.length === 0 ? (
        <p className="text-center py-4">No deliveries found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Meal Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>{delivery.patientName}</TableCell>
                <TableCell>{delivery.roomNumber}</TableCell>
                <TableCell>{delivery.mealType}</TableCell>
                <TableCell>{delivery.status}</TableCell>
                <TableCell>
                  <Select
                    value={delivery.status}
                    onValueChange={(value) => handleUpdateStatus(delivery.id, value)}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

