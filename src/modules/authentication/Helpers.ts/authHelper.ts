export default function decodeToken(request: Request, ser: any): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;

  const [type, token] = authHeader.split(' ');
  return type === 'Bearer' ? token : null;
}
