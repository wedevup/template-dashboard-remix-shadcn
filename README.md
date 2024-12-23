# Modern Dashboard Template with Remix and shadcn/ui

A superior, opinionated dashboard template built with modern technologies and best practices. This template serves as a robust starting point for building production-ready applications with multiple authentication and backend integration options.

## 🌟 Features

- **Modern Stack**

  - [Remix.js](https://remix.run/) - Modern React framework with server-side rendering
  - [TypeScript](https://www.typescriptlang.org/) - Type safety and better developer experience
  - [shadcn/ui](https://ui.shadcn.com/) - High-quality, accessible components
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [Zustand](https://github.com/pmndrs/zustand) - State management
  - [React Query](https://tanstack.com/query/latest) - Data fetching and caching

- **Authentication Options**

  - JWT-based authentication (default)
  - OAuth providers (coming soon)
  - Firebase Authentication (coming soon)
  - Supabase Authentication (coming soon)
  - Magic Links (coming soon)

- **Backend Integration Options**

  - REST API (default)
  - Firebase (coming soon)
  - Supabase (coming soon)
  - Prisma + PostgreSQL (coming soon)

- **Developer Experience**
  - 🧪 Comprehensive test coverage (>80%)
  - 📝 Detailed documentation
  - 🎯 Type safety
  - 🔍 ESLint + Prettier
  - 🚀 Optimized production builds

## 📦 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/template-dashboard-remix-shadcn.git
   cd template-dashboard-remix-shadcn
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

## 🧪 Testing

We maintain high test coverage using Vitest and Testing Library:

```bash
# Run unit tests
npm run test:unit

# Run unit tests with coverage
npm run test:unit -- --coverage

# Run e2e tests
npm run test:e2e

# Run all tests
npm test
```

View test coverage report in the terminal or in `coverage/index.html`.

## 📚 Documentation

Detailed documentation is available in the `/docs` directory:

- [Project Overview & Requirements](/docs/project.md)
- [Development Backlog](/docs/backlog.md)
- [API Documentation](/docs/api.md)
- [Feature Specifications](/docs/features/)

## 🏗️ Project Structure

```
~/
├── app/
│   ├── components/     # React components
│   │   ├── ui/        # shadcn/ui components
│   │   ├── features/  # Feature-specific components
│   │   ├── layout/    # Layout components
│   │   └── auth/      # Auth components
│   ├── routes/        # Remix routes
│   ├── api/           # API integration
│   ├── stores/        # Zustand stores
│   └── styles/        # Global styles
├── docs/              # Documentation
├── public/            # Static assets
└── tests/            # Test files
    ├── e2e/          # End-to-end tests
    └── unit/         # Unit tests
```

## 🔒 Authentication

The template comes with JWT-based authentication by default. To switch to a different auth provider:

1. Check the `/docs/features/auth` directory for available providers
2. Follow the setup instructions for your chosen provider
3. Update the auth configuration in `app/config/auth.ts`

## 🎨 Customization

### Theme

1. Modify the theme in `app/styles/theme.ts`
2. Update Tailwind configuration in `tailwind.config.js`
3. Customize shadcn/ui components in `app/components/ui`

### Layout

1. Modify the root layout in `app/components/layout/root-layout.tsx`
2. Update navigation in `app/components/layout/navigation.tsx`
3. Customize the dashboard layout in `app/components/layout/dashboard-layout.tsx`

## 🚀 Deployment

The template is optimized for deployment on various platforms:

- Vercel (recommended)
- Netlify
- AWS
- Self-hosted

Follow the deployment guides in `/docs/deployment/` for platform-specific instructions.

## 📈 Roadmap

See our [Development Backlog](/docs/backlog.md) for planned features and improvements.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Remix](https://remix.run/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
