// Utility functions for managing payroll paths via API

export const readSavedPaths = async (): Promise<string[]> => {
  try {
    const response = await fetch('/api/payroll-paths');
    if (response.ok) {
      const data = await response.json();
      return data.paths || [];
    }
    return [];
  } catch (error) {
    console.error('Error reading saved paths:', error);
    return [];
  }
};

export const savePath = async (newPath: string): Promise<string[]> => {
  try {
    const response = await fetch('/api/payroll-paths', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: newPath }),
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.paths || [];
    }
    return [];
  } catch (error) {
    console.error('Error saving path:', error);
    return [];
  }
};

export const deletePath = async (pathToDelete: string): Promise<string[]> => {
  try {
    const response = await fetch('/api/payroll-paths', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: pathToDelete }),
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.paths || [];
    }
    return [];
  } catch (error) {
    console.error('Error deleting path:', error);
    return [];
  }
};