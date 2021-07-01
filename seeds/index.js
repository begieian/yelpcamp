const Campground = require('../models/campground');
const cities = require('./cities');
const {
  places,
  descriptors
} = require('./seedHelpers');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the database!')
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '60af5a783aa9ad12c810667f',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas maecenas pharetra convallis. Neque viverra justo nec ultrices.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [{
          url: 'https://res.cloudinary.com/dehzuzbvb/image/upload/v1623913460/YelpCamp/tqj38lamajtmlv1s77yx.jpg',
          filename: 'YelpCamp/tqj38lamajtmlv1s77yx'
        },
        {
          url: 'https://res.cloudinary.com/dehzuzbvb/image/upload/v1623913463/YelpCamp/w9d9aohswp0snaly8f9s.jpg',
          filename: 'YelpCamp/w9d9aohswp0snaly8f9s'
        },
        {
          url: 'https://res.cloudinary.com/dehzuzbvb/image/upload/v1623913465/YelpCamp/vvlc2geta9tnqbgsoyeh.jpg',
          filename: 'YelpCamp/vvlc2geta9tnqbgsoyeh'
        },
        {
          url: 'https://res.cloudinary.com/dehzuzbvb/image/upload/v1623913466/YelpCamp/nhw8gni4joqqbamkdtqq.jpg',
          filename: 'YelpCamp/nhw8gni4joqqbamkdtqq'
        }
      ]
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});