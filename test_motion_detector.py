#!/usr/bin/env python3
"""
Unit tests for the motion detection functionality.
"""

import unittest
import numpy as np
import cv2
import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(__file__))

from camera_tool import MotionDetector


class TestMotionDetector(unittest.TestCase):
    """Test cases for MotionDetector class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.config = {
            'history': 500,
            'var_threshold': 16,
            'min_area': 500,
            'motion_threshold': 0.5
        }
        self.detector = MotionDetector(self.config)
    
    def test_detector_initialization(self):
        """Test that detector initializes correctly."""
        self.assertIsNotNone(self.detector)
        self.assertIsNotNone(self.detector.background_subtractor)
        self.assertEqual(self.detector.min_area, 500)
        self.assertEqual(self.detector.motion_threshold, 0.5)
    
    def test_detect_no_motion(self):
        """Test detection on static frames."""
        # Create a static frame
        frame = np.zeros((480, 640, 3), dtype=np.uint8)
        
        # Feed same frame multiple times to build background model
        for _ in range(10):
            motion_detected, motion_percentage, contours, fg_mask = self.detector.detect(frame)
        
        # After background model is built, no motion should be detected
        motion_detected, motion_percentage, contours, fg_mask = self.detector.detect(frame)
        
        # Motion percentage should be low for static frames
        self.assertLess(motion_percentage, 5.0, "Motion percentage should be low for static frames")
    
    def test_detect_with_motion(self):
        """Test detection with moving object."""
        # Create background frame
        background = np.zeros((480, 640, 3), dtype=np.uint8)
        
        # Build background model
        for _ in range(10):
            self.detector.detect(background)
        
        # Create frame with a moving object (white rectangle)
        moving_frame = background.copy()
        cv2.rectangle(moving_frame, (100, 100), (200, 200), (255, 255, 255), -1)
        
        # Detect motion
        motion_detected, motion_percentage, contours, fg_mask = self.detector.detect(moving_frame)
        
        # Should detect the white rectangle as motion
        self.assertGreater(motion_percentage, 0, "Should detect some motion")
        self.assertIsNotNone(contours, "Should return contours")
        self.assertIsNotNone(fg_mask, "Should return foreground mask")
    
    def test_contour_filtering(self):
        """Test that small contours are filtered out."""
        # Create background
        background = np.zeros((480, 640, 3), dtype=np.uint8)
        
        # Build background model
        for _ in range(10):
            self.detector.detect(background)
        
        # Create frame with a small object (smaller than min_area)
        small_object_frame = background.copy()
        cv2.circle(small_object_frame, (320, 240), 5, (255, 255, 255), -1)
        
        motion_detected, motion_percentage, contours, fg_mask = self.detector.detect(small_object_frame)
        
        # Small object should be filtered out
        self.assertEqual(len(contours), 0, "Small objects should be filtered")
    
    def test_config_override(self):
        """Test custom configuration values."""
        custom_config = {
            'history': 100,
            'var_threshold': 25,
            'min_area': 1000,
            'motion_threshold': 1.0
        }
        
        custom_detector = MotionDetector(custom_config)
        
        self.assertEqual(custom_detector.min_area, 1000)
        self.assertEqual(custom_detector.motion_threshold, 1.0)


def run_tests():
    """Run all tests."""
    print("=" * 60)
    print("Running Motion Detector Unit Tests")
    print("=" * 60)
    print()
    
    # Create test suite
    suite = unittest.TestLoader().loadTestsFromTestCase(TestMotionDetector)
    
    # Run tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Print summary
    print()
    print("=" * 60)
    if result.wasSuccessful():
        print("✓ All tests passed!")
    else:
        print("✗ Some tests failed")
    print("=" * 60)
    
    return 0 if result.wasSuccessful() else 1


if __name__ == '__main__':
    sys.exit(run_tests())
