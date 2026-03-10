# How to Add Background Video

The hero section now supports local video files. Here's how to add your video:

## Option 1: Local Video File (Recommended)

1. **Prepare your video:**
   - Format: MP4 (H.264 codec)
   - Recommended resolution: 1920x1080 or 1280x720
   - Keep file size under 10MB for fast loading (compress if needed)
   - Duration: 10-30 seconds loop works best

2. **Add the video:**
   - Place your video file in the `/public` folder
   - Name it `hero-video.mp4`
   - That's it! The video will automatically load

3. **Using a different filename:**
   - If your video has a different name (e.g., `background.mp4`)
   - Update line 8 in `src/components/sections/hero.tsx`:
   ```tsx
   <source src="/background.mp4" type="video/mp4" />
   ```

## Option 2: YouTube Video

If you prefer to use YouTube instead:

1. Get your YouTube video ID from the URL:
   - `https://youtu.be/okQhxiQiozM` → ID is `okQhxiQiozM`
   - `https://www.youtube.com/watch?v=okQhxiQiozM` → ID is `okQhxiQiozM`

2. Replace the `<video>` element in `src/components/sections/hero.tsx` with:

```tsx
<div className="absolute inset-0 scale-[1.3]">
  <iframe
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3"
    className="w-full h-full pointer-events-none"
    allow="autoplay; encrypted-media"
    allowFullScreen
    style={{ border: 'none' }}
    title="ApeD'or Tour"
  />
</div>
```

Replace `YOUR_VIDEO_ID` with your actual video ID (in both places).

## Tips

- **Local video loads faster** and works on all devices
- YouTube videos may have playback restrictions on mobile
- For best quality, export video at 30fps with constant bitrate
- Use tools like [HandBrake](https://handbrake.fr/) to compress large videos

## Video Compression Tools

- **Online:** [Clideo](https://clideo.com/compress-video), [FreeConvert](https://www.freeconvert.com/video-compressor)
- **Desktop:** HandBrake (free), Adobe Media Encoder
- **Command line:** ffmpeg
  ```bash
  ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset medium output.mp4
  ```
