#!/usr/bin/env python3
"""
Test script to verify camera availability and basic functionality.
"""

import cv2
import sys


def test_camera(camera_id=0):
    """Test if camera is accessible and working."""
    print(f"Testing camera {camera_id}...")
    
    cap = cv2.VideoCapture(camera_id)
    
    if not cap.isOpened():
        print(f"✗ Camera {camera_id} could not be opened")
        return False
    
    print(f"✓ Camera {camera_id} opened successfully")
    
    # Get camera properties
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    
    print(f"  Resolution: {width}x{height}")
    print(f"  FPS: {fps}")
    
    # Try to read a frame
    ret, frame = cap.read()
    
    if not ret or frame is None:
        print("✗ Could not read frame from camera")
        cap.release()
        return False
    
    print(f"✓ Successfully captured frame: {frame.shape}")
    
    cap.release()
    return True


def find_available_cameras(max_cameras=5):
    """Find all available cameras."""
    print("\nScanning for available cameras...\n")
    available = []
    
    for i in range(max_cameras):
        cap = cv2.VideoCapture(i)
        if cap.isOpened():
            available.append(i)
            ret, _ = cap.read()
            status = "✓ Working" if ret else "✗ Not responding"
            print(f"Camera {i}: {status}")
            cap.release()
    
    if not available:
        print("No cameras found!")
    else:
        print(f"\nFound {len(available)} camera(s): {available}")
    
    return available


def main():
    """Main test function."""
    print("=" * 50)
    print("Camera Tool Test Script")
    print("=" * 50)
    
    # Check OpenCV version
    print(f"\nOpenCV version: {cv2.__version__}")
    
    # Find available cameras
    cameras = find_available_cameras()
    
    if cameras:
        print("\n" + "=" * 50)
        print("Testing primary camera (Camera 0)...")
        print("=" * 50 + "\n")
        
        if test_camera(0):
            print("\n✓ Camera test passed!")
            print("\nYou can now run the motion detection tool:")
            print("  python camera_tool.py")
        else:
            print("\n✗ Camera test failed")
            if len(cameras) > 1:
                print(f"\nTry using camera {cameras[1]}:")
                print(f"  python camera_tool.py --camera {cameras[1]}")
    else:
        print("\n✗ No cameras detected")
        print("\nTroubleshooting:")
        print("  1. Make sure your camera is connected")
        print("  2. Check camera permissions")
        print("  3. Try closing other applications using the camera")
    
    return 0 if cameras else 1


if __name__ == '__main__':
    sys.exit(main())
