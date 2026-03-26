from PIL import Image
import colorsys

def fix_logo():
    path = r"c:\Users\ACER\Desktop\HamroMobileHub\frontend\public\logo.png"
    img = Image.open(path).convert("RGBA")
    pixels = img.load()

    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = pixels[x, y]
            if a == 0: continue
            
            h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
            
            # Target the green pixels: hue between 0.15 and 0.55
            if 0.15 < h < 0.55 and s > 0.05:
                h = 0.96  # Rose / Crimson hue
                s = min(1.0, s * 1.5)  # Boost saturation to match P.accent
            else:
                # Target the slate gray and text: desaturate completely to avoid color tinting
                s = 0.0
                
            nr, ng, nb = colorsys.hsv_to_rgb(h, s, v)
            pixels[x, y] = (int(nr*255), int(ng*255), int(nb*255), a)

    img.save(path)
    print("Logo updated successfully.")

if __name__ == "__main__":
    fix_logo()
