'use client'

import React, { useState, useEffect } from 'react';
import { getMealDeliveries, updateMealDeliveryStatus } from '../../services/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

interface MealDelivery {
  id: number;
  patientName: string;
  roomNumber: string;
  dietDetails: string;
  status: string;
  notes: string;
}

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState<MealDelivery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const data = await getMealDeliveries();
      setDeliveries(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch meal deliveries');
      setIsLoading(false);
    }
  };

  const handleDeliveryComplete = async (id: number, notes: string) => {
    try {
      await updateMealDeliveryStatus(id, 'delivered');
      setDeliveries(deliveries.map(delivery => 
        delivery.id === id ? { ...delivery, status: 'delivered', notes } : delivery
      ));
    } catch (err) {
      setError('Failed to update delivery status');
    }
  };

  if (isLoading) return <div>Loading meal deliveries...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Delivery Personnel Dashboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Room Number</TableHead>
            <TableHead>Diet Details</TableHead>
            <TableHead>Status</TableHead>
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
                {delivery.status !== 'delivered' && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Delivery notes (optional)"
                      value={delivery.notes}
                      onChange={(e) => setDeliveries(deliveries.map(d => 
                        d.id === delivery.id ? { ...d, notes: e.target.value } : d
                      ))}
                    />
                    <Button onClick={() => handleDeliveryComplete(delivery.id, delivery.notes)}>
                      Mark as Delivered
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

