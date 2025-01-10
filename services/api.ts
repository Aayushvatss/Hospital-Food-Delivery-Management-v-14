import axios from 'axios';
let mockDietCharts: any[] = [];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const isDevelopment = process.env.NODE_ENV === 'development';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Patient endpoints
export const getPatients = async () => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.getPatients();
    }
    const response = await api.get('/patients');
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.getPatients();
    }
    throw error;
  }
};

export const createPatient = async (patientData: any) => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.createPatient(patientData);
    }
    const response = await api.post('/patients', patientData);
    return response.data;
  } catch (error) {
    console.error('Error creating patient:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.createPatient(patientData);
    }
    throw error;
  }
};

export const updatePatient = async (id: number, patientData: any) => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.updatePatient(id, patientData);
    }
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
  } catch (error) {
    console.error('Error updating patient:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.updatePatient(id, patientData);
    }
    throw error;
  }
};

export const deletePatient = async (id: number) => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.deletePatient(id);
    }
    const response = await api.delete(`/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting patient:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.deletePatient(id);
    }
    throw error;
  }
};

// Delivery personnel endpoints
export const getDeliveryPersonnel = async () => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.getDeliveryPersonnel();
    }
    const response = await api.get('/delivery-personnel');
    return response.data;
  } catch (error) {
    console.error('Error fetching delivery personnel:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.getDeliveryPersonnel();
    }
    throw error;
  }
};

export const createDeliveryPersonnel = async (personnelData: any) => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.createDeliveryPersonnel(personnelData);
    }
    const response = await api.post('/delivery-personnel', personnelData);
    return response.data;
  } catch (error) {
    console.error('Error creating delivery personnel:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.createDeliveryPersonnel(personnelData);
    }
    throw error;
  }
};

// Meal delivery endpoints
export const getMealDeliveries = async () => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.getMealDeliveries();
    }
    const response = await api.get('/meal-deliveries');
    return response.data;
  } catch (error) {
    console.error('Error fetching meal deliveries:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.getMealDeliveries();
    }
    throw error;
  }
};

export const updateMealDeliveryStatus = async (id: number, status: string) => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.updateMealDeliveryStatus(id, status);
    }
    const response = await api.put(`/meal-deliveries/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating meal delivery status:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.updateMealDeliveryStatus(id, status);
    }
    throw error;
  }
};

export const assignMealToDeliveryPersonnel = async (mealId: number, personnelId: number) => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.assignMealToDeliveryPersonnel(mealId, personnelId);
    }
    const response = await api.post('/assign-meal', { mealId, personnelId });
    return response.data;
  } catch (error) {
    console.error('Error assigning meal to delivery personnel:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.assignMealToDeliveryPersonnel(mealId, personnelId);
    }
    throw error;
  }
};

// Meal preparation tasks endpoints
export const getMealPreparationTasks = async () => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.getMealPreparationTasks();
    }
    const response = await api.get('/meal-preparation-tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching meal preparation tasks:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.getMealPreparationTasks();
    }
    throw error;
  }
};

export const updateMealPreparationStatus = async (id: number, status: string) => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.updateMealPreparationStatus(id, status);
    }
    const response = await api.put(`/meal-preparation-tasks/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating meal preparation status:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.updateMealPreparationStatus(id, status);
    }
    throw error;
  }
};

// Diet chart endpoints
export const getDietCharts = async () => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.getDietCharts();
    }
    const response = await api.get('/diet-charts');
    return response.data;
  } catch (error) {
    console.error('Error fetching diet charts:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.getDietCharts();
    }
    throw error;
  }
};

export const createDietChart = async (dietChartData: {
  patientId: number;
  meals: Array<{
    type: 'MORNING' | 'EVENING' | 'NIGHT';
    ingredients: string[];
    instructions: string;
  }>;
}) => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.createDietChart(dietChartData);
    }
    const response = await api.post('/diet-charts', dietChartData);
    return response.data;
  } catch (error) {
    console.error('Error creating diet chart:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.createDietChart(dietChartData);
    }
    throw error;
  }
};

export const updateDietChart = async (id: number, dietChartData: any) => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.updateDietChart(id, dietChartData);
    }
    const response = await api.put(`/diet-charts/${id}`, dietChartData);
    return response.data;
  } catch (error) {
    console.error('Error updating diet chart:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.updateDietChart(id, dietChartData);
    }
    throw error;
  }
};

export const deleteDietChart = async (id: number) => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.deleteDietChart(id);
    }
    const response = await api.delete(`/diet-charts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting diet chart:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.deleteDietChart(id);
    }
    throw error;
  }
};

// Pantry performance endpoint
export const getPantryPerformance = async () => {
  try {
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return (await import('../lib/mock-data')).mockDataOperations.getPantryPerformance();
    }
    const response = await api.get('/pantry-performance');
    return response.data;
  } catch (error) {
    console.error('Error fetching pantry performance:', error);
    if (isDevelopment) {
      return (await import('../lib/mock-data')).mockDataOperations.getPantryPerformance();
    }
    throw error;
  }
};

export default api;

