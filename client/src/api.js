const API_URL = 'http://localhost:2330';

export default async function listLogEntries() {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}