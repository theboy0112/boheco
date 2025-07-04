export async function handler(event) {
  const { endpoint, acctNo, q } = event.queryStringParameters;

  if (!endpoint) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'endpoint' query parameter." }),
    };
  }

  let apiUrl = "";

  if (endpoint === "get-account-by-account-number" && acctNo) {
    apiUrl = `http://119.93.33.254:8447/inquiry-api/public/api/${endpoint}?acctNo=${acctNo}`;
  } else if (endpoint === "get-latest-bills" && q) {
    apiUrl = `http://119.93.33.254:8447/inquiry-api/public/api/${endpoint}?q=${q}`;
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required parameters." }),
    };
  }

  try {
    const res = await fetch(apiUrl);
    const data = await res.text();

    return {
      statusCode: 200,
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch from backend.",
        details: err.message,
      }),
    };
  }
}
