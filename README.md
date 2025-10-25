# George's Candle Shop 🕯️- E-commerce Freelancer Portfolio

 
Next.js 14 e-commerce platform for aromatic candles with Supabase backend, Stripe payments, and reusable React components.

## ✨ Features

- **Product Catalog**: Dynamic listing with Supabase PostgreSQL
- **Shopping Cart**: React Context API state management
- **Reusable Components**: `ProductCard` for scalable UI
- **Responsive Design**: Tailwind CSS mobile-first approach
- **Payments Ready**: Stripe, PayPal, COD, Transferencia interbancaria, integration for secure checkout
- **Authentication**: Supabase Auth for user accounts
- **TypeScript**: Full type safety throughout
- **SEO Optimized**: Next.js App Router with metadata
- **Responsive**: Diseño adaptable (móvil, tablet, desktop).
- **Código Límpio**: TypeScript sin errores, useCallback, escalable.

## 🛠️ Tech Stack

| Frontend | Backend | Tools | Deployment |
|----------|---------|-------|------------|
| Next.js 14 | Supabase | Tailwind CSS | Vercel |
| React 18 | PostgreSQL | TypeScript | GitHub Actions |
| TypeScript | Stripe | Paypal | ESLint | |
| Yarn (gestión de dependencias)

## 📸 Captures
![Home] (screenshots/home.png)
![Checkout](screenshots/checkout.png)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/gsempertegui/candle-shop.git
cd candle-shop

# Install dependencies
yarn install --ignore-engines

# Set up environment variables
NEXT_PUBLIC_SUPABASE_URL=https://puqhxmfzuuvzngytfsui.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your_SUPABASE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
# PayPal sandbox...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AaWJS0WsRSmCvyzyZrE1B1nyF-ba2-fKz8_KaLPs8f7tsOfEnipy_T9B5E1BAvJuQFRR3Lo2OG3ndDEh
# Edit .env.local with your Supabase/Stripe keys

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
candle-shop/
├── src/
│   ├── app/           # Next.js App Router (pages, layouts)
|   ├── api/           # Interface with external apps
|   |   └── checkout   # Generate pay orders
|   ├── cart           # Shopping cart
|   ├── checkout       # Payment proceedings
|   ├── lib/
|   │   ├── supabase.ts      # Supabase client & database utilities
|   │   └── payments.ts    # Payments definitions
|   ├── products       # List of products
|   ├── success        # Successful payment process 
│   ├── components/    # Page-specific React components
│   └── contexts/      # React Context providers (CartContext)
├── public/            # Static assets (images, icons)
│   └── images/        # Product images
├── .gitignore         # Excludes node_modules, .next, etc.
└── README.md          # You're reading it!
```

## 🌟 Key Components

### FormWrapper
Reusable form container with styling and validation:
```tsx
<FormWrapper title="Add to Cart">
  <input type="number" min="1" />
  <button>Add to Cart</button>
</FormWrapper>
```

### ProductCard
Dynamic product display with cart integration:
```tsx
<ProductCard product={candle} />
```

## 🔧 Environment Variables

Create `.env.local`:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 📱 Live Demo
[Deployed on Vercel](https://candle-shop-xyz.vercel.app)

## 💼 Freelancing Skills Demonstrated

- **Full-Stack Development**: Next.js + Supabase + Stripe
- **Modern React**: App Router, Server Components, Context API
- **Component Architecture**: Reusable, maintainable UI patterns
- **Database Integration**: PostgreSQL with Supabase client
- **Payment Processing**: Secure Stripe checkout implementation
- **Deployment**: Vercel CI/CD with environment management
- **TypeScript**: Type-safe code for enterprise reliability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📞 Contact

**Desarrollado por George Sempertegui** | 2025

## 💪Powered by Grok

[gsempertegui@gmail.com](mailto:gsempertegui@gmail.com)  
[LinkedIn](https://linkedin.com/in/gsempertegui) | [GitHub](https://github.com/gsempertegui)

Hire me for your next React/Next.js project! 🚀

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

