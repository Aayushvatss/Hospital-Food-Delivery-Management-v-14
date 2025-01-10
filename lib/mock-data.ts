// Mock data store
let mockPatients = [
  {
    id: 1,
    name: "John Doe",
    diseases: ["Diabetes"],
    allergies: ["Peanuts"],
    roomNumber: "101",
    bedNumber: "A",
    floorNumber: "1",
    age: 45,
    gender: "male",
    contactInfo: "555-0101",
    emergencyContact: "555-0102"
  }
];

let mockDeliveryPersonnel = [
  {
    id: 1,
    name: "David Wilson",
    contactInfo: "555-0123",
    otherDetails: "Zone A"
  }
];

let mockMealDeliveries = [
  {
    id: 1,
    patientName: "John Doe",
    roomNumber: "101",
    dietDetails: "Low sodium, Diabetic",
    status: "pending",
    assignedTo: "David Wilson",
    notes: ""
  }
];

let mockDietCharts: any[] = [];

let mockMealPreparationTasks = [
  {
    id: 1,
    patientName: "John Doe",
    mealType: "Breakfast",
    dietDetails: "Low sodium, Diabetic",
    status: "pending"
  },
  {
    id: 2,
    patientName: "Jane Smith",
    mealType: "Lunch",
    dietDetails: "Vegetarian",
    status: "in_progress"
  }
];

export const mockDataOperations = {
  // Patient operations
  getPatients: () => [...mockPatients],
  createPatient: (data: any) => {
    const newPatient = { ...data, id: mockPatients.length + 1 };
    mockPatients.push(newPatient);
    return newPatient;
  },
  updatePatient: (id: number, data: any) => {
    mockPatients = mockPatients.map(p => p.id === id ? { ...p, ...data } : p);
    return mockPatients.find(p => p.id === id);
  },
  deletePatient: (id: number) => {
    mockPatients = mockPatients.filter(p => p.id !== id);
    return true;
  },

  // Delivery personnel operations
  getDeliveryPersonnel: () => [...mockDeliveryPersonnel],
  createDeliveryPersonnel: (data: any) => {
    const newPerson = { ...data, id: mockDeliveryPersonnel.length + 1 };
    mockDeliveryPersonnel.push(newPerson);
    return newPerson;
  },
  updateDeliveryPersonnel: (id: number, data: any) => {
    mockDeliveryPersonnel = mockDeliveryPersonnel.map(p => p.id === id ? { ...p, ...data } : p);
    return mockDeliveryPersonnel.find(p => p.id === id);
  },
  deleteDeliveryPersonnel: (id: number) => {
    mockDeliveryPersonnel = mockDeliveryPersonnel.filter(p => p.id !== id);
    return true;
  },

  // Meal delivery operations
  getMealDeliveries: () => [...mockMealDeliveries],
  updateMealDeliveryStatus: (id: number, status: string) => {
    mockMealDeliveries = mockMealDeliveries.map(d => 
      d.id === id ? { ...d, status } : d
    );
    return mockMealDeliveries.find(d => d.id === id);
  },
  assignMealToDeliveryPersonnel: (mealId: number, personnelId: number) => {
    const personnel = mockDeliveryPersonnel.find(p => p.id === personnelId);
    if (!personnel) return null;
    
    mockMealDeliveries = mockMealDeliveries.map(d => 
      d.id === mealId ? { ...d, assignedTo: personnel.name } : d
    );
    return mockMealDeliveries.find(d => d.id === mealId);
  },

  // Meal preparation tasks operations
  getMealPreparationTasks: () => [...mockMealPreparationTasks],
  updateMealPreparationStatus: (id: number, status: string) => {
    mockMealPreparationTasks = mockMealPreparationTasks.map(task => 
      task.id === id ? { ...task, status } : task
    );
    return mockMealPreparationTasks.find(task => task.id === id);
  },

  // Diet chart operations
  getDietCharts: () => [...mockDietCharts],
  createDietChart: (data: any) => {
    const newDietChart = { ...data, id: mockDietCharts.length + 1 };
    mockDietCharts.push(newDietChart);
    return newDietChart;
  },
  updateDietChart: (id: number, data: any) => {
    const index = mockDietCharts.findIndex(chart => chart.id === id);
    if (index !== -1) {
      mockDietCharts[index] = { ...mockDietCharts[index], ...data };
      return mockDietCharts[index];
    }
    return null;
  },
  deleteDietChart: (id: number) => {
    const index = mockDietCharts.findIndex(chart => chart.id === id);
    if (index !== -1) {
      mockDietCharts.splice(index, 1);
      return id;
    }
    return null;
  },

  // Pantry performance
  getPantryPerformance: () => ({
    mealsPreparationOnTime: 95,
    deliverySuccessRate: 98,
    averagePreparationTime: 20, // minutes
    averageDeliveryTime: 15 // minutes
  })
};

