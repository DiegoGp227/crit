export const BaseURL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/";

//EXAMPLE URLS
export const LoginURL = new URL("login", BaseURL);
export const projectBoardURL = (id: string) => new URL(`projects/${id}/board`, BaseURL);