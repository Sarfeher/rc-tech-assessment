import { useState, useEffect } from 'react';
import { callApi } from './call-api';

interface Hero {
  id: number;
  name: string;
  available: boolean;
}

export function useHeroes() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const data = await callApi<Hero[]>('heroes');
        setHeroes(data);
      } catch (err) {
        setError('Failed to fetch heroes');
      } finally {
        setLoading(false);
      }
    }

    fetchHeroes();
  }, []);

  const toggleAvailability = (id: number) => {
    setHeroes((prevHeroes) =>
      prevHeroes.map((hero) =>
        hero.id === id ? { ...hero, available: !hero.available } : hero
      )
    );
  };

  return { heroes, loading, error, toggleAvailability };
}
