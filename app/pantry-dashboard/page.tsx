'use client'

import React, { useState, useEffect } from 'react';
import { getMealPreparationTasks, getDeliveryPersonnel, getMealDeliveries } from '../../services/api';
import MealPreparationManagement from '../../components/MealPreparationManagement';
import DeliveryPersonnelManagement from '../../components/DeliveryPersonnelManagement';
import MealDeliveryTracking from '../../components/MealDeliveryTracking';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PantryDashboard() {
  const [preparationTasks, setPreparationTasks] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
  const [mealDeliveries, setMealDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [tasksData, personnelData, deliveriesData] = await Promise.all([
          getMealPreparationTasks(),
          getDeliveryPersonnel(),
          getMealDeliveries()
        ]);

        setPreparationTasks(tasksData);
        setDeliveryPersonnel(personnelData);
        setMealDeliveries(deliveriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch pantry dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading pantry dashboard data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Inner Pantry Dashboard</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="preparation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="preparation">Meal Preparation</TabsTrigger>
          <TabsTrigger value="personnel">Delivery Personnel</TabsTrigger>
          <TabsTrigger value="deliveries">Meal Deliveries</TabsTrigger>
        </TabsList>

        <TabsContent value="preparation">
          <MealPreparationManagement tasks={preparationTasks} setTasks={setPreparationTasks} />
        </TabsContent>

        <TabsContent value="personnel">
          <DeliveryPersonnelManagement personnel={deliveryPersonnel} setPersonnel={setDeliveryPersonnel} />
        </TabsContent>

        <TabsContent value="deliveries">
          <MealDeliveryTracking deliveries={mealDeliveries} setDeliveries={setMealDeliveries} personnel={deliveryPersonnel} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

