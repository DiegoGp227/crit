export const BaseURL = "/api/";

export const LoginURL = `${BaseURL}login`;
export const SignupURL = `${BaseURL}signup`;
export const LogoutURL = `${BaseURL}logout`;
export const UploadURL = `${BaseURL}upload`;
export const MeURL = `${BaseURL}me`;
export const MeProfileURL = `${BaseURL}me/profile`;
export const RiderURL = (id: number) => `${BaseURL}riders/${id}`;
export const BibsURL = `${BaseURL}bibs`;
export const MeRegistrationURL = `${BaseURL}me/registration`;
export const AdminRegistrationsURL = `${BaseURL}admin/registrations`;
