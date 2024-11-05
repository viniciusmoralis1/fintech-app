const API_KEY = process.env.CRYPTO_API;

export async function GET(request: Request) {
  const ids = request.headers.get("ids");

  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${ids}`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': `${API_KEY}`,
      },
    }
  )

  const res = await response.json();
  return Response.json(res.data);
}

