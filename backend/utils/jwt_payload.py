from sels.settings import JWT_SECRET, JWT_ALGORITHM
import jwt

def getJWTPayload(request):
    token = request.COOKIES.get('jwt')
    payload = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)

    return payload
