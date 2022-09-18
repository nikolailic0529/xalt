export default (error, text) => {
  if (typeof(error?.response?.data) === 'string') {
    return error?.response?.data || text;
  } else if (Array.isArray(error?.response?.data?.errors)) {
    if (typeof(error?.response?.data?.errors[0]) === 'string') {
      return error?.response?.data?.errors[0] || text;
    } else if (typeof(error?.response?.data?.errors[0]) === 'object') {
      return error?.response?.data?.errors[0].detail || text;
    } else if (Array.isArray(error?.response?.data?.errors[0])) {
      return error?.response?.data?.errors[0] || text;
    }
  } else if (typeof(error?.response?.data?.errors) === 'object') {
    return error?.response?.data?.errors[0] || error?.response?.data?.errors?.full_messages || error?.response?.data?.errors?.detail || text;
  }
  return text;
};