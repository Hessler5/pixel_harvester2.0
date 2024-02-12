from selenium import webdriver
import time

def preview_scraper(url):
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

    #screenshot
    driver.save_screenshot('preview_screenshot.png')

    driver.quit()