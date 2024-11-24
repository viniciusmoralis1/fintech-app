export async function GET(request: Request) {
  const parsedUrl = new URL(request.url, `http://${request.headers.get('host')}`)
  const queryParams = new URLSearchParams(parsedUrl.search);

  const symbol = queryParams.get('symbol')?.toLowerCase();
  const name = queryParams.get('name')?.toLowerCase();
  const timeStamp = queryParams.get('date')?.toLowerCase();
  const interval = queryParams.get('interval')?.toLowerCase();

  const date = new Date(timeStamp!);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-CA', options);

  const response = await fetch(
    `https://api.coinpaprika.com/v1/tickers/${symbol}-${name}/historical?start=${formattedDate}&interval=${interval}`
  );

  const res = await response.json();
  return Response.json(res);
}
