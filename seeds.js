const mongoose = require('mongoose');
const users = require('./models/user');

mongoose.connect('mongodb://localhost:27017/googleAuth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('database connected');
})

const userSeeds = [
    {
        email: 'mak@gmail.com',
        firstName: 'Daniel',
        lastName: 'Makyao',
        profilePhoto: 'https://res.cloudinary.com/dd668jp9n/video/upload/v1665821025/samples/cld-sample-video.mp4'
    },
    {
        email: 'jul@gmail.com',
        firstName: 'julius',
        lastName: 'Makyao',
        profilePhoto: 'https://res.cloudinary.com/dd668jp9n/video/upload/v1665821025/samples/cld-sample-video.mp4'
    }
]

users.insertMany(userSeeds).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})