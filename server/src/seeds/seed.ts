//revised 3.23.25 njw
import db from '../config/connection';
import { User, Review } from '../models/index';
import userData from './userData.json';
import reviewData from './reviewData.json';

// Use an async function to seed the database
const seedDatabase = async () => {
  try {
    // Initialize the database connection
    await db();
    console.log('Database connected for seeding');

    // Clear existing data
    await Review.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing database data');

    // Create users
    const users = await User.create(userData);
    console.log(`${users.length} users created`);
    
    // Create reviews and assign to random users
    for (const review of Array.isArray(reviewData) ? reviewData : []) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const user = users[randomUserIndex];

      const createdReview = await Review.create({
        ...review,
        reviewedBy: user._id,
      });

      // Add review to user's reviews
      await User.findByIdAndUpdate(
        user._id,
        { $push: { reviews: createdReview._id } },
        { new: true }
      );
    }

    console.log('Seed data inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};
// Run the seed function
seedDatabase();



// import db from '../config/connection';
// import { User, Review } from '../models';
// import userData from './userData.json'; //fixed issue by adding "resolveJsonModule": true, to server tsconfig.json njw
// import reviewData from './reviewData.json'; // Changed from reportData.json

// //connect to database
// db.once('open', async () => {
//     try {
//         // clear existing data
//         await Review.deleteMany({});
//         await User.deleteMany({});

//         // create users
//         const users = await User.create(userData);
        
//         // create reviews and assign to random users
//         for (const review of Array.isArray(reviewData) ? reviewData : []) {  //changed to correct array error "reviewData" 3.19.25 njw
//             const randomUserIndex = Math.floor(Math.random() * users.length);
//             const user = users[randomUserIndex];

//             const createdReview = await Review.create({
//                 ...review,
//                 reviewedBy: user._id,
//             });

//             // add review to user's reviews
//             await User.findByIdAndUpdate(
//                 user._id,
//                 { $push: { reviews: createdReview._id } },
//                 { new: true }
//             );
//         }

//         console.log('Seed data inserted!');
//         process.exit(0);
//     } catch (err) {
//         console.error(err);
//         process.exit(1);
//     }
// });