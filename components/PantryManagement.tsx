import { useState } from 'react'
import { createPantryStaff, updatePantryStaff, deletePantryStaff } from '../services/api'

export default function PantryManagement({ pantryStaff, setPantryStaff }) {
  const [newStaff, setNewStaff] = useState({
    name: '',
    contactInfo: '',
    location: ''
  })

  const handleInputChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const createdStaff = await createPantryStaff(newStaff)
      setPantryStaff([...pantryStaff, createdStaff])
      setNewStaff({
        name: '',
        contactInfo: '',
        location: ''
      })
    } catch (error) {
      console.error('Error creating pantry staff:', error)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Pantry Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={newStaff.name}
          onChange={handleInputChange}
          placeholder="Staff Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="contactInfo"
          value={newStaff.contactInfo}
          onChange={handleInputChange}
          placeholder="Contact Info"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={newStaff.location}
          onChange={handleInputChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600">
          Add Pantry Staff
        </button>
      </form>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Pantry Staff List</h3>
        <ul className="space-y-2">
          {pantryStaff.map((staff) => (
            <li key={staff.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{staff.name}</span>
              <button
                onClick={() => deletePantryStaff(staff.id).then(() => setPantryStaff(pantryStaff.filter(s => s.id !== staff.id)))}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

