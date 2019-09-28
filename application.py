from flask import Flask
from flask import render_template, flash, redirect, url_for, request, send_from_directory
import os
import random
from PIL import Image


application = Flask(__name__)
application.config['SECRET_KEY'] = os.urandom(32)

photos_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "static", "photos", "photography")
design_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "static", "photos", "design")


@application.route("/")
def home():
    photos_display = return_preview_photos(photos_dir, "photography")
    #design_display = return_preview_photos(design_dir)
    design_display = {}
    return render_template("home.html", photos=photos_display, design=design_display)


@application.route('/photography')
def photography():
    photos_display = return_preview_photos(photos_dir, "photography", preview=False)
    return render_template('photography.html', photos=photos_display)


@application.route('/blog')
def blog():
    pass
    return render_template('blog.html')


@application.route('/javascript')
def javascript():
    return render_template('javascript.html')


@application.route('/<filename>')
def send_image(filename):
    return send_from_directory('photos', filename)


def return_preview_photos(path, type, preview=True):
    num_images = len(os.listdir(path))
    if preview:
        random_preview = random.sample(range(0, num_images), 4)
        display_photos = [path for index, path in enumerate(os.listdir(path)) if index in random_preview]
        display_photos = resize_image(display_photos, path, type)
    else:
        display_photos = [path for index, path in enumerate(os.listdir(path))]
        display_photos = resize_image(display_photos, path, type, factor=900)
    return display_photos


def resize_image(photos, path, type, factor=272):
    images = {}
    for index, photo in enumerate(photos):
        image = Image.open(os.path.join(path, photo))
        width, height = image.size
        if width > factor:
            scale_factor = factor / width
            n_height = height * scale_factor
            n_width = width * scale_factor
        image.close()

        images["static/photos/"+type+"/"+photo] = {"width": int(n_width), "height": int(n_height)}
    return images


if __name__ == "__main__":
    application.debug = True
    application.run()