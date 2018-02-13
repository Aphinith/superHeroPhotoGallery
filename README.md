This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Instructions

1. Clone the repo: $git clone https://github.com/Aphinith/superHeroPhotoGallery.git
2. CD into root directory
3. In the /src folder, create a "KEYS.js" file with your [Marvel API](https://developer.marvel.com/) public and private key to export:
```
export const PUBLIC_KEY = <public key>;
export const PRIVATE_KEY = <private key>;
```
4. `npm install`
5. `npm start` 
6. Navigate to localhost:3000 with your browser
7. As soon as the page loads, a GET request will be made to the Marvel API to populate the page with images of Marvel Heroes.
    1. I created an array of images with name and description from the Marvel API Call
    2. Each image has a url image, and the name of the hero on the image
    3. The name is displayed over the image
    4. Each image is clickable. Once clicked, it will open a carousel with the image enlarged
    5. Once in the carousel, the user can click next or previous to scroll through the images
    6. Carousel images also have a description of the hero on the image

### Existing Bug(s)

1. Sometimes when clicking on an image to display the carousel, when clicking "next", it scrolls through a number of images instead of one. This would only happen on the "first" click on the "next" button.

### Improvements to be made

1. Improve styling of description so it is easier to read. Adjust size and location of description text to improve presentation.
