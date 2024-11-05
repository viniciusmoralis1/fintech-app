const API_KEY = process.env.CRYPTO_API;

export async function GET(request: Request) {
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': `${API_KEY}`,
      },
    }
  )

  const res = await response.json();
  return Response.json(res.data);
}
