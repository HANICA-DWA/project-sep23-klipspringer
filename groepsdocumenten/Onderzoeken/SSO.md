In database 'provider' field for distinction between login providers
For both redirect field, e.g. /auth/google

# Google Sign-In

Authorization credentials, some lines in client
https://developers.google.com/identity/sign-in/web/sign-in

Logged in, token_ID containing all user information to backend.
https://github.com/google/google-auth-library-nodejs for verifying token
Check if "aud" is YOUR_APPS_CLIENT_ID,
and "iss" == "accounts.google.com" or "iss" == "https://accounts.google.com"
"sub" can be used as an user identifier
"exp" has not passed
https://developers.google.com/identity/sign-in/web/backend-auth

After you have verified the token, check if the user is already in your user database. If so, establish an authenticated session for the user. If the user isn't yet in your user database, create a new user record from the information in the ID token payload, and establish a session for the user. You can prompt the user for any additional profile information you require when you detect a newly created user in your app.

Useful data for BKS:

- email ?
- name (consists of given_name and family_name)
- picture

# LinkedIn Sign-In

Redirect URI required

https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fconsumer%2Fcontext&tabs=HTTPS1

For authorization (loggin in).
In step 2, use openid
This returns an id, and access token

https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2

Id to backend
Validate ID

Check if "aud" is YOUR_APPS_CLIENT_ID,
and "iss" == "https://www.linkedin.com"
"sub" can be used as an user identifier
"exp" has not passed

Use "GET https://api.linkedin.com/v2/userinfo
Authorization: Bearer <access token>" to get profile information

Useful data for BKS:

- email ?
- name (consists of given_name and family_name)
- picture

![Linkedin validation](<linkedin validate token.png>)
