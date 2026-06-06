# Zenix Recovery

A premium athlete recovery tracking platform built with React, Vite, Supabase, and Tailwind CSS.

## Features

- **Authentication**: Secure login/signup with Supabase Auth
- **Dashboard**: Real-time recovery metrics and analytics
- **Recovery Logging**: Track sleep and muscle fatigue with modal interface
- **Analytics**: Visualize recovery trends with Chart.js
- **Recovery Score Engine**: Calculated scores based on sleep and fatigue metrics
- **Responsive Design**: Mobile-first with premium dark theme
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS with custom theme
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL with RLS
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **Charts**: Chart.js with react-chartjs-2
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: react-hot-toast

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

Run the SQL schema from `docs/schema.sql` in your Supabase SQL Editor to create the required tables and policies.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   ├── form/               # Reusable form components
│   ├── layout/             # Layout components (Sidebar, Header, etc.)
│   ├── ui/                 # UI components (Button, Card, Modal, etc.)
│   └── charts/             # Chart components
├── context/                # React Context (AuthContext)
├── hooks/                  # Custom React hooks
├── lib/                    # Library utilities (Supabase client, router)
├── pages/                  # Page components
├── services/               # API services
├── styles/                 # Global styles
├── utils/                  # Utility functions
└── design-system/          # Design tokens
```

## Recovery Score Calculation

The recovery score is calculated based on:

- **Sleep Quality (40% weight)**: Total sleep, deep sleep, and REM sleep metrics
- **Muscle Recovery (60% weight)**: Inverse of average muscle fatigue

Score ranges:
- 90-100: Excellent (emerald)
- 75-89: Good (cyan)
- 60-74: Moderate (yellow)
- 40-59: Poor (orange)
- 0-39: Critical (red)

## Performance Optimizations

- Code splitting with React.lazy
- React.memo for component memoization
- Lazy loading of route components
- Optimized re-renders
- Skeleton loading states

## Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatible
- Error boundaries for graceful degradation

## License

MIT
