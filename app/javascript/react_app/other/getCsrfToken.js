const getCsrfToken = () => {
  // Get CSRF token
  return document.querySelector('meta[name="csrf-token"]').content
}

export default getCsrfToken
