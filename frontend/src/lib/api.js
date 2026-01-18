const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function login(username, password) {
  // CRITICAL FIX: FastAPI expects URL-encoded form data, NOT JSON.
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      // Try to parse the error message from backend
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Login failed - Server returned ' + response.status);
    }

    return await response.json(); // Returns { access_token: "...", token_type: "bearer" }
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
}

export async function generateContent(payload, token) {
  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Generation failed');
  }

  return response.json();
}