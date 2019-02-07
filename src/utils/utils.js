/*

Set of common utils and constants

*/

export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const serverDomain = "https://mighty-anchorage-55505.herokuapp.com";
export const ipAPI_key = "testkey";

export const strings = {
    sessionExpiry: "Session Expired ! You will be redirected to Login page automatically",
    genericError: "An error occured. Please Try again!",
    loginFormValidation: 'Please enter the Username and Password. Username should be a valid email address',
    loginFailed: "Invalid Username or Password",
    signUpSuccess: "Sign up success! You will be redirected to the login page automatically",
    searchValidation: "Please select a valid input"
}