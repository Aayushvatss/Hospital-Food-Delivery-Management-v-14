import React, { useState } from 'react'
import { createDietChart, updateDietChart, deleteDietChart } from '../services/api'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface Patient {
  id: number;
  name: string;
}

interface Meal {
  type: 'MORNING' | 'EVENING' | 'NIGHT';
  ingredients: string[];
  instructions: string;
}

interface DietChart {
  id: number;
  patientId: number;
  meals: Meal[];
}

interface DietChartManagementProps {
  dietCharts: DietChart[];
  setDietCharts: React.Dispatch<React.SetStateAction<DietChart[]>>;
  patients: Patient[];
}

export default function DietChartManagement({ dietCharts, setDietCharts, patients }: DietChartManagementProps) {
  const [newDietChart, setNewDietChart] = useState<{
    patientId: string;
    meals: {
      [key in 'MORNING' | 'EVENING' | 'NIGHT']: {
        ingredients: string;
        instructions: string;
      }
    }
  }>({
    patientId: '',
    meals: {
      MORNING: { ingredients: '', instructions: '' },
      EVENING: { ingredients: '', instructions: '' },
      NIGHT: { ingredients: '', instructions: '' },
    }
  })
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, mealType?: 'MORNING' | 'EVENING' | 'NIGHT') => {
    if (mealType) {
      setNewDietChart(prev => ({
        ...prev,
        meals: {
          ...prev.meals,
          [mealType]: {
            ...prev.meals[mealType],
            [e.target.name]: e.target.value
          }
        }
      }))
    } else {
      setNewDietChart(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const createdDietChart = await createDietChart({
        patientId: parseInt(newDietChart.patientId),
        meals: Object.entries(newDietChart.meals).map(([type, meal]) => ({
          type,
          ingredients: meal.ingredients.split(',').map(i => i.trim()),
          instructions: meal.instructions
        }))
      })
      setDietCharts([...dietCharts, createdDietChart])
      setNewDietChart({
        patientId: '',
        meals: {
          MORNING: { ingredients: '', instructions: '' },
          EVENING: { ingredients: '', instructions: '' },
          NIGHT: { ingredients: '', instructions: '' },
        }
      })
      setError(null)
    } catch (error) {
      console.error('Error creating diet chart:', error)
      setError('Failed to create diet chart. Please try again.')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteDietChart(id)
      setDietCharts(dietCharts.filter(chart => chart.id !== id))
      setError(null)
    } catch (error) {
      console.error('Error deleting diet chart:', error)
      setError('Failed to delete diet chart. Please try again.')
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Diet Chart Management</h2>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="patientId">Select Patient</Label>
          <Select
            value={newDietChart.patientId}
            onValueChange={(value) => {
              setNewDietChart(prev => ({ ...prev, patientId: value }))
            }}
          >
            <SelectTrigger id="patientId">
              <SelectValue placeholder="Select Patient" />
            </SelectTrigger>
            <SelectContent>
              {patients && patients.length > 0 ? (
                patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id.toString()}>
                    {patient.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>No patients available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {(['MORNING', 'EVENING', 'NIGHT'] as const).map((mealType) => (
          <Card key={mealType}>
            <CardHeader>
              <CardTitle>{mealType.charAt(0) + mealType.slice(1).toLowerCase()} Meal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                name="ingredients"
                value={newDietChart.meals[mealType].ingredients}
                onChange={(e) => handleInputChange(e, mealType)}
                placeholder="Ingredients (comma-separated)"
                required
              />
              <Textarea
                name="instructions"
                value={newDietChart.meals[mealType].instructions}
                onChange={(e) => handleInputChange(e, mealType)}
                placeholder="Special instructions (e.g., no salt, low sugar)"
                required
              />
            </CardContent>
          </Card>
        ))}

        <Button type="submit" className="w-full">Create Diet Chart</Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Existing Diet Charts</h3>
        {dietCharts.length === 0 ? (
          <p className="text-center py-4">No diet charts available.</p>
        ) : (
          dietCharts.map((chart) => (
            <Card key={chart.id} className="mb-4">
              <CardHeader>
                <CardTitle>
                  Diet Chart for {patients.find(p => p.id === chart.patientId)?.name || 'Unknown Patient'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Meal</TableHead>
                      <TableHead>Ingredients</TableHead>
                      <TableHead>Instructions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chart.meals.map((meal) => (
                      <TableRow key={meal.type}>
                        <TableCell>{meal.type}</TableCell>
                        <TableCell>{meal.ingredients.join(', ')}</TableCell>
                        <TableCell>{meal.instructions}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  onClick={() => handleDelete(chart.id)}
                  variant="destructive"
                  className="mt-4"
                >
                  Delete Chart
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

