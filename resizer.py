import os
from PIL import Image

def create_thumbnails(input_dir, output_dir, size=(150, 150)):
    """
    Creates thumbnail versions of images in the input directory and saves them
    to the output directory.

    Args:
        input_dir (str): The directory containing the original images.
        output_dir (str): The directory where thumbnails will be saved.
        size (tuple): The desired size for the thumbnails (width, height).
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created directory: {output_dir}")

    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            input_path = os.path.join(input_dir, filename)
            try:
                with Image.open(input_path) as img:
                    img.thumbnail(size)
                    name, ext = os.path.splitext(filename)
                    output_filename = f"{name}_thumb{ext}"
                    output_path = os.path.join(output_dir, output_filename)
                    img.save(output_path)
                    print(f"Created thumbnail for {filename} -> {output_filename}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    current_script_dir = os.path.dirname(os.path.abspath(__file__))
    pictures_dir = os.path.join(current_script_dir, 'Pictures')
    thumbnails_dir = os.path.join(current_script_dir, 'Thumbnails')

    create_thumbnails(pictures_dir, thumbnails_dir)
    print("\nThumbnail generation complete.")
