const coffee = require('../photoStock/coffee.jpg')
const drive = require("../photoStock/drive.jpg");
const house = require("../photoStock/house.jpg");
const train = require("../photoStock/train.jpg");

export const photoData = [ 
    {
    "story": "Favorite Coffee Shop from Home :)",
    "location": "Austin, TX",
     "image": coffee
    },
    {
    "story": "Driving with Amelia",
    "location": "Richmond, VA",
      "image": drive
    }, 
    {
    "story": "Story 3",
    "location": "Iceland",
      "image": house
    },
    {
    "story": "Story 4",
    "location": "China",
      "image": train

    },
]
export default photoData 
