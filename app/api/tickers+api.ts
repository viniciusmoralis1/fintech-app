export async function GET(request: Request) {
  const parsedUrl = new URL(request.url, `http://${request.headers.get('host')}`)
  const queryParams = new URLSearchParams(parsedUrl.search);
  const symbol = queryParams.get('symbol')?.toLowerCase();
  const name = queryParams.get('name')?.toLowerCase();

  const response = await fetch(
    `https://api.coinpaprika.com/v1/tickers/${symbol}-${name}/historical?start=2024-01-01&interval=7d`
  )

  const res = await response.json();
  return Response.json(res);
}
