import { http, HttpResponse } from 'msw'

interface LoginRequest {
  user: string;
  password: string;
}
interface TodoListItem {
  title: string;
  deadline: string;
  finished: boolean;
  priority: number;
}
interface UpdateRequestBody {
  todoListItems: TodoListItem[];
}
let sessionKey = 'Bearer 12345678';
let todoListItems: any[] = [];

export const handlers = [

  http.post('/api/login', async ({ request }) => {
    try {
      const body:LoginRequest = (await request.json()) as LoginRequest;  //would probably crash if additional field provided
      const { user, password } = body;

      if (user === 'user' && password === 'password') {
        console.log('Login successful');
        return HttpResponse.json(
          { message: 'Login successful' },
          {
            headers: {
              'Authorization': sessionKey,
            },
          }
        );
      } else {
        console.log('Login failed');
        return HttpResponse.json(
          { error: 'Invalid username or password' },
          { status: 401 }
        );
      }
    }catch (error) {
      console.error('Failed to parse JSON:', error);
      return HttpResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }
  }),
  http.post('/api/update', async ({ request }) => {
    try {
      const body: UpdateRequestBody= (await request.json()) as UpdateRequestBody;  //would probably crash if additional field provided
      const authHeader = request.headers.get('Authorization');
      todoListItems = body.todoListItems;

      if (authHeader !== sessionKey) {
        return HttpResponse.json(
          {},
          { status: 401 }
        );
      }
      return HttpResponse.json(
        {message:"added todo list"}
      );
    }catch (error) {
      console.error('Failed to parse JSON:', error);
      return HttpResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }
  }),

  http.get('/api/list', async (request) => {
    try {
      const authHeader = request.request.headers.get('Authorization');
      if (authHeader !== sessionKey) {
        return HttpResponse.json(
          {},
          { status: 401 }
        );
      }
      return HttpResponse.json(
        {todoListItems}
      );
    }catch (error) {
      console.error('server died: ', error);
      return HttpResponse.json(
        { error: 'Server crash' },
        { status: 500 }
      );
    }
  })
]
