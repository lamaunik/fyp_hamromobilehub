from PIL import Image
import colorsys
import os

def fix_logo():
    path = r"c:\Users\ACER\Desktop\HamroMobileHub\frontend\public\logo.png"
    
    if not os.path.exists(path):
        print(f"Error: Logo file not found at {path}")
        return

    try:
        # Load image and ensure it's in RGBA mode for transparency handling
        img = Image.open(path).convert("RGBA")
        width, height = img.size
        
        # Create a new image for the transformed logo to be safe
        new_img = Image.new("RGBA", (width, height))
        
        for y in range(height):
            for x in range(width):
                # Use getpixel with a tuple for better cross-linter compatibility
                r, g, b, a = img.getpixel((x, y))
                
                if a == 0:
                    new_img.putpixel((x, y), (0, 0, 0, 0))
                    continue
                
                # Convert to HSV for precise color mapping
                h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
                
                # Target the green pixels: hue between 0.15 and 0.55
                if 0.15 < h < 0.55 and s > 0.05:
                    h = 0.96  # Rose / Crimson hue to match P.accent
                    s = min(1.0, s * 1.5)  # Boost saturation for a premium look
                else:
                    # Target other colors ( slate gray / text) and desaturate
                    # to keep them neutral grays/blacks
                    s = 0.0
                    
                nr, ng, nb = colorsys.hsv_to_rgb(h, s, v)
                new_img.putpixel((x, y), (int(nr*255), int(ng*255), int(nb*255), a))

        new_img.save(path)
        print(f"Logo updated successfully at: {path}")
        
    except Exception as e:
        print(f"An error occurred during logo processing: {e}")

if __name__ == "__main__":
    fix_logo()
