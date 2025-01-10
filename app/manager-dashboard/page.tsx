'use client'

import { useState, useEffect } from 'react'
import { getPatients, getDietCharts, getMealDeliveries, getPantryPerformance } from '../../services/api'
import PatientManagement from '../../components/PatientManagement'
import DietChartManagement from '../../components/DietChartManagement'
import DeliveryTracking from '../../components/DeliveryTracking'
import PantryPerformance from '../../components/PantryPerformance'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function ManagerDashboard() {
  const [patients, setPatients] = useState([])
  const [dietCharts, setDietCharts] = useState([])
  const [deliveries, setDeliveries] = useState([])
  const [pantryPerformance, setPantryPerformance] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('patients')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Add individual try-catch blocks for each API call
      let patientsData = [], dietChartsData = [], deliveriesData = [], performanceData = null

      try {
        patientsData = await getPatients()
      } catch (e) {
        console.error('Error fetching patients:', e)
      }

      try {
        dietChartsData = await getDietCharts()
      } catch (e) {
        console.error('Error fetching diet charts:', e)
      }

      try {
        deliveriesData = await getMealDeliveries()
      } catch (e) {
        console.error('Error fetching deliveries:', e)
      }

      try {
        performanceData = await getPantryPerformance()
      } catch (e) {
        console.error('Error fetching pantry performance:', e)
      }

      setPatients(patientsData)
      setDietCharts(dietChartsData)
      setDeliveries(deliveriesData)
      setPantryPerformance(performanceData)

      // Only set error if all requests failed
      if (!patientsData.length && !dietChartsData.length && !deliveriesData.length && !performanceData) {
        setError('Failed to fetch dashboard data. Please try again later.')
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Failed to fetch dashboard data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[200px]" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-[120px] w-full" />
        ))}
      </div>
      <Skeleton className="h-[400px] w-full" />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Hospital Food Manager Dashboard</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            <button 
              onClick={fetchDashboardData}
              className="ml-2 underline hover:text-red-400"
            >
              Retry
            </button>
          </AlertDescription>
        </Alert>
      )}

      <Tabs 
        defaultValue="patients" 
        className="space-y-4"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="dietCharts">Diet Charts</TabsTrigger>
          <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
          <TabsTrigger value="performance">Pantry Performance</TabsTrigger>
        </TabsList>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <TabsContent value="patients">
              <PatientManagement patients={patients} setPatients={setPatients} />
            </TabsContent>

            <TabsContent value="dietCharts">
              <DietChartManagement 
                dietCharts={dietCharts} 
                setDietCharts={setDietCharts} 
                patients={patients} 
              />
            </TabsContent>

            <TabsContent value="deliveries">
              <DeliveryTracking deliveries={deliveries} setDeliveries={setDeliveries} />
            </TabsContent>

            <TabsContent value="performance">
              <PantryPerformance performance={pantryPerformance || {
                mealsPreparationOnTime: 0,
                deliverySuccessRate: 0,
                averagePreparationTime: 0,
                averageDeliveryTime: 0
              }} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}

