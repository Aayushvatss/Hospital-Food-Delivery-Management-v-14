'use client'

import { useState } from 'react'
import { createPatient, deletePatient } from '../services/api'
import { Patient, PatientFormData } from '../types/patient'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

interface PatientManagementProps {
  patients: Patient[];
  setPatients: (patients: Patient[]) => void;
}

export default function PatientManagement({ patients, setPatients }: PatientManagementProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [newPatient, setNewPatient] = useState<PatientFormData>({
    name: '',
    diseases: '',
    allergies: '',
    roomNumber: '',
    bedNumber: '',
    floorNumber: '',
    age: '',
    gender: '',
    contactInfo: '',
    emergencyContact: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value })
    // Clear any previous error/success messages when user starts typing
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const patientData = {
        ...newPatient,
        diseases: newPatient.diseases.split(',').map(d => d.trim()),
        allergies: newPatient.allergies.split(',').map(a => a.trim()),
        age: parseInt(newPatient.age)
      }

      const createdPatient = await createPatient(patientData)
      setPatients([...patients, createdPatient])
      setNewPatient({
        name: '',
        diseases: '',
        allergies: '',
        roomNumber: '',
        bedNumber: '',
        floorNumber: '',
        age: '',
        gender: '',
        contactInfo: '',
        emergencyContact: ''
      })
      setSuccess('Patient created successfully!')
    } catch (err) {
      setError('Failed to create patient. Please try again.')
      console.error('Error creating patient:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deletePatient(id)
      setPatients(patients.filter(p => p.id !== id))
      setSuccess('Patient deleted successfully!')
    } catch (err) {
      setError('Failed to delete patient. Please try again.')
      console.error('Error deleting patient:', err)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Patient Management</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="name"
          value={newPatient.name}
          onChange={handleInputChange}
          placeholder="Patient Name"
          disabled={isLoading}
          required
        />
        <Input
          type="text"
          name="diseases"
          value={newPatient.diseases}
          onChange={handleInputChange}
          placeholder="Diseases (comma-separated)"
          disabled={isLoading}
        />
        <Input
          type="text"
          name="allergies"
          value={newPatient.allergies}
          onChange={handleInputChange}
          placeholder="Allergies (comma-separated)"
          disabled={isLoading}
        />
        <div className="grid grid-cols-3 gap-4">
          <Input
            type="text"
            name="roomNumber"
            value={newPatient.roomNumber}
            onChange={handleInputChange}
            placeholder="Room Number"
            disabled={isLoading}
            required
          />
          <Input
            type="text"
            name="bedNumber"
            value={newPatient.bedNumber}
            onChange={handleInputChange}
            placeholder="Bed Number"
            disabled={isLoading}
            required
          />
          <Input
            type="text"
            name="floorNumber"
            value={newPatient.floorNumber}
            onChange={handleInputChange}
            placeholder="Floor Number"
            disabled={isLoading}
            required
          />
        </div>
        <Input
          type="number"
          name="age"
          value={newPatient.age}
          onChange={handleInputChange}
          placeholder="Age"
          disabled={isLoading}
          required
        />
        <select
          name="gender"
          value={newPatient.gender}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          disabled={isLoading}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <Input
          type="text"
          name="contactInfo"
          value={newPatient.contactInfo}
          onChange={handleInputChange}
          placeholder="Contact Information"
          disabled={isLoading}
          required
        />
        <Input
          type="text"
          name="emergencyContact"
          value={newPatient.emergencyContact}
          onChange={handleInputChange}
          placeholder="Emergency Contact"
          disabled={isLoading}
          required
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Patient...
            </>
          ) : (
            'Add Patient'
          )}
        </Button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Patient List</h3>
        <div className="space-y-2">
          {patients.map((patient) => (
            <div key={patient.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <div>
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-gray-600">Room {patient.roomNumber}, Bed {patient.bedNumber}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => patient.id && handleDelete(patient.id)}
                disabled={isLoading}
              >
                Delete
              </Button>
            </div>
          ))}
          {patients.length === 0 && (
            <p className="text-gray-500 text-center py-4">No patients added yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

