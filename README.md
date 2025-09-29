<div align="center">

# Amirhossein Allami | Portfolio

![Version](https://img.shields.io/badge/version-2.0.0-white?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/amirallami-code/amirallami.com?style=flat-square&color=yellow)

<p align="center">
  <img src="https://amirallami.com/og-image.jpg" alt="Portfolio Preview" width="600">
</p>

**Modern • Performant • Type-Safe**

[Live Site](https://amirallami.com) · [Report Bug](https://github.com/amirallami-code/amirallami.com/issues) · [Request Feature](https://github.com/amirallami-code/amirallami.com/issues)

</div>

---

## Overview

A high-performance portfolio website built with Next.js 15, React 19, and TypeScript. Features interactive 3D visualizations, real-time GitHub integration, and optimized performance with SSR/SSG.

**Highlights:**
- Interactive code editor with syntax highlighting
- 3D GitHub globe powered by Three.js
- Dark/Light theme with system detection
- Real-time GitHub statistics
- WCAG accessibility compliant
- Lighthouse score 95+

---

## Tech Stack

**Core**
- Next.js 15.4.6 - React framework with App Router
- React 19.1.0 - UI library
- TypeScript 5 - Type safety
- Tailwind CSS 4 - Styling

**UI & Animation**
- Motion 12.23.12 - Animations
- Lottie React - JSON animations
- Three.js & React Three Fiber - 3D graphics
- shadcn/ui - Component library

**Tools**
- Sentry - Error tracking
- ESLint - Code quality
- Web Vitals - Performance monitoring

---

## Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/amirallami-code/amirallami.com.git
cd amirallami.com

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   └── animation/   # Animation components
├── data/            # Static configurations
├── hooks/           # Custom React hooks
├── lib/             # Utilities
└── types/           # TypeScript definitions
```

---

## Features

- **Interactive Hero** - Dynamic code editor with typing animations
- **3D GitHub Globe** - Real-time visualization with API integration
- **Theme System** - Smooth dark/light mode transitions
- **Certificate Showcase** - Auto-calculated timestamps and filtering
- **Tech Stack Display** - Interactive skill proficiency indicators
- **Performance** - SSR/SSG, lazy loading, optimized images

---

## Configuration

Create `.env.local` for environment variables:

```env
# Optional - for error tracking
SENTRY_DSN=your_sentry_dsn_here

# Optional - for bundle analysis
ANALYZE=true
```

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/amirallami-code/amirallami.com)

Push to `main` branch for automatic deployment.

### Other Platforms

Build command: `npm run build`  
Output directory: `.next`  
Node version: 20.x

---

## Performance

**Expected Metrics:**
- Lighthouse: 95+
- FCP: < 1.5s
- LCP: < 2.5s
- CLS: < 0.1

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

**Commit Convention:** Follow [Conventional Commits](https://www.conventionalcommits.org/)

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Contact

**Amirhossein Allami**

- Website: [amirallami.com](https://amirallami.com)
- Email: [amirallami.dev@gmail.com](mailto:amirallami.dev@gmail.com)
- GitHub: [@amirallami-code](https://github.com/amirallami-code)
- LinkedIn: [in/amirhosseinallami](https://www.linkedin.com/in/amirhosseinallami)

---

## Version History

- **v2.0.0** - Complete rebuild with Next.js 15, React 19, TypeScript
- **[v1.4.2](https://v1.amirallami.com)** - Legacy vanilla HTML/CSS/JS version

---

<div align="center">

Made with ❤️ by [Amirhossein Allami](https://github.com/amirallami-code)

</div>
