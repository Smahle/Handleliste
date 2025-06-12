import { useEffect, useState } from "react";

const BASE_URL = "https://kassal.app/api/v1/";
const TOKEN = "Vc6oCV3QeMen3keN2bYlk27LUGtXVQQiUVmLZhoj";

export function useFetchProducts(
  searchTerm?: string,
  sortPrice?: string,
  retryTrigger?: number
) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (sortPrice) params.append("sort", sortPrice);

      const url = `${BASE_URL}products?${params.toString()}`;
      console.log("Fetching from:", url);

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        if (!response.ok) {
          const message =
            response.status === 422
              ? "The request could not be processed. Please check your input."
              : "Something went wrong! Please try again later.";
          setError(message);
          return;
        }

        const result = await response.json();
        console.log("API result:", result);
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
  }, [searchTerm, sortPrice, retryTrigger]);

  return { data, error, loading };
}
