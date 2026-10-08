// Room API calls
const API_URL = 'http://localhost:5000/api/hostel-admin/rooms';

export const fetchRooms = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addRoomApi = async (roomData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roomData),
  });
  return response.json();
};