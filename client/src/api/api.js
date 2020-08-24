const API_URL = 'http://localhost:2330';

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`,{
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('jwtToken'),
    }
  });
  if (!response.ok && response.statusText == "Unauthorized") {
    return false;
  }
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function createLogEntry(entry) {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-auth-token': localStorage.getItem('jwtToken'),
    },
    body: JSON.stringify(entry),
  });
  return response.json();
}

export async function deleteLogEntry(id) {
  const response = await fetch(`${API_URL}/api/logs/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'x-auth-token': localStorage.getItem('jwtToken'),
    },
  });
  return response.json();
}

export async function getUser() {
  const response = await fetch(`${API_URL}/auth/user`,{
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('jwtToken'),
    }
  });
  if (!response.ok && response.statusText == "Unauthorized") {
    return false;
  }
  const jsonResponse = await response.json();
  return jsonResponse;
}
