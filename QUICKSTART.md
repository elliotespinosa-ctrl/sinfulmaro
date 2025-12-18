# Quick Start Guide

Get up and running with the GoPro Motion Detection Camera Tool in 5 minutes!

## Installation (2 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/elliotespinosa-ctrl/sinfulmaro.git
cd sinfulmaro

# 2. Install dependencies
pip install -r requirements.txt

# 3. Test your camera
python test_camera.py
```

## First Run (1 minute)

```bash
# Start the camera tool with default settings
python camera_tool.py
```

That's it! The tool will:
- ✓ Open your default camera
- ✓ Start detecting motion
- ✓ Automatically record when motion is detected
- ✓ Save videos to the `recordings/` folder

## Controls

While running:
- **Press 'q'** to quit
- **Press 's'** to take a snapshot
- **Press 'r'** to manually toggle recording

## What You'll See

Two windows will appear:
1. **Main window**: Shows live camera feed with:
   - Green boxes around moving objects
   - Motion status ("MOTION DETECTED" or "NO MOTION")
   - Recording indicator (red "REC" when recording)
   - Real-time statistics
   - Timestamp

2. **Motion Mask**: Shows the detected motion in white

## Customization (Optional)

Edit `config.json` to adjust:

```json
{
  "detection": {
    "motion_threshold": 0.5,  // Lower = more sensitive (0.1-5.0)
    "min_area": 500           // Minimum object size in pixels
  }
}
```

## Troubleshooting

### "Cannot open camera"
Try a different camera:
```bash
python camera_tool.py --camera 1
```

### Too sensitive / Not sensitive enough
Edit `config.json`:
- **Too sensitive**: Increase `motion_threshold` to 1.0 or higher
- **Not sensitive**: Decrease `motion_threshold` to 0.3 or lower

### Poor performance
Reduce resolution in `config.json`:
```json
{
  "width": 640,
  "height": 480,
  "fps": 15
}
```

## Output Files

Recordings are saved in the `recordings/` directory:
- `motion_20251218_143022.avi` - Motion-triggered videos
- `snapshot_20251218_143045.jpg` - Manual snapshots

## Next Steps

- Read [README.md](README.md) for detailed documentation
- Check [FEATURES.md](FEATURES.md) for full feature list
- Run unit tests: `python test_motion_detector.py`

## Need Help?

Common solutions:
1. Camera not working? Run `python test_camera.py`
2. No motion detected? Lower `motion_threshold` in config.json
3. Too many false positives? Increase `min_area` in config.json

## Example Use Cases

### Home Security
```bash
python camera_tool.py  # Just run and leave it
```

### Wildlife Camera
Edit config.json to be less sensitive:
```json
{"detection": {"motion_threshold": 2.0, "min_area": 1000}}
```

### Baby Monitor
Edit config.json for high sensitivity:
```json
{"detection": {"motion_threshold": 0.3, "min_area": 300}}
```

---

**That's all you need to get started!** 🎥📹

For more details, see the full [README.md](README.md).
