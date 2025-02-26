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

    setError(null); // Reset error state when starting a new request

    try {
      const { data } = await axios.get(API_URL, {
        signal: ctrl.signal,
      });
      setUsers(data);
    } catch (error: unknown) {
      // Nie ustawiamy błędu jeśli to przerwane żądanie (abort)
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
        return;
      }

      // Specjalna obsługa błędów axios
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Serwer zwrócił odpowiedź z błędem (kod stanu poza zakresem 2xx)
          setError(
            `Error ${error.response.status}: ${
              error.response.data.message || 'Server error'
            }`
          );
        } else if (error.request) {
          // Żądanie zostało wysłane, ale nie otrzymano odpowiedzi
          setError(
            'No response received from server. Please check your connection.'
          );
        } else {
          // Coś poszło nie tak przy konfiguracji żądania
          setError(`Request error: ${error.message}`);
        }
      } else {
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
      }
    }
  };

  useEffect(() => {
    fetchData();

    // Usuwamy timeout, który bezwarunkowo ustawiał błąd
    setTimeout(() => {
      setError('Sorry, there seems to be connectivity issues...');
      if (ctrl) ctrl.abort();
    }, 2000);
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex flex-row items-center">
          {error && (
            <div>
              <p className="mr-2">{error}</p>
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
