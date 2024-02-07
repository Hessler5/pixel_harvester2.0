
class Extractor():
    def key_identifier(self, pixel_array, key):
        if set(pixel_array) == set([key]):
            return True
            
    def length_finder(self, x, y, image, width, key):
        image_length = 0
        for i in range(width):
            if image[x + i, y] == key:
                image_length += 1
            else:
                break
        return image_length - 2
    
    def height_finder(self, x, y, image, height, key):
        image_height = 0
        for i in range(height):
            if image[x, y + i] == key:
                image_height += 1
            else:
                break
        return image_height - 2
    
