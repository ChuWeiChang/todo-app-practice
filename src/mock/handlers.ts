import { http, HttpResponse } from 'msw'

interface LoginRequest {
  user: string;
  password: string;
}

export const handlers = [

  http.post('/api/login', async ({ request }) => {
    try {
      const body:LoginRequest = (await request.json()) as LoginRequest;  //would probably crash if additional field provided
      const { user, password } = body;

      if (user === 'user' && password === 'password') {
        console.log('Login successful');
        return HttpResponse.json({ message: 'Login successful', sessionKey: "123" });
      } else {
        console.log('Login failed');
        return HttpResponse.json(
          { error: 'Invalid username or password' },
          { status: 401 } // Simulate an HTTP 401 Unauthorized response
        );
      }
    }catch (error) {
      // Handle error if the body cannot be parsed as JSON
      console.error('Failed to parse JSON:', error);
      return HttpResponse.json(
        { error: 'Invalid request data' },
        { status: 400 } // Return a 400 Bad Request if parsing fails
      );
    }
  }),
]
