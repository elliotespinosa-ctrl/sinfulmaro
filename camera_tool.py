#!/usr/bin/env python3
"""
GoPro-Style Motion Detection Camera Tool
A detailed motion detection system that captures and records video when motion is detected.
"""

import cv2
import numpy as np
import argparse
import datetime
import os
import json
from pathlib import Path


class MotionDetector:
    """Advanced motion detection with detailed analysis."""
    
    def __init__(self, config):
        self.config = config
        self.background_subtractor = cv2.createBackgroundSubtractorMOG2(
            history=config.get('history', 500),
            varThreshold=config.get('var_threshold', 16),
            detectShadows=True
        )
        self.min_area = config.get('min_area', 500)
        self.motion_threshold = config.get('motion_threshold', 25)
        self.kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        
    def detect(self, frame):
        """
        Detect motion in the frame with detailed analysis.
        
        Returns:
            tuple: (motion_detected, motion_percentage, contours, processed_frame)
        """
        # Apply background subtraction
        fg_mask = self.background_subtractor.apply(frame)
        
        # Remove shadows (shown as gray in MOG2)
        _, fg_mask = cv2.threshold(fg_mask, 244, 255, cv2.THRESH_BINARY)
        
        # Apply morphological operations to remove noise
        fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_OPEN, self.kernel)
        fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, self.kernel)
        
        # Find contours
        contours, _ = cv2.findContours(fg_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Filter contours by area
        significant_contours = [c for c in contours if cv2.contourArea(c) > self.min_area]
        
        # Calculate motion percentage
        motion_pixels = cv2.countNonZero(fg_mask)
        total_pixels = fg_mask.shape[0] * fg_mask.shape[1]
        motion_percentage = (motion_pixels / total_pixels) * 100
        
        motion_detected = motion_percentage > self.motion_threshold and len(significant_contours) > 0
        
        return motion_detected, motion_percentage, significant_contours, fg_mask


class GoProCamera:
    """Main camera application with GoPro-style motion detection."""
    
    def __init__(self, config_path='config.json'):
        self.config = self.load_config(config_path)
        self.cap = None
        self.detector = None
        self.recording = False
        self.video_writer = None
        self.output_dir = Path(self.config.get('output_dir', 'recordings'))
        self.output_dir.mkdir(exist_ok=True)
        
    def load_config(self, config_path):
        """Load configuration from JSON file."""
        default_config = {
            'camera_id': 0,
            'width': 1280,
            'height': 720,
            'fps': 30,
            'output_dir': 'recordings',
            'detection': {
                'history': 500,
                'var_threshold': 16,
                'min_area': 500,
                'motion_threshold': 0.5
            },
            'recording': {
                'pre_motion_buffer': 5,
                'post_motion_buffer': 30,
                'codec': 'mp4v'
            },
            'display': {
                'show_preview': True,
                'show_motion_overlay': True,
                'show_stats': True
            }
        }
        
        if os.path.exists(config_path):
            try:
                with open(config_path, 'r') as f:
                    user_config = json.load(f)
                default_config.update(user_config)
            except Exception as e:
                print(f"Error loading config: {e}. Using defaults.")
        
        return default_config
    
    def initialize_camera(self):
        """Initialize camera with configured settings."""
        camera_id = self.config.get('camera_id', 0)
        self.cap = cv2.VideoCapture(camera_id)
        
        if not self.cap.isOpened():
            raise RuntimeError(f"Cannot open camera {camera_id}")
        
        # Set camera properties
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, self.config.get('width', 1280))
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, self.config.get('height', 720))
        self.cap.set(cv2.CAP_PROP_FPS, self.config.get('fps', 30))
        
        # Initialize motion detector
        self.detector = MotionDetector(self.config.get('detection', {}))
        
        print("Camera initialized successfully")
        print(f"Resolution: {int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH))}x{int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT))}")
        print(f"FPS: {int(self.cap.get(cv2.CAP_PROP_FPS))}")
    
    def start_recording(self, frame):
        """Start recording video."""
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = self.output_dir / f"motion_{timestamp}.avi"
        
        fourcc = cv2.VideoWriter_fourcc(*self.config['recording'].get('codec', 'mp4v'))
        fps = int(self.cap.get(cv2.CAP_PROP_FPS))
        frame_size = (frame.shape[1], frame.shape[0])
        
        self.video_writer = cv2.VideoWriter(str(filename), fourcc, fps, frame_size)
        self.recording = True
        print(f"Started recording: {filename}")
    
    def stop_recording(self):
        """Stop recording video."""
        if self.video_writer is not None:
            self.video_writer.release()
            self.video_writer = None
            self.recording = False
            print("Stopped recording")
    
    def draw_overlay(self, frame, motion_detected, motion_percentage, contours):
        """Draw motion detection overlay on frame."""
        display_frame = frame.copy()
        
        if self.config['display'].get('show_motion_overlay', True):
            # Draw contours
            for contour in contours:
                x, y, w, h = cv2.boundingRect(contour)
                cv2.rectangle(display_frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                
                # Calculate contour center for detailed info
                M = cv2.moments(contour)
                if M["m00"] != 0:
                    cx = int(M["m10"] / M["m00"])
                    cy = int(M["m01"] / M["m00"])
                    cv2.circle(display_frame, (cx, cy), 5, (0, 0, 255), -1)
        
        if self.config['display'].get('show_stats', True):
            # Status indicator
            status_color = (0, 0, 255) if motion_detected else (0, 255, 0)
            status_text = "MOTION DETECTED" if motion_detected else "NO MOTION"
            cv2.putText(display_frame, status_text, (10, 30), 
                       cv2.FONT_HERSHEY_SIMPLEX, 1, status_color, 2)
            
            # Recording indicator
            if self.recording:
                cv2.circle(display_frame, (display_frame.shape[1] - 30, 30), 10, (0, 0, 255), -1)
                cv2.putText(display_frame, "REC", (display_frame.shape[1] - 80, 35),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            
            # Motion statistics
            stats_y = 70
            cv2.putText(display_frame, f"Motion: {motion_percentage:.2f}%", (10, stats_y),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
            cv2.putText(display_frame, f"Objects: {len(contours)}", (10, stats_y + 30),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
            
            # Timestamp
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            cv2.putText(display_frame, timestamp, (10, display_frame.shape[0] - 10),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        
        return display_frame
    
    def run(self):
        """Main loop for motion detection and recording."""
        self.initialize_camera()
        
        motion_frames = 0
        no_motion_frames = 0
        post_motion_buffer = self.config['recording'].get('post_motion_buffer', 30)
        
        print("\n=== GoPro Motion Detection Camera Started ===")
        print("Controls:")
        print("  - Press 'q' to quit")
        print("  - Press 's' to take a snapshot")
        print("  - Press 'r' to manually toggle recording")
        print("=" * 45)
        
        try:
            while True:
                ret, frame = self.cap.read()
                if not ret:
                    print("Failed to grab frame")
                    break
                
                # Detect motion
                motion_detected, motion_percentage, contours, fg_mask = self.detector.detect(frame)
                
                # Handle recording logic
                if motion_detected:
                    motion_frames += 1
                    no_motion_frames = 0
                    
                    if not self.recording:
                        self.start_recording(frame)
                else:
                    no_motion_frames += 1
                    
                    if self.recording and no_motion_frames > post_motion_buffer:
                        self.stop_recording()
                
                # Write frame if recording
                if self.recording and self.video_writer is not None:
                    self.video_writer.write(frame)
                
                # Display
                if self.config['display'].get('show_preview', True):
                    display_frame = self.draw_overlay(frame, motion_detected, 
                                                     motion_percentage, contours)
                    cv2.imshow('GoPro Motion Detection', display_frame)
                    
                    # Show motion mask in separate window
                    cv2.imshow('Motion Mask', fg_mask)
                
                # Handle keyboard input
                key = cv2.waitKey(1) & 0xFF
                if key == ord('q'):
                    break
                elif key == ord('s'):
                    # Take snapshot
                    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
                    snapshot_path = self.output_dir / f"snapshot_{timestamp}.jpg"
                    cv2.imwrite(str(snapshot_path), frame)
                    print(f"Snapshot saved: {snapshot_path}")
                elif key == ord('r'):
                    # Manual recording toggle
                    if self.recording:
                        self.stop_recording()
                    else:
                        self.start_recording(frame)
        
        except KeyboardInterrupt:
            print("\nInterrupted by user")
        
        finally:
            print("\nCleaning up...")
            if self.recording:
                self.stop_recording()
            
            if self.cap is not None:
                self.cap.release()
            
            cv2.destroyAllWindows()
            print("Camera tool stopped")


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description='GoPro-Style Motion Detection Camera Tool',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                          # Run with default settings
  %(prog)s --config my_config.json  # Run with custom config
  %(prog)s --camera 1               # Use camera device 1
        """
    )
    
    parser.add_argument('--config', type=str, default='config.json',
                       help='Path to configuration file (default: config.json)')
    parser.add_argument('--camera', type=int, 
                       help='Camera device ID (overrides config)')
    
    args = parser.parse_args()
    
    try:
        camera = GoProCamera(args.config)
        
        # Override camera ID if specified
        if args.camera is not None:
            camera.config['camera_id'] = args.camera
        
        camera.run()
    
    except Exception as e:
        print(f"Error: {e}")
        return 1
    
    return 0


if __name__ == '__main__':
    exit(main())
