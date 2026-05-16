const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // Fallback to MongoMemoryServer if we want a zero-config setup
    const mongoServer = await MongoMemoryServer.create();
    uri = mongoServer.getUri();

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`🌸 MongoDB In-Memory Server Connected: ${conn.connection.host}`);

    // Seed database if empty
    await seedDatabase();

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  const Book = require('../models/Book');

  try {
    const count = await Book.countDocuments();
    if (count === 0) {
      console.log('📚 Seeding initial elegant books...');
      const books = [
        {
          title: "The Secret History",
          author: "Donna Tartt",
          description: "Under the influence of a charismatic classics professor, a group of clever, eccentric misfits at a New England college discover a way of thought and life a world away from the humdrum existence of their contemporaries.",
          genre: "Fiction",
          publishedYear: 1992,
          coverImage: "/images/The Secret History.jpg",
          averageRating: 4.8,
          totalReviews: 12
        },
        {
          title: "Pride and Prejudice",
          author: "Jane Austen",
          description: "A classic novel of manners that follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments.",
          genre: "Romance",
          publishedYear: 1813,
          coverImage: "/images/pride and prejudice.jpg",
          averageRating: 4.9,
          totalReviews: 45
        },
        {
          title: "The Bell Jar",
          author: "Sylvia Plath",
          description: "The Bell Jar chronicles the crack-up of Esther Greenwood: brilliant, beautiful, enormously talented, and successful, but slowly going under—maybe for the last time.",
          genre: "Fiction",
          publishedYear: 1963,
          coverImage: "/images/the bell jar.jpg",
          averageRating: 4.6,
          totalReviews: 32
        },
        {
          title: "Circe",
          author: "Madeline Miller",
          description: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child—not powerful, like her father, nor viciously alluring like her mother.",
          genre: "Fantasy",
          publishedYear: 2018,
          coverImage: "/images/Circe.jpg",
          averageRating: 4.7,
          totalReviews: 28
        },
        {
          title: "Jane Eyre",
          author: "Charlotte Brontë",
          description: "A passionate story of a young woman's search for love, independence, and self-respect in Victorian England.",
          genre: "Romance",
          publishedYear: 1847,
          coverImage: "/images/jane eyre.jpg",
          averageRating: 4.8,
          totalReviews: 38
        },
        {
          title: "Wuthering Heights",
          author: "Emily Brontë",
          description: "A tale of passionate yet destructive love between Catherine Earnshaw and Heathcliff, set on the bleak Yorkshire moors.",
          genre: "Romance",
          publishedYear: 1847,
          coverImage: "/images/Wuthering Heights.jpg",
          averageRating: 4.7,
          totalReviews: 41
        },
        {
          title: "Sense and Sensibility",
          author: "Jane Austen",
          description: "A story of two sisters navigating love, heartbreak, and societal expectations in 19th-century England.",
          genre: "Romance",
          publishedYear: 1811,
          coverImage: "/images/sense and sensability.jpg",
          averageRating: 4.6,
          totalReviews: 27
        },
        {
          title: "Anna Karenina",
          author: "Leo Tolstoy",
          description: "The tragic story of a married aristocrat's affair with a wealthy count, exploring themes of love, fidelity, and social hypocrisy.",
          genre: "Romance",
          publishedYear: 1877,
          coverImage: "/images/anna karenina.jpg",
          averageRating: 4.8,
          totalReviews: 52
        },
        {
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          description: "A gripping story of racial injustice in the American South, seen through the eyes of young Scout Finch.",
          genre: "Fiction",
          publishedYear: 1960,
          coverImage: "/images/to kill a mocking bird.jpg",
          averageRating: 4.9,
          totalReviews: 67
        },
        {
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          description: "The mysterious Jay Gatsby's lavish Long Island parties and his obsessive pursuit of Daisy Buchanan.",
          genre: "Fiction",
          publishedYear: 1925,
          coverImage: "/images/THE GREAT GATSBY.jpg",
          averageRating: 4.7,
          totalReviews: 89
        },
        {
          title: "One Hundred Years of Solitude",
          author: "Gabriel García Márquez",
          description: "The multi-generational story of the Buendía family in the mythical town of Macondo.",
          genre: "Fiction",
          publishedYear: 1967,
          coverImage: "/images/One hundred years of solitude.jpg",
          averageRating: 4.8,
          totalReviews: 43
        },
        {
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          description: "Holden Caulfield's rebellious journey through New York City after being expelled from prep school.",
          genre: "Fiction",
          publishedYear: 1951,
          coverImage: "/images/the catcher in the rye.jpg",
          averageRating: 4.5,
          totalReviews: 78
        },
        {
          title: "Murder on the Orient Express",
          author: "Agatha Christie",
          description: "A murder mystery aboard the famous luxury train, solved by detective Hercule Poirot.",
          genre: "Mystery",
          publishedYear: 1934,
          coverImage: "/images/Murder on the Orient Express (2).jpg",
          averageRating: 4.7,
          totalReviews: 56
        },
        {
          title: "The Hound of the Baskervilles",
          author: "Arthur Conan Doyle",
          description: "Sherlock Holmes investigates a legendary curse and a terrifying ghostly hound on the moors of Devonshire.",
          genre: "Mystery",
          publishedYear: 1902,
          coverImage: "/images/the hounds of baskerville.jpg",
          averageRating: 4.6,
          totalReviews: 34
        },
        {
          title: "And Then There Were None",
          author: "Agatha Christie",
          description: "Ten strangers are invited to an island, and one by one, they begin to die.",
          genre: "Mystery",
          publishedYear: 1939,
          coverImage: "/images/and then there were none.jpg",
          averageRating: 4.8,
          totalReviews: 61
        },
        {
          title: "Rebecca",
          author: "Daphne du Maurier",
          description: "A young woman marries a widower and moves to his grand estate, haunted by the memory of his first wife.",
          genre: "Mystery",
          publishedYear: 1938,
          coverImage: "/images/rebecca.jpg",
          averageRating: 4.7,
          totalReviews: 29
        },
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          description: "Bilbo Baggins is swept into an epic quest to reclaim the lost Dwarf Kingdom of Erebor.",
          genre: "Fantasy",
          publishedYear: 1937,
          coverImage: "/images/the hobbit.jpg",
          averageRating: 4.8,
          totalReviews: 73
        },
        {
          title: "The Name of the Wind",
          author: "Patrick Rothfuss",
          description: "The story of Kvothe, an adventurer and musician, told through his own narration.",
          genre: "Fantasy",
          publishedYear: 2007,
          coverImage: "/images/The Name Of The Wind.jpg",
          averageRating: 4.8,
          totalReviews: 34
        },
        {
          title: "Stardust",
          author: "Neil Gaiman",
          description: "A young man promises his beloved he will retrieve a fallen star and ventures into the magical realm of Faerie.",
          genre: "Fantasy",
          publishedYear: 1999,
          coverImage: "/images/Stardust.jpg",
          averageRating: 4.6,
          totalReviews: 22
        },
        {
          title: "The Sun and Her Flowers",
          author: "Rupi Kaur",
          description: "A collection of poetry about growth, healing, and finding light in darkness.",
          genre: "Poetry",
          publishedYear: 2017,
          coverImage: "/images/the sun and her flowers.jpg",
          averageRating: 4.5,
          totalReviews: 18
        },
        {
          title: "Milk and Honey",
          author: "Rupi Kaur",
          description: "A collection of poetry about survival, love, loss, and femininity.",
          genre: "Poetry",
          publishedYear: 2014,
          coverImage: "/images/milk and honey.jpg",
          averageRating: 4.4,
          totalReviews: 25
        },
        {
          title: "Becoming",
          author: "Michelle Obama",
          description: "The intimate memoir of former First Lady Michelle Obama, tracing her journey from the South Side of Chicago to the White House.",
          genre: "Biography",
          publishedYear: 2018,
          coverImage: "/images/Becoming.jpg",
          averageRating: 4.9,
          totalReviews: 42
        },
        {
          title: "The Diary of a Young Girl",
          author: "Anne Frank",
          description: "The raw and powerful diary of a Jewish teenager hiding from the Nazis during World War II.",
          genre: "Biography",
          publishedYear: 1947,
          coverImage: "/images/The Diary Of A Young Girl.jpg",
          averageRating: 4.8,
          totalReviews: 56
        },
        {
          title: "1984",
          author: "George Orwell",
          description: "A dystopian vision of a totalitarian future where Big Brother watches every move.",
          genre: "Sci-Fi",
          publishedYear: 1949,
          coverImage: "/images/George Orwell_ 1984.jpg",
          averageRating: 4.7,
          totalReviews: 94
        },
        {
          title: "Brave New World",
          author: "Aldous Huxley",
          description: "A futuristic world where humans are engineered and happiness is manufactured.",
          genre: "Sci-Fi",
          publishedYear: 1932,
          coverImage: "/images/Brave New World.jpg",
          averageRating: 4.6,
          totalReviews: 67
        },
        {
          title: "The Handmaid's Tale",
          author: "Margaret Atwood",
          description: "A dystopian novel set in a near-future New England where women are subjugated.",
          genre: "Sci-Fi",
          publishedYear: 1985,
          coverImage: "/images/The Handmaid’s Tale.jpg",
          averageRating: 4.7,
          totalReviews: 51
        },
        {
          title: "Sapiens",
          author: "Yuval Noah Harari",
          description: "A brief history of humankind, from the Stone Age to the 21st century.",
          genre: "Non-Fiction",
          publishedYear: 2011,
          coverImage: "/images/Sapiens.jpg",
          averageRating: 4.8,
          totalReviews: 38
        },
        {
          title: "The Art of Happiness",
          author: "Dalai Lama",
          description: "A handbook on how to find joy and purpose in life from the spiritual leader.",
          genre: "Non-Fiction",
          publishedYear: 1998,
          coverImage: "/images/The Art of Happiness.jpg",
          averageRating: 4.6,
          totalReviews: 23
        },
        {
          title: "The Silent Patient",
          author: "Alex Michaelides",
          description: "A woman shoots her husband and then never speaks another word. A psychotherapist is determined to uncover her secret.",
          genre: "Thriller",
          publishedYear: 2019,
          coverImage: "/images/The Silent Patient.jpg",
          averageRating: 4.7,
          totalReviews: 29
        },
        {
          title: "Gone Girl",
          author: "Gillian Flynn",
          description: "A husband and wife's twisted relationship unravels when she disappears on their fifth anniversary.",
          genre: "Thriller",
          publishedYear: 2012,
          coverImage: "/images/Gone Girl.jpg",
          averageRating: 4.5,
          totalReviews: 47
        },
        {
          title: "The Nightingale",
          author: "Kristin Hannah",
          description: "Two sisters struggle to survive during World War II in Nazi-occupied France.",
          genre: "History",
          publishedYear: 2015,
          coverImage: "/images/The Nightingale.jpg",
          averageRating: 4.9,
          totalReviews: 35
        },
        {
          title: "All the Light We Cannot See",
          author: "Anthony Doerr",
          description: "A blind French girl and a German boy's paths collide during World War II.",
          genre: "History",
          publishedYear: 2014,
          coverImage: "/images/all the light we cannot see.jpg",
          averageRating: 4.8,
          totalReviews: 41
        }
      ];
      await Book.insertMany(books);
      console.log('✨ Database seeded successfully!');
    }
  } catch (err) {
    console.error('Failed to seed database:', err.message);
  }
};

module.exports = connectDB;