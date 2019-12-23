from flask import Flask
from flask import render_template, flash, redirect, url_for, request, send_from_directory
import os
import random
from PIL import Image
from datetime import datetime
import json
import markdown2


application = Flask(__name__)
application.config['SECRET_KEY'] = b'kL\xd4\x83g>t~\xac\xbf\x0b,w\xae\xbd\x8f'

curr_dir = os.path.dirname(os.path.realpath(__file__))
photos_dir = os.path.join(curr_dir, "static", "photos", "photography")
design_dir = os.path.join(curr_dir, "static", "photos", "design")
blog_dir = os.path.join(curr_dir, "static", "blogs")

blogs = {}


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
    blogs = get_blogs()
    return render_template('blog.html', blogs=blogs)


@application.route("/blog_post/<id>", methods=['GET', 'POST'])
def blog_post(id):

    try:
        blog = blogs[id]
    except:
        blogs = get_blogs()
        blog = blogs[id]


    return render_template('blog_post.html', blog=blog)


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


def get_blogs():

    dir_files = os.listdir(blog_dir)

    for index, folder in enumerate(dir_files):
        dir_blog = os.path.join(blog_dir, folder)
        if os.path.isdir(dir_blog):
            blog_content_path = os.path.join(dir_blog, "blog.md")
            blog_meta = os.path.join(dir_blog, "blog_meta.json")
            blog_content = open(blog_content_path)
            blog_meta = json.load(open(blog_meta))
            date = datetime.strptime(blog_meta['date'], "%m-%d-%Y").date()
            title = blog_meta['title']
            title_url = title.replace(" ", "-")
            subtitle = blog_meta['subtitle']
            content = blog_content.read()
            content = markdown2.markdown(content)
            blog_image = blog_meta['blog_image']

            link = url_for('blog_post', id=title_url)

            blogs[title_url] = {"title": title,
                                "subtitle": subtitle,
                                "content": content,
                                "redirect": link,
                                "date": date,
                                "blog_image": blog_image,
                                }

    return blogs


if __name__ == "__main__":
    application.debug = True
    application.run()