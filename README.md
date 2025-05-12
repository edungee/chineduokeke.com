# Chinedu Okeke - Personal Portfolio Website

A modern, performant personal portfolio website built with Next.js 13 App Router and Tailwind CSS. This website showcases my professional journey, projects, and speaking engagements in the tech industry.

## 🌟 Features

- **Modern Tech Stack**: Built with Next.js 13 App Router, React, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Dark Mode**: Built-in dark mode support with system preference detection
- **Performance Optimized**: Static site generation for optimal performance
- **SEO Friendly**: Built-in metadata and SEO optimizations
- **Project Showcase**: Detailed project pages with video demos and design images
- **Speaking Engagements**: Dedicated section for conference talks and webinars
- **Content Management**: Markdown-based content management for easy updates

## 🛠️ Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Content**: Markdown with [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Deployment**: [Vercel](https://vercel.com)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/edungee/chineduokeke.com.git
   cd chineduokeke.com
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/                 # Next.js 13 app directory
│   ├── projects/       # Project pages
│   ├── speaking/       # Speaking engagements
│   └── layout.tsx      # Root layout
├── components/         # React components
├── content/           # Markdown content
│   ├── projects/      # Project markdown files
│   └── speaking/      # Speaking engagement markdown files
├── lib/               # Utility functions
└── public/            # Static assets
```

## 📝 Content Management

- Projects are managed through markdown files in `content/projects/`
- Speaking engagements are managed through markdown files in `content/speaking/`
- Each markdown file includes frontmatter for metadata and content

## 🎨 Customization

- Theme colors can be modified in `tailwind.config.js`
- Global styles are in `app/globals.css`
- Components can be customized in the `components/` directory

## 📱 Responsive Design

The website is built with a mobile-first approach using Tailwind's built-in breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔄 Development Workflow

1. Create a new branch for features/fixes
2. Make your changes
3. Test locally
4. Create a pull request
5. Deploy to Vercel for preview

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Chinedu Okeke**
- Website: [chineduokeke.com](https://chineduokeke.com)
- LinkedIn: [Chinedu Okeke](https://www.linkedin.com/in/chinedu-okeke/)
- Twitter: [@edunge](https://twitter.com/edunge)
- GitHub: [@edungee](https://github.com/edungee)

## 🙏 Acknowledgments

- Built with [Cursor](https://cursor.sh/) - An AI-first code editor
- Inspired by modern web design practices
- Thanks to the open-source community for amazing tools and libraries
