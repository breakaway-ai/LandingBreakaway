# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Breakaway Landing Page

This is the landing page for Breakaway, featuring AI agent ecosystems and software development services.

## Features

- Modern space-themed design
- Responsive layout
- Contact form with Mailchimp integration
- Serverless functions using Netlify Functions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/LandingBreakaway.git
cd LandingBreakaway
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Mailchimp Integration Setup

The contact form is integrated with Mailchimp to collect and manage leads. To set up the Mailchimp integration:

1. Create a Mailchimp account if you don't have one already
2. Get your API key from Mailchimp:
   - Go to Account > Extras > API keys
   - Create a new API key or use an existing one
3. Identify your server prefix (e.g., 'us1') from your Mailchimp URL
4. Create an audience list and get the List ID
5. Create a `.env` file in the root directory with the following variables:
```
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_SERVER_PREFIX=your_server_prefix_here
MAILCHIMP_LIST_ID=your_list_id_here
```

6. If deploying to Netlify, add these environment variables in the Netlify dashboard:
   - Go to Site settings > Build & deploy > Environment
   - Add the same variables as above

## Deployment

This site is configured to be deployed on Netlify:

1. Push your code to a GitHub repository
2. Connect the repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add the environment variables as described above

## Built With

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Styled Components](https://styled-components.com/) - Styling
- [Netlify Functions](https://www.netlify.com/products/functions/) - Serverless backend
- [Mailchimp Marketing API](https://mailchimp.com/developer/marketing/api/) - Email marketing
