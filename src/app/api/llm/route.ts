export async function GET(request: Request) {
  return Response.json({
    list: '"spotlight", "bentogrid", "timelinescroll", "backgroundbeams" \n',
  });
}
