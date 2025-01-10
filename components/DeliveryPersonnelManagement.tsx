import React, { useState, useEffect } from 'react';
import { getDeliveryPersonnel, createDeliveryPersonnel } from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface DeliveryPersonnel {
  id: number;
  name: string;
  contactInfo: string;
  otherDetails: string;
}

export default function DeliveryPersonnelManagement() {
  const [personnel, setPersonnel] = useState<DeliveryPersonnel[]>([]);
  const [newPersonnel, setNewPersonnel] = useState({ name: '', contactInfo: '', otherDetails: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getDeliveryPersonnel();
      setPersonnel(data);
    } catch (err) {
      setError('Failed to fetch delivery personnel. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPersonnel({ ...newPersonnel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      const createdPersonnel = await createDeliveryPersonnel(newPersonnel);
      setPersonnel([...personnel, createdPersonnel]);
      setNewPersonnel({ name: '', contactInfo: '', otherDetails: '' });
    } catch (err) {
      setError('Failed to create delivery personnel. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Delivery Personnel Management</h2>
        <SkeletonTable columns={3} rows={3} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Delivery Personnel Management</h2>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          name="name"
          value={newPersonnel.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          disabled={isSubmitting}
        />
        <Input
          type="text"
          name="contactInfo"
          value={newPersonnel.contactInfo}
          onChange={handleInputChange}
          placeholder="Contact Info"
          required
          disabled={isSubmitting}
        />
        <Input
          type="text"
          name="otherDetails"
          value={newPersonnel.otherDetails}
          onChange={handleInputChange}
          placeholder="Other Details"
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Delivery Personnel'}
        </Button>
      </form>

      {personnel.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No delivery personnel available
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Other Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personnel.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.contactInfo}</TableCell>
                <TableCell>{person.otherDetails}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-end">
        <Button onClick={fetchPersonnel} variant="outline">
          Refresh List
        </Button>
      </div>
    </div>
  );
}

