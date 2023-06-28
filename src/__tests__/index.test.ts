import type { IncomingHttpHeaders, IncomingMessage, createServer } from "http";
import { app } from "../index";
import { request } from "http";

const hostname = "127.0.0.1";
const port = 3000;

describe("HTTP Server", () => {
  let server: ReturnType<typeof createServer>;

  beforeAll(() => {
    server = app.listen(port, hostname);
  });

  afterAll(() => {
    server.close();
  });

  it("should return 200 OK with 'Hello World' message", async () => {
    const response = await new Promise<{
      data: string;
      headers: IncomingHttpHeaders;
      statusCode?: number;
    }>((resolve) => {
      const req = request(
        `http://${hostname}:${port}`,
        (res: IncomingMessage) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve({
              data,
              headers: res.headers,
              statusCode: res.statusCode,
            });
          });
        }
      );
      req.end();
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe("text/plain");
    expect(response.data).toBe("Hello World\n");
  });
});
