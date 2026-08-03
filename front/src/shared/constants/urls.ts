export const BaseURL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/";

export const LoginURL = new URL("login", BaseURL);
export const SignupURL = new URL("signup", BaseURL);
export const UploadURL = new URL("upload", BaseURL);
export const MeURL = new URL("me", BaseURL);
export const MeProfileURL = new URL("me/profile", BaseURL);
export const RiderURL = (id: number) => new URL(`riders/${id}`, BaseURL);
export const BibsURL = new URL("bibs", BaseURL);