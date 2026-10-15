import { createStart, createCsrfMiddleware } from "@tanstack/react-start";

// Defining this file replaces the default setup, so the CSRF check
// for server functions has to be added back by hand.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
}));
