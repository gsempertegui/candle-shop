# George's Candle Shop 🕯️

Next.js 14 e-commerce platform for aromatic candles with Supabase backend, Stripe payments, and reusable React components.

[![Vercel Deployment](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gsempertegui/candle-shop)

## ✨ Features

- **Product Catalog**: Dynamic listing with Supabase PostgreSQL
- **Shopping Cart**: React Context API state management
- **Reusable Components**: `FormWrapper`, `ProductCard` for scalable UI
- **Responsive Design**: Tailwind CSS mobile-first approach
- **Payments Ready**: Stripe integration for secure checkout
- **Authentication**: Supabase Auth for user accounts
- **TypeScript**: Full type safety throughout
- **SEO Optimized**: Next.js App Router with metadata

## 🛠️ Tech Stack

| Frontend | Backend | Tools | Deployment |
|----------|---------|-------|------------|
| Next.js 14 | Supabase | Tailwind CSS | Vercel |
| React 18 | PostgreSQL | TypeScript | GitHub Actions |
| TypeScript | Stripe | ESLint | |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/gsempertegui/candle-shop.git 
cd candle-shop

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase/Stripe keys

# Run development server
npm run dev

Open http://localhost:3000 to view the app.

📁 Project Structure
candle-shop/
├── lib/
│   ├── reusables/     # Reusable components (FormWrapper, ProductCard)
│   └── supabase/      # Supabase client & database utilities
├── src/
│   ├── app/           # Next.js App Router (pages, layouts)
│   ├── components/    # Page-specific React components
│   └── contexts/      # React Context providers (CartContext)
├── public/            # Static assets (images, icons)
├── .gitignore         # Excludes node_modules, .next, etc.
└── README.md          # You're reading it!

🌟 Key Components


FormWrapper
Reusable form container with styling and validation:

<FormWrapper title="Add to Cart">
  <input type="number" min="1" />
  <button>Add to Cart</button>
</FormWrapper>

ProductCard
Dynamic product display with cart integration:

<ProductCard product={candle} />

🔧 Environment Variables
Create .env.local

SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...


📱 Live Demo
Deployed on Vercel

💼 Freelancing Skills Demonstrated

Full-Stack Development: Next.js + Supabase + Stripe
Modern React: App Router, Server Components, Context API
Component Architecture: Reusable, maintainable UI patterns
Database Integration: PostgreSQL with Supabase client
Payment Processing: Secure Stripe checkout implementation
Deployment: Vercel CI/CD with environment management
TypeScript: Type-safe code for enterprise reliability

🤝 Contributing

Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Commit changes: git commit -m 'Add amazing feature'
Push to branch: git push origin feature/amazing-feature
Open Pull Request

📞 Contact
George Sempertegui
gsempertegui@gmail.com
LinkedIn | GitHub
Hire me for your next React/Next.js project! 🚀
📄 License
This project is open source and available under the MIT License.



