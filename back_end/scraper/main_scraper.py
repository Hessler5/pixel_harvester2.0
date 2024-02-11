from selenium import webdriver
import time
from PIL import Image
from scraper.image_extraction import Extractor

def scraper(url):
    PATH = "/Users/ethanhessler/Downloads/chromedriver-mac-arm64/chromedriver"


    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")

    service = webdriver.ChromeService(executable_path = PATH)
    driver = webdriver.Chrome(service=service, options=chrome_options)
    # opens the site twice in order to get around first visit promo pop-ups
    driver.get(f'{url}')
    driver.get(f'{url}')

    #initial sleep to allow for loading
    time.sleep(10)

    # scrolls to the bottomn of the page
    # previouse_height = driver.execute_script('return document.body.scrollHeight;')
    # while True:
    #     if driver.execute_script('return document.body.scrollHeight;') >= 15000:
    #         driver.execute_script('window.scrollBy(0, 15000)')
    #         break
    #     else:
    #         driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
    #         time.sleep(10)
    #         new_height = driver.execute_script('return document.body.scrollHeight;')
    #         if previouse_height == new_height:
    #             break
    #         previouse_height = new_height


    #sets dimensions for screenshot
    width = 1336

    height = driver.execute_script("return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);")
    driver.set_window_size(width, height)

    #css injection for image borders and check pixel
    outline_image = driver.execute_script("""
                                images = document.getElementsByTagName('img');
                                for (let img of images) {
                                      img.style.zIndex = '1000';
                                    img.style.borderRadius = "0";
                                    img.style.borderColor = "rgb(255,0,0)"; 
                                    img.style.borderWidth = "1px";
                                    img.style.borderStyle = "solid";}
                                reference_square = document.createElement('div');
                                reference_square.style.width = '1px';
                                reference_square.style.height = '1px';
                                reference_square.style.backgroundColor = 'rgb(255, 0, 0, 255)';
                                reference_square.style.position = 'absolute';
                                reference_square.style.top = '0';
                                reference_square.style.zIndex = 1000;                
                                body = document.querySelector('body');
                                body.append(reference_square);
                                """)

    #screenshot
    driver.save_screenshot('screenshot.png')

    driver.quit()

    #-----------------Start of Image Processing-----------------#


    #opens imge and gets meta data
    image_file = Image.open('./screenshot.png', 'r')
    width, height = image_file.size
    print(height)

    #indexes image as pix and sets color key
    pix = image_file.load()
    color_key = pix[0, 0]

    #for testing purposes this is the conversion of rgb (255, 0, 0, 255) when passed through pillow
    #(255, 0, 0, 255) == (234, 51, 35, 255)
    #initialize cusotm class with helper tools
    extract = Extractor()

    print(pix[-1, 0])
    #counts images for file name
    image_count = 0
    #loops through every pixel in the image
    for y in range(1, height):
        for x in range(1, width):
                #checks each pixel to see if its the start of an image
                if x - 1 >= 0 and y - 1 >= 0 and y + 2 < height and x + 2 < width:
                    testarray = [pix[x, y], pix[x + 1, y], pix[x + 2, y], pix[x, y + 1], pix[x, y + 2], pix[x, y - 1], pix[x - 1, y]]
                    if extract.key_identifier(testarray, color_key):
                        #if an image is detected helper functions are run and subimage is cropped and saved
                        image_count += 1 
                        img_length = extract.length_finder(x, y, pix, width, color_key)
                        img_height = extract.height_finder(x, y, pix, height, color_key)
                        if img_length > 1 and img_height > 1:
                            crop = image_file.crop((x + 1, y + 1, x + img_length, y + img_height))
                            crop.save(f"image {image_count}.png", 'PNG')


