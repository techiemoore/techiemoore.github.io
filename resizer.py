import os
from PIL import Image

def create_thumbnails(input_dir, output_dir, size=(150, 150), quality=90):
    """
    Creates high-quality thumbnail versions of images in the input directory and saves them
    to the output directory.

    Args:
        input_dir (str): The directory containing the original images.
        output_dir (str): The directory where thumbnails will be saved.
        size (tuple): The desired size for the thumbnails (width, height).
        quality (int): JPEG quality (0–100). Higher means better.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created directory: {output_dir}")

    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            input_path = os.path.join(input_dir, filename)
            try:
                with Image.open(input_path) as img:
                    img = img.convert("RGB")  # Ensure consistent color space
                    img_ratio = img.width / img.height
                    thumb_ratio = size[0] / size[1]

                    # Resize while maintaining aspect ratio and best quality
                    if img_ratio > thumb_ratio:
                        new_height = size[1]
                        new_width = int(new_height * img_ratio)
                    else:
                        new_width = size[0]
                        new_height = int(new_width / img_ratio)

                    img_resized = img.resize((new_width, new_height), Image.LANCZOS)

                    # Center crop to exact size
                    left = (new_width - size[0]) // 2
                    top = (new_height - size[1]) // 2
                    img_cropped = img_resized.crop((left, top, left + size[0], top + size[1]))

                    name, ext = os.path.splitext(filename)
                    output_filename = f"{name}_thumb.jpg"  # Always save as JPEG
                    output_path = os.path.join(output_dir, output_filename)
                    img_cropped.save(output_path, format='JPEG', quality=quality)
                    print(f"Created thumbnail for {filename} -> {output_filename}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    current_script_dir = os.path.dirname(os.path.abspath(__file__))
    pictures_dir = os.path.join(current_script_dir, 'Pictures')
    thumbnails_dir = os.path.join(current_script_dir, 'Thumbnails')

    create_thumbnails(pictures_dir, thumbnails_dir)
    print("\nThumbnail generation complete.")
