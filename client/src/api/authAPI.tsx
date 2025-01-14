import { UserLogin } from '../../../client/src/interfaces/UserLogin'; // Adjust the import path as necessary

export const login = async (userInfo: UserLogin) => {
  try {
    console.log('Sending login request:', userInfo);
    
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to login');
    }
    
    return data;
  } catch (error) {
    console.error('Full error details:', error);
    throw new Error('Failed to login');
  }
};