/* 
Client:
    1. User login request

Server:
    2. Validate credentials
    3. Generate:
        - Access Token (10 min)
        - Refresh Token (30 days)
    4. Store Refresh Token in HttpOnly cookie : set sameSite:"none" if backend & frontend different domain
    5. Respond with Access Token

Client:
    6. Make API request with Authorization: Bearer ACCESS_TOKEN

Server:
    7. Validate Access Token
    - If valid → return data
    - If expired → 401

Client:
    8. On 401 → call /auth/refresh (credentials: include)

Server:
    9. Validate Refresh Token (cookie) : 
        - must be set, otherwise, refresh_token not rc by server from client
        - Access-Control-Allow-Origin: https://client.com
        - Access-Control-Allow-Credentials: true

    10. Issue NEW Access Token
        (optionally rotate refresh token)

Client:
    11. Replace OLD access token with NEW one
    12. Retry original request

Client:
    13. Continue normal requests

*/