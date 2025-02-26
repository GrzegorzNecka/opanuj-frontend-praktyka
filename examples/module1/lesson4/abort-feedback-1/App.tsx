import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

const API_URL = '/api/data/users?timeout=10000';
let ctrl: AbortController | null = null;
const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (ctrl) {
      ctrl.abort();
    }
    ctrl = new AbortController();

    try {
      const { data } = await axios.get(API_URL, {
        signal: ctrl.signal,
      });

      setUsers(data);
    } catch (error) {
      setError('Sorry, there seems to be connectivity issues...');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex flex-row items-center">
          {error && (
            <div>
              <p className="mr-2">
                Sorry, there seems to be connectivity issues...
              </p>
              <button
                onClick={() => fetchData()}
                className="text-blue-400 bg-blue-200 hover:text-blue-200 hover:bg-blue-400 rounded-md p-4"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
      <ul className="space-y-2">
        {users &&
          users.map((user, index) => (
            <li
              className="bg-white p-4 rounded-md border border-gray-100"
              key={index}
            >
              {user.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
