import { defineNitroConfig } from 'nitropack/config';
 
// allow long running functions
export default defineNitroConfig({
  vercel: {
    functions: {
      maxDuration: 300
    },
  },
});
