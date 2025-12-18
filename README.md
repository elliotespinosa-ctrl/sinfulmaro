# Sinfulmaro - GoPro Motion Detection Camera Tool

A powerful Python-based motion detection camera system inspired by GoPro cameras, featuring advanced motion detection, automatic recording, and real-time video analysis.

## Features

- **Advanced Motion Detection**: Uses OpenCV's MOG2 background subtraction algorithm for detailed motion analysis
- **Automatic Recording**: Starts recording when motion is detected and stops after a configurable delay
- **Real-time Display**: Live preview with motion overlay, bounding boxes, and statistics
- **Configurable Settings**: JSON-based configuration for camera, detection, and recording parameters
- **High-Quality Output**: Records video at up to 1080p with customizable codecs
- **Detailed Statistics**: Shows motion percentage, object count, and timestamps
- **Manual Controls**: Take snapshots and manually control recording

## Installation

### Prerequisites

- Python 3.7 or higher
- A webcam or USB camera connected to your system

### Setup

1. Clone this repository:
```bash
git clone https://github.com/elliotespinosa-ctrl/sinfulmaro.git
cd sinfulmaro
```

2. Install required dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage

Run the camera tool with default settings:
```bash
python camera_tool.py
```

### With Custom Configuration

Create or modify `config.json` and run:
```bash
python camera_tool.py --config my_config.json
```

### Select Different Camera

If you have multiple cameras:
```bash
python camera_tool.py --camera 1
```

### Keyboard Controls

While the camera tool is running:
- **q** - Quit the application
- **s** - Take a snapshot
- **r** - Manually toggle recording on/off

## Configuration

Edit `config.json` to customize the camera tool behavior:

### Camera Settings
```json
{
  "camera_id": 0,        // Camera device ID (0 is usually default webcam)
  "width": 1280,         // Video width in pixels
  "height": 720,         // Video height in pixels
  "fps": 30,             // Frames per second
  "output_dir": "recordings"  // Directory to save recordings
}
```

### Motion Detection Settings
```json
{
  "detection": {
    "history": 500,           // Number of frames for background learning
    "var_threshold": 16,      // Variance threshold for background subtraction
    "min_area": 500,          // Minimum contour area to consider as motion
    "motion_threshold": 0.5   // Motion percentage threshold to trigger recording
  }
}
```

### Recording Settings
```json
{
  "recording": {
    "pre_motion_buffer": 5,    // Frames to save before motion detected
    "post_motion_buffer": 30,  // Frames to continue recording after motion stops
    "codec": "mp4v"            // Video codec (mp4v, XVID, MJPG, etc.)
  }
}
```

### Display Settings
```json
{
  "display": {
    "show_preview": true,        // Show live preview window
    "show_motion_overlay": true, // Draw motion detection overlays
    "show_stats": true           // Display statistics on screen
  }
}
```

## Motion Detection Details

The tool uses advanced computer vision techniques:

1. **Background Subtraction**: MOG2 algorithm learns the background and identifies moving objects
2. **Shadow Removal**: Automatically detects and removes shadows to reduce false positives
3. **Morphological Operations**: Cleans up noise and improves contour detection
4. **Contour Analysis**: Identifies and tracks individual moving objects
5. **Motion Percentage**: Calculates the percentage of frame containing motion
6. **Smart Recording**: Only records when significant motion is detected

## Output

### Video Files
Recorded videos are saved in the configured output directory with timestamps:
- Format: `motion_YYYYMMDD_HHMMSS.avi`
- Example: `recordings/motion_20251218_143022.avi`

### Snapshots
Manual snapshots are saved with timestamps:
- Format: `snapshot_YYYYMMDD_HHMMSS.jpg`
- Example: `recordings/snapshot_20251218_143045.jpg`

## Troubleshooting

### Camera Not Found
```
RuntimeError: Cannot open camera 0
```
**Solution**: Try a different camera ID (1, 2, etc.) or check camera connections

### Poor Motion Detection
**Solution**: Adjust these settings in `config.json`:
- Increase `min_area` to ignore small movements
- Adjust `motion_threshold` for sensitivity
- Modify `var_threshold` for background subtraction sensitivity

### High CPU Usage
**Solution**: 
- Reduce resolution (`width` and `height`)
- Lower `fps` value
- Disable preview: set `show_preview` to `false`

## Technical Architecture

```
camera_tool.py
├── GoProCamera (Main application)
│   ├── initialize_camera() - Sets up camera with config
│   ├── run() - Main event loop
│   └── draw_overlay() - Renders UI elements
│
└── MotionDetector (Detection engine)
    └── detect() - Analyzes frames for motion
```

## Requirements

- Python 3.7+
- OpenCV (opencv-python) >= 4.8.0
- NumPy >= 1.24.0

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Created for the Sinfulmaro project.

## Acknowledgments

- OpenCV library for computer vision capabilities
- MOG2 algorithm for background subtraction