import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface User {
  id: number;
  name: string;
}

const API_URL = '/api/data/users?timeout=10000';

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async ({ timeout = 2000 }: { timeout?: number }) => {
    setError(null);
    try {
      const { data } = await axios.get(API_URL, {
        signal: AbortSignal.timeout(timeout),
      });
      setUsers(data);
      setError(null);
    } catch (error: unknown) {
      setUsers([]);
      if (axios.isCancel(error)) {
        setError('Sorry, there seems to be connectivity issues...');
        return;
      } else if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
      }
    }
  };

  useEffect(() => {
    fetchData({ timeout: 2000 });
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex flex-row items-center">
          {error && <ErrorContainer error={error} fetchData={fetchData} />}
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

const ErrorContainer = ({
  error,
  fetchData,
}: {
  error: string | null;
  fetchData: ({ timeout }: { timeout: number }) => void;
}) => {
  return (
    <div>
      <p className="mr-2">{error}</p>
      <button
        onClick={() => fetchData({ timeout: 11000 })}
        className="text-blue-400 bg-blue-200 hover:text-blue-200 hover:bg-blue-400 rounded-md p-4"
      >
        Try again
      </button>
    </div>
  );
};

export default App;
