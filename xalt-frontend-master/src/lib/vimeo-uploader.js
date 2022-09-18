import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
  Accept: 'application/vnd.vimeo.*+json;version=3.2',
};

const createSlot = () => axios({
  method: 'POST',
  url: 'https://api.vimeo.com/me/videos',
  headers,
  data: {
    type: 'streaming',
    upgrade_to_1080: false,
  },
});

const complete = (url) => axios({
  method: 'DELETE',
  url: `https://api.vimeo.com${url}`,
  headers,
});

const send = async ({
  onSuccess,
  onProgress,
  onError,
  url,
  file,
}) => {
  let content = file;
  let end = file.size;
  const chunkSize = 0;
  const offset = 0;

  if (offset || chunkSize) {
    if (chunkSize) {
      end = Math.min(offset + chunkSize, file.size);
    }

    content = content.slice(offset, end);
  }

  const xhr = new XMLHttpRequest();
  xhr.open('PUT', url, true);
  xhr.setRequestHeader('Content-Type', file.type);
  xhr.setRequestHeader('Content-Range', `bytes ${offset}-${end - 1}/${file.size}`);

  if (xhr.upload) {
    xhr.upload.addEventListener('progress', onProgress);
  }

  xhr.onload = onSuccess;
  xhr.onerror = onError;
  xhr.send(content);
};

export default async ({
  file, onSuccess, onProgress, onError,
}) => {
  const formData = new FormData();
  formData.append('file', file);

  const resp = await createSlot();

  await send({
    onSuccess: async () => {
      const completeResponse = await complete(resp.data.complete_uri);

      const videoId = completeResponse.headers.location.split('/').pop();

      onSuccess(`/videos/${videoId}`);
    },
    onProgress,
    onError,
    url: resp.data.upload_link_secure,
    file,
  });
};
