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
- Contact form with Resend integration
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

## Resend Integration Setup

The contact form uses Resend to save contacts and send notification emails. See [RESEND_SETUP.md](./RESEND_SETUP.md) for the full setup guide.

Create a `.env` file in the root directory with:

```
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=Breakaway <noreply@breakaway.work>
CONTACT_NOTIFICATION_EMAIL=general@breakaway.work
RESEND_SEGMENT_ID=your_segment_id_here
```

If deploying to Netlify, add the same environment variables in **Site settings > Environment variables**.

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
- [Resend](https://resend.com/docs) - Email delivery and contact management
