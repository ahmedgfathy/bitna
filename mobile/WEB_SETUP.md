# Contaboo Web Setup

## Browser Title & Favicon

The web version of Contaboo now has:

✅ **Custom Browser Title**: "Contaboo - Find Your Dream Property"
✅ **Custom Favicon**: Blue "C" logo 
✅ **Meta Tags**: SEO-optimized with Open Graph and Twitter Card support
✅ **Theme Color**: #1877f2 (Facebook blue)
✅ **Loading Screen**: Custom loading animation with Contaboo branding

## Files Modified

1. **app.json** - Added web configuration with name, description, and theme color
2. **App.tsx** - Added dynamic document title and favicon setup for web
3. **web/index.html** - Custom HTML template with:
   - Proper meta tags for SEO
   - Social media sharing tags (Open Graph, Twitter)
   - Custom loading screen with Contaboo logo
   - Favicon links
   - Theme color configuration

## Testing

To test the web version:

```bash
cd mobile
npx expo start --web
```

The browser tab should now show:
- Title: "Contaboo - Find Your Dream Property"
- Favicon: Blue circle with "C" logo
- Loading screen: Custom Contaboo branding

## Production Build

For production web build:

```bash
npx expo export:web
```

This will generate a static website in the `web-build` folder with all the custom branding applied.
