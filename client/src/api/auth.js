const API_URL = 'http://localhost:2330';

export async function createUser(user) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.status >= 200 && response.status <= 299) {
    const jsonResponse = await response.json();
    return jsonResponse;
  } else {
    const jsonResponse = await response.json();
    throw new Error(jsonResponse.message);
  }
}

export async function loginUser(user) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.status >= 200 && response.status <= 299) {
    const { token, user } = await response.json();
    localStorage.setItem("jwtToken", token);
    
    return user;
  } else {
    throw new Error('Invalid Credentials');
  }
}

export async function logoutUser() {
  localStorage.removeItem("jwtToken");
  await fetch(`${API_URL}/auth/logout`);
}

export async function deleteUser() {
  await fetch(`${API_URL}/auth/delete`, {
    method: 'POST',
    headers: {
      'x-auth-token': localStorage.getItem('jwtToken'),
    }
  });
  localStorage.removeItem("jwtToken");
}