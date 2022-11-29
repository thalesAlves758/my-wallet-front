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

export async function createOrUpdateRecord({ token, value, description, type, recordId }) {
  const action = recordId ? 'put' : 'post';

  const url = `/records${action === 'post' ? '' : `/${recordId}`}`;

  const { data, status } = await api[action](url, { value, description, type }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}
