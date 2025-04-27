# Modern Portfolio Resume

A React-based portfolio resume site built with TypeScript and Tailwind CSS, based on the design from [Figma Community](https://www.figma.com/community/file/882879599442878081).

## Features

- Clean, modern UI design
- Fully responsive for all device sizes
- Component-based architecture for easy maintenance
- Built with TypeScript for type safety
- Styled with Tailwind CSS for rapid development
- React Router for seamless navigation

## Pages

- **Home** - Introduction with profile picture, featured works, and recent blog posts
- **Blog** - List of blog posts with a detail view for each post
- **Works** - Portfolio of projects with a detail view for each project
- **Contact** - Contact form for reaching out

## Components

- `Header` - Navigation header with responsive mobile menu
- `HeroSection` - Main introduction section with profile picture
- `RecentPosts` - Display of recent blog posts
- `BlogPost` - Individual blog post card
- `FeaturedWorks` - Display of featured works/projects
- `WorkItem` - Individual work/project card
- `Skills` - Skills section with filtering by category
- `Contact` - Contact form with form handling
- `Footer` - Footer with social links

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/portfolio-resume.git
   cd portfolio-resume
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Build for production:
   ```
   npm run build
   ```

## Customization

To customize the portfolio with your own information:

1. Replace the sample data in each component with your personal information
2. Add your own images to the public folder
3. Update the color scheme in `tailwind.config.js` if desired
4. Modify component styles to match your preferences

## Dependencies

- React
- React Router DOM
- TypeScript
- Tailwind CSS
- @tailwindcss/typography

## Credits

- Design inspired by [Portfolio for Figma](https://www.figma.com/community/file/882879599442878081) by TemplatesJungle
- Icons from Tailwind Icons

## License

MIT License