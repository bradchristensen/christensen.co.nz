import "isomorphic-fetch";

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const response = await fetch(
      "https://www.duolingo.com/2017-06-30/users?username=bradchristensen"
    );
    const { users } = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(users[0])
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
}
