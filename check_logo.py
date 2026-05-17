from PIL import Image
import os, glob

# Check public folder
for f in sorted(glob.glob(r'C:\Users\ARCTe\Downloads\testwebsite2\public\*')):
    name = os.path.basename(f)
    if name.endswith(('.png', '.avif', '.webp', '.jpg')):
        try:
            img = Image.open(f)
            print(f"{name}: {img.size} {img.mode} {os.path.getsize(f)//1024}KB")
        except Exception as e:
            print(f"{name}: ERROR {e}")
