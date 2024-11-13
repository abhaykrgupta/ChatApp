//all the utility function will be inside this fnction 
// all the urls of api routes


export const HOST = import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${HOST}/${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${HOST}/${AUTH_ROUTES}/login`

