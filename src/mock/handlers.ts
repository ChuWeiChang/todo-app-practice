import { http, HttpResponse } from 'msw'

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.post('/api/login', () => {
    console.log('Captured a "POST /posts" request')
    return HttpResponse.json({ "1": 123 });
  }),
]
