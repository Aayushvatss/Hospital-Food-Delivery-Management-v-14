import React, { useState, useEffect } from 'react';
import { getMealDeliveries, updateMealDeliveryStatus, getDeliveryPersonnel, assignMealToDeliveryPersonnel } from '../services/api';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { SkeletonTable } from '@/components/ui/skeleton-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface MealDelivery {
  id: number;
  patientName: string;
  roomNumber: string;
  dietDetails: string;
  status: string;
  assignedTo: string | null;
}

interface DeliveryPersonnel {
  id: number;
  name: string;
}

export default function MealDeliveryTracking() {
  const [deliveries, setDeliveries] = useState<MealDelivery[]>([]);
  const [personnel, setPersonnel] = useState<DeliveryPersonnel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [deliveriesData, personnelData] = await Promise.all([
        getMealDeliveries(),
        getDeliveryPersonnel()
      ]);
      setDeliveries(deliveriesData);
      setPersonnel(personnelData);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      setError(null);
      await updateMealDeliveryStatus(id, newStatus);
      setDeliveries(deliveries.map(delivery => 
        delivery.id === id ? { ...delivery, status: newStatus } : delivery
      ));
    } catch (err) {
      setError('Failed to update meal delivery status. Please try again.');
    }
  };

  const handleAssignPersonnel = async (mealId: number, personnelId: number) => {
    try {
      setError(null);
      await assignMealToDeliveryPersonnel(mealId, personnelId);
      setDeliveries(deliveries.map(delivery => 
        delivery.id === mealId ? { ...delivery, assignedTo: personnel.find(p => p.id === personnelId)?.name || null } : delivery
      ));
    } catch (err) {
      setError('Failed to assign delivery personnel. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Meal Delivery Tracking</h2>
        <SkeletonTable columns={6} rows={3} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Meal Delivery Tracking</h2>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {deliveries.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No meal deliveries available
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Diet Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>{delivery.patientName}</TableCell>
                <TableCell>{delivery.roomNumber}</TableCell>
                <TableCell>{delivery.dietDetails}</TableCell>
                <TableCell>{delivery.status}</TableCell>
                <TableCell>
                  <Select
                    value={delivery.assignedTo || ''}
                    onValueChange={(value) => handleAssignPersonnel(delivery.id, parseInt(value))}
                  >
                    <option value="">Unassigned</option>
                    {personnel.map((person) => (
                      <option key={person.id} value={person.id.toString()}>{person.name}</option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={delivery.status}
                    onValueChange={(value) => handleStatusUpdate(delivery.id, value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="delivered">Delivered</option>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-end">
        <Button onClick={fetchData} variant="outline">
          Refresh Data
        </Button>
      </div>
    </div>
  );
}

