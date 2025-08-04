# OLA - Premium Server & Cloud Services Website

A modern, responsive single-page website for OLA hosting company, featuring bilingual support (English/Arabic) and optimized for Vercel deployment.

## Features

- **Bilingual Support**: English (primary) and Arabic (secondary) with RTL support
- **Responsive Design**: Works perfectly on all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Single Page Application**: Everything in one page for easy hosting
- **Performance Optimized**: Fast loading and smooth interactions
- **Contact Form**: Functional contact form with validation
- **Services Showcase**: Dedicated servers, cloud hosting, and security services
- **Pricing Plans**: Clear pricing structure with featured plans
- **Interactive Elements**: Hover effects, animations, and smooth scrolling

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter)

## File Structure

```
new_web/
├── index.html          # Main HTML file
├── style.css           # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Language Support

The website supports dynamic language switching between:
- **English (EN)**: Primary language, LTR direction
- **Arabic (عر)**: Secondary language, RTL direction

Language switching is handled via JavaScript and changes:
- Text content
- Form placeholders
- HTML direction (LTR/RTL)
- Layout adjustments for Arabic

## Sections

1. **Header/Navigation**: Fixed header with language switcher
2. **Hero Section**: Main banner with company introduction
3. **Services**: Three main services with detailed descriptions
4. **Features**: Key selling points
5. **Pricing**: Three pricing tiers
6. **About**: Company information and statistics
7. **Contact**: Contact form and company details
8. **Footer**: Links and social media

## Deployment on Vercel

### Option 1: GitHub Integration (Recommended)

1. **Upload to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/ola-hosting.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Deploy

### Option 2: Direct Upload

1. **Prepare files**: Ensure all files are in the root directory
2. **Upload to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Drag and drop your folder
   - Deploy

### Option 3: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

## Custom Domain Setup

After deployment on Vercel:

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Features

- Optimized images and icons
- Minimal external dependencies
- Efficient CSS and JavaScript
- Smooth animations with hardware acceleration
- Mobile-first responsive design

## Customization

### Colors
Main brand colors are defined in CSS variables:
- Primary: #2563eb (Blue)
- Secondary: #6b7280 (Gray)
- Success: #10b981 (Green)
- Error: #ef4444 (Red)

### Content
All text content supports bilingual attributes:
- `data-en="English text"`
- `data-ar="Arabic text"`

### Contact Information
Update contact details in the contact section:
- Email addresses
- Phone numbers
- Physical address

## SEO Features

- Semantic HTML structure
- Meta descriptions and titles
- Proper heading hierarchy
- Alt text for images
- Schema markup ready

## Security Features

- Form validation
- XSS protection
- Input sanitization
- Secure contact form handling

## Support

For technical support or customization requests, contact the development team.

## License

This project is proprietary to OLA Company. All rights reserved.

---

**Note**: This website is designed specifically for reseller approval and business presentation. All contact forms and interactions are for demonstration purposes and should be connected to actual backend services for production use.
"# aziz2026" 
