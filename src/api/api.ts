import { useEffect, useState } from "react";

const BASE_URL = "https://kassal.app/api/v1/";
const TOKEN = "Vc6oCV3QeMen3keN2bYlk27LUGtXVQQiUVmLZhoj";

export function useFetchProducts(searchTerm?: string, sort?: string) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
      const url = new URL(`${BASE_URL}products`);

      if (searchTerm) url.searchParams.append("search", searchTerm);
      if (sort) url.searchParams.append("sort", sort);

      try {
        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        if (!response.ok) {
          if (response.status === 422) {
            setError("The request could not be processed. Please check your input.");
          } else {
            setError("Something went wrong! Please try again later.");
          }
          return;
        }

        const result = await response.json();
        setData(result.data || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "An error occurred");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, sort]);

  return { data, error, loading };
}
