export default function authHeader() {
  let token = localStorage.getItem('token') as string
  if (token) {
    return { 'x-access-token': token }
  } else {
    return {}
  }
}
