import os
from PIL import Image

def create_thumbnails(input_dir, output_dir, size=(400, 400), jpeg_quality=90):
    """
    Creates high-quality thumbnail versions of images with correct format handling.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created directory: {output_dir}")

    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            input_path = os.path.join(input_dir, filename)
            try:
                with Image.open(input_path) as img:
                    original_format = img.format
                    name, ext = os.path.splitext(filename)

                    # Resize preserving aspect ratio
                    img.thumbnail(size, Image.LANCZOS)

                    # Convert color mode based on format
                    if original_format == 'PNG':
                        if img.mode not in ('RGBA', 'LA'):
                            img = img.convert('RGBA')
                        output_ext = '.png'
                        save_kwargs = {'format': 'PNG', 'optimize': True}
                    else:
                        if img.mode != 'RGB':
                            img = img.convert('RGB')
                        output_ext = '.jpg'
                        save_kwargs = {'format': 'JPEG', 'quality': jpeg_quality}

                    output_filename = f"{name}_thumb{ext}"
                    output_path = os.path.join(output_dir, output_filename)

                    img.save(os.path.join(output_dir, output_filename), **save_kwargs)
                    print(f"Created thumbnail: {output_filename}")

            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    current_script_dir = os.path.dirname(os.path.abspath(__file__))
    pictures_dir = os.path.join(current_script_dir, 'Pictures')
    thumbnails_dir = os.path.join(current_script_dir, 'Thumbnails')

    create_thumbnails(pictures_dir, thumbnails_dir)
    print("\nThumbnail generation complete.")
