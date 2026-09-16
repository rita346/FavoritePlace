const GOOGLE_API_KEY = 'dummy-key';

export function getMapPreview(lat,lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7Clabel:G%7C${lat},${lng}&key=${GOOGLE_API_KEY}`

    return imagePreviewUrl;
}