src
│
├── app
│   │
│   ├── _layout.tsx
│   ├── +not-found.tsx
│   │
│   ├── (auth)
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   │
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── index.tsx              // Forum
│   │   ├── marketplace.tsx
│   │   ├── messages.tsx
│   │   ├── notifications.tsx
│   │   └── profile.tsx
│   │
│   ├── (protected)
│   │   ├── _layout.tsx
│   │   │
│   │   ├── seller
│   │   │   └── [id].tsx
│   │   │
│   │   ├── listing
│   │   │   └── [id].tsx
│   │   │
│   │   ├── question
│   │   │   └── [id].tsx
│   │   │
│   │   ├── conversation
│   │   │   └── [id].tsx
│   │   │
│   │   ├── edit-profile.tsx
│   │   ├── create-listing.tsx
│   │   ├── create-question.tsx
│   │   ├── my-listings.tsx
│   │   ├── my-questions.tsx
│   │   ├── saved.tsx
│   │   └── settings.tsx
│   │
│   └── (admin)
│       ├── _layout.tsx
│       ├── dashboard.tsx
│       ├── users.tsx
│       ├── listings.tsx
│       ├── forum.tsx
│       ├── reports.tsx
│       └── cms.tsx
│
├── components
│   ├── forum
│   ├── marketplace
│   ├── chat
│   ├── profile
│   ├── common
│   └── ui
│
├── hooks
│   ├── useForum.ts
│   ├── useForumFilters.ts
│   ├── useSponsoredAds.ts
│   ├── useMarketplace.ts
│   ├── useChat.ts
│   └── useProfile.ts
│
├── store
│   ├── forum.store.ts
│   ├── marketplace.store.ts
│   ├── auth.store.ts
│   ├── chat.store.ts
│   ├── notification.store.ts
│   └── settings.store.ts
│
├── services
│   ├── api.ts
│   ├── forum.service.ts
│   ├── marketplace.service.ts
│   ├── chat.service.ts
│   ├── upload.service.ts
│   └── auth.service.ts
│
├── types
│   ├── forum.types.ts
│   ├── marketplace.types.ts
│   ├── chat.types.ts
│   ├── user.types.ts
│   └── api.types.ts
│
├── constants
│   ├── forum.ts
│   ├── marketplace.ts
│   ├── colors.ts
│   ├── routes.ts
│   └── config.ts
│
├── utils
│   ├── forum.ts
│   ├── marketplace.ts
│   ├── date.ts
│   ├── format.ts
│   ├── validation.ts
│   └── storage.ts
│
├── providers
│   ├── AuthProvider.tsx
│   ├── ThemeProvider.tsx
│   ├── QueryProvider.tsx
│   └── NotificationProvider.tsx
│
├── lib
├── assets
├── theme
└── global.css