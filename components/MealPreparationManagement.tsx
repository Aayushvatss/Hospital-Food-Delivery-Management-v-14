import React from 'react';
import { updateMealPreparationStatus } from '../services/api';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface MealPreparationTask {
  id: number;
  patientName: string;
  mealType: string;
  dietDetails: string;
  status: string;
}

interface MealPreparationManagementProps {
  tasks: MealPreparationTask[];
  setTasks: React.Dispatch<React.SetStateAction<MealPreparationTask[]>>;
}

export default function MealPreparationManagement({ tasks, setTasks }: MealPreparationManagementProps) {
  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await updateMealPreparationStatus(id, newStatus);
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, status: newStatus } : task
      ));
    } catch (err) {
      console.error('Failed to update meal preparation status:', err);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Meal Preparation Tasks</h2>
      
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No meal preparation tasks available
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Meal Type</TableHead>
              <TableHead>Diet Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.patientName}</TableCell>
                <TableCell>{task.mealType}</TableCell>
                <TableCell>{task.dietDetails}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Select
                    value={task.status}
                    onValueChange={(value) => handleStatusUpdate(task.id, value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

