export const BaseURL = "/api/";

export const LoginURL = `${BaseURL}login`;
export const SignupURL = `${BaseURL}signup`;
export const LogoutURL = `${BaseURL}logout`;
export const UploadURL = `${BaseURL}upload`;
export const MeURL = `${BaseURL}me`;
export const MeProfileURL = `${BaseURL}me/profile`;
export const RiderURL = (id: number) => `${BaseURL}riders/${id}`;
export const RidersURL = `${BaseURL}riders`;
export const BibsURL = `${BaseURL}bibs`;
export const MeRegistrationURL = `${BaseURL}me/registration`;
export const AdminRegistrationsURL = `${BaseURL}admin/registrations`;
export const RacesURL = `${BaseURL}races`;
export const RaceURL = (id: number) => `${BaseURL}races/${id}`;
export const RaceResultsURL = (id: number) => `${BaseURL}races/${id}/results`;
export const AdminRacesURL = `${BaseURL}admin/races`;
export const AdminRaceURL = (id: number) => `${BaseURL}admin/races/${id}`;
export const AdminRaceExcelURL = (id: number) => `${BaseURL}admin/races/${id}/excel`;
export const AdminRaceResultsURL = (id: number) => `${BaseURL}admin/races/${id}/results`;
export const ClassificationURL = `${BaseURL}classification`;

// TEMPORAL - Crear admin (se debe eliminar después)
export const CreateAdminTempURL = `${BaseURL}create-admin-temp`;
