# BazarDor — Bangladesh Price Tracker

BazarDor is a web application designed to help people in Bangladesh explore product prices, compare market prices, and stay informed about price changes. It provides a simple interface for browsing products, viewing price trends, and managing a user profile.

## Features

- **Home Page:** Browse featured products and explore market price information.
- **Price Tracker:** View product prices and identify price increases and decreases.
- **Product Details:** Explore individual products and their available market price information.
- **Category Browsing:** Browse products by category and sort them by price.
- **User Authentication:** Sign up and sign in to access account features.
- **Profile Management:** View and update profile information.
- **Responsive Design:** Access the application on desktop, tablet, and mobile devices.
- **API Integration:** Retrieve product and market data from the configured API.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Better Auth
- SQLite
- REST API

## Project Structure

```text
bazardor_website/
├── public/                 # Static assets and images
├── src/
│   ├── app/                # Pages, layouts and API routes
│   │   ├── api/            # API endpoints
│   │   ├── category/       # Category pages
│   │   ├── product/        # Product detail pages
│   │   ├── profile/        # User profile page
│   │   ├── signin/         # Sign-in page
│   │   ├── signup/         # Sign-up page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable UI components
│   ├── lib/                # API, authentication and utilities
│   └── middleware.ts       # Route protection, if configured
├── .env.example            # Example environment variables
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) — preferably the version supported by the project
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/shaswatimallik89-ux/bazardor_website.git
cd bazardor_website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

If `.env.example` exists, create a local environment file by copying it.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` and fill in the required values. These may include the database configuration, authentication secret, application URL, API settings, and OAuth credentials, depending on the project implementation.

**Important:** Never commit `.env.local` or publish real passwords, API keys, authentication secrets, or OAuth credentials.

### 4. Set Up the Database

If the application uses SQLite through Better Auth, follow the database setup instructions implemented in the project. Make sure the database directory exists and that any required database initialization or migration steps have been completed.

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

If port 3000 is already occupied, Next.js may start on another available port and display the URL in the terminal.

### 6. Build for Production

```bash
npm run build
```

To start the production server after a successful build:

```bash
npm run start
```

## Authentication and OAuth

BazarDor uses Better Auth for user authentication.

To enable OAuth sign-in, configure the relevant provider credentials and callback URLs according to the authentication configuration. Add credentials only to your local environment or your deployment platform's environment-variable settings.

Refer to the source configuration and `.env.example` for the exact variable names and setup requirements.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run start` | Run the production application |
| `npm run lint` | Run lint checks, if configured |

Check `package.json` for the exact scripts available in your version of the project.

## Deployment

The application can be deployed to a platform that supports Next.js, such as Vercel, after configuring its environment variables and production database requirements.

Before deployment:

1. Verify that the application builds successfully.
2. Configure all required environment variables.
3. Configure authentication callback URLs for the production domain.
4. Ensure the database is stored in a persistent location supported by the hosting platform.
5. Test sign-in, sign-up, profile updates, product pages, and category pages.

## Security

- Keep `.env.local` and all real credentials out of Git.
- Use secure, unique authentication secrets.
- Validate user input on the server.
- Protect private routes and account operations.
- Use a database and hosting setup appropriate for production.

## Project Status

BazarDor is a web development project focused on making product price information easier to explore and understand in Bangladesh.

## Author

**Shaswati Mallik**

GitHub: [shaswatimallik89-ux](https://github.com/shaswatimallik89-ux)

## License

No license has been specified yet. All rights are reserved unless a license is added to this repository.