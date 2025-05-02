# Modern Portfolio Resume

A clean, elegant portfolio-style resume showcasing my skills, projects and experience.


## Features

- Clean, minimalist design with elegant UI elements
- Interactive skills section with filtering by category
- Timeline-based experience display
- Project cards with visual representation
- Mobile responsive layout
- Print-friendly styling

## Technologies Used

- HTML5
- CSS3
- JavaScript (with jQuery)
- FontAwesome icons
- Google Fonts (Inter)

## How to View

You can view the resume in several ways:

1. **Direct in Browser**: Simply open the `index.html` file in any modern web browser.
2. **GitHub Pages**: This resume is also published via GitHub Pages at [https://yourusername.github.io/portfolio-resume](https://yourusername.github.io/portfolio-resume).
3. **Local Server**: For the best experience, run it on a local server:
    - Using Python: `python -m http.server` (Python 3) or `python -m SimpleHTTPServer` (Python 2)
    - Using Node.js: `npx serve`

## Project Structure

```
portfolio-resume/
├── index.html         # Main HTML file
├── styles.css         # CSS styles
├── scripts.js         # JavaScript for interactivity
├── README.md          # This file
└── preview.jpg        # Preview image for README
```

## Customization

The resume is designed to be easily customizable:

### Colors

The color scheme can be customized by modifying the CSS variables at the top of the `styles.css` file:

```css
:root {
    --primary: #4F46E5;      /* Main color */
    --primary-light: #6366F1; /* Lighter shade */
    --primary-dark: #4338CA;  /* Darker shade */
    /* Other color variables */
}
```

### Content

All content can be edited directly in the `index.html` file:

1. Personal information in the header section
2. About Me content
3. Experience items
4. Projects
5. Skills

## Adding a Profile Photo

To add a profile photo, replace the placeholder div:

```html
<div class="profile-image-placeholder">AS</div>
```

With an image tag:

```html
<img src="your-photo.jpg" alt="Ayaan Syed" class="profile-image">
```

## Printing

The resume includes print-friendly styles. To print:
1. Open the page in a browser
2. Press Ctrl+P (or Cmd+P on Mac)
3. Change settings as needed and print/save as PDF

## License

Feel free to use this template for your own personal resume.

## Credits

- Font Awesome for icons
- Google Fonts (Inter) for typography