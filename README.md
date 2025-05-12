# TDP Showcase

A website for showcasing our latest technology projects and demos.

## Overview

This website provides a showcase of our technology projects and innovations with direct links to MediaExchange for video content.

## Setup

This showcase uses thumbnail images with direct links to MediaExchange content:

1. Place your thumbnail images in the `thumbnails/` directory with descriptive names.

2. Update the `videoData` array in `script.js` to include your projects:

```javascript
{
    title: "Your Project Title",
    type: "external",
    external_url: "https://mediaexchange.accenture.com/media/t/YOUR_VIDEO_ID",
    thumbnail: "thumbnails/your_thumbnail.jpg",
    description: "Brief description of your project",
    release: "Q1 2023"
}
```

## Customization

- To add more projects, add entries to the `videoData` array in `script.js`
- Modify the styling in `styles.css` to match your preferred look and feel
- Update the header text in `index.html` to reflect your specific showcase purpose