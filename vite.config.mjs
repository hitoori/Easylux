import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { handleBookingRequest } from "./worker/index.js";
import { readFileSync } from "node:fs";
import path from "node:path";

function bookingApi(localEnv) {
  const workerEnv = {
    ...localEnv,
    ASSETS: {
      async fetch(request) {
        const url = new URL(request.url);
        if (url.pathname !== "/images/brand/easy-lux-logo-wordmark-transparent-v3.png") return new Response("Not found", { status: 404 });
        return new Response(readFileSync(path.resolve("public", `.${url.pathname}`)), { headers: { "content-type": "image/png" } });
      },
    },
  };
  const attach = (server) => {
    server.middlewares.use('/api/booking', async (req, res) => {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const url = `http://${req.headers.host || 'localhost'}/api/booking`;
      const request = new Request(url, {
        method: req.method,
        headers: req.headers,
        body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks),
      });
      const response = await handleBookingRequest(request, workerEnv);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
    });
  };
  return { name: 'booking-api', configureServer: attach, configurePreviewServer: attach };
}

export default defineConfig(({ mode }) => ({
  base: "./",
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.tsx"],
    },
  },
  plugins: [react(), tailwindcss(), bookingApi(loadEnv(mode, process.cwd(), ''))],
}));
