# Photography Portfolio Website

A beautiful, warm, and cinematic photography portfolio website designed for showcasing your photography work.

## Features

- **About Section**: Personal introduction and photography philosophy
- **Gear Section**: Showcase of photography equipment with images
- **Interactive Gallery**: Click on any photo to view it in a beautiful modal with:
  - Aesthetic quotation
  - Location and date information
  - Storytelling description
- **Responsive Design**: Works beautifully on all devices
- **Smooth Animations**: Elegant transitions and scroll effects
- **Instagram Integration**: Instagram handle displayed in hero and footer

## Setup Instructions

### 1. Add Your Photos

1. Create an `images` folder in the root directory
2. Add your photos to the `images` folder
3. Name them as: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.

### 2. Update Photo Information

Edit the `script.js` file and update the `photoData` object with your actual photo information:

```javascript
const photoData = {
    1: {
        image: 'images/photo1.jpg',
        quote: 'Your quotation here',
        location: 'Actual location',
        date: 'Actual date',
        story: 'Your story about this photo'
    },
    // ... add more photos
};
```

### 3. Update Instagram Handle

Replace `your_handle` in `index.html` with your actual Instagram handle:
- Search for `@your_handle` and replace all instances
- Update the Instagram link URL: `https://instagram.com/your_handle`

### 4. Customize Content

- Update the About section text in `index.html`
- Modify the gear descriptions if needed
- Adjust colors in `styles.css` if desired (see CSS variables in `:root`)

### 5. Add More Gallery Items

To add more photos to the gallery:

1. Add a new `<div class="gallery-item">` in the gallery section of `index.html`
2. Add corresponding data in the `photoData` object in `script.js`
3. Make sure the `data-photo-id` matches the key in `photoData`

## GitHub Pages Deployment

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select the branch (usually `main` or `master`)
4. Select the folder (usually `/root`)
5. Click Save
6. Your site will be available at `https://yourusername.github.io/repository-name`

## File Structure

```
Photography_Portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── images/             # Your photos folder (create this)
    ├── photo1.jpg
    ├── photo2.jpg
    └── ...
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The gear images are loaded from Nikon's official website. If these links break, you can download the images and host them locally.
- All fonts are loaded from Google Fonts (Playfair Display, Cormorant Garamond, Montserrat)
- The website uses vanilla JavaScript (no frameworks required)

Enjoy showcasing your photography! 📸

