import { createAuthClient } from "@neondatabase/neon-js/auth"
import { BetterAuthReactAdapter } from '@neondatabase/neon-js/auth/react/adapters';

const neonAuthUrl = import.meta.env.VITE_NEON_AUTH_URL;

if (!neonAuthUrl) {
    throw new Error('VITE_NEON_AUTH_URL is not configured for the frontend.');
}

// credentials: 'include' sends the session cookie on cross-origin requests.
// Required if you later call authClient.token() from an origin other than your Managed Better Auth URL.
export const authClient = createAuthClient(neonAuthUrl, {
    adapter: BetterAuthReactAdapter(),
    // fetchOptions: { credentials: 'include' },
})
