import api from './api';

export async function getRecords({ token }) {
  const { data, status } = await api.get('/records', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}

export async function deleteRecordById({ token, recordId }) {
  const { data, status } = await api.delete(`/records/${recordId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}
