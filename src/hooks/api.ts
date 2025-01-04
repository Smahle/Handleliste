const BASE_URL = "https://kassal.app/api/v1/";
const TOKEN = "Vc6oCV3QeMen3keN2bYlk27LUGtXVQQiUVmLZhoj";

export async function fetchProducts(searchTerm?: string, sort?: string) {
  const url = new URL(`${BASE_URL}products`);

  // Add query parameters if provided
  if (searchTerm) url.searchParams.append("search", searchTerm);
  if (sort) url.searchParams.append("sort", sort);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data; // Assuming the products are in "data"
}
