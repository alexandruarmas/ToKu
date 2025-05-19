# Routes and Middleware Diagram

## Authentication System
```
ClerkProvider (app/layout.tsx)
├── Handles authentication throughout the application
└── Custom styling and configuration for auth UI
```

## Route Structure
```
app/
├── layout.tsx (Root layout with ClerkProvider)
├── (auth)/ (Authentication routes group)
│   ├── sign-in/
│   └── sign-up/
└── (root)/ (Main application routes)
    ├── layout.tsx
    ├── (home)/ (Dashboard routes)
    │   ├── layout.tsx
    │   ├── page.tsx (Home page)
    │   ├── meeting/ (Nested meeting routes)
    │   ├── personal-room/
    │   ├── previous/
    │   ├── recordings/
    │   └── upcoming/
    └── meeting/ (Meeting routes)
        ├── layout.tsx
        └── [id]/ (Dynamic meeting route)
```

## Middleware
```
middleware.ts (Root)
└── Currently disabled (empty implementation)
    └── No active matchers configured
```

## Providers (Context)
```
providers/
├── theme-provider.tsx
├── layout-provider.tsx 
├── background-provider.tsx
└── stream-client-provider.tsx
```

## Route Protection
```
Authentication
└── Handled by Clerk
    └── Implemented through ClerkProvider in root layout

Authorization
└── Basic checks in action handlers
    └── Example in actions/stream.actions.ts:
        └── "if (!user || !user?.id) throw new Error("Unauthorized.")"
```

## Notes
- The project uses Next.js App Router with route groups
- Authentication is implemented using Clerk
- The root middleware is currently disabled
- No custom middleware defined for specific routes
- Route protection appears to be handled through the Clerk authentication system
- Action handlers implement basic authorization checks 