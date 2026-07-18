const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "mazi_city",
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
    seedDatabase();
});

const CITIES = [
    { city: 'Jintur', state: 'Maharashtra' },
    { city: 'Pune', state: 'Maharashtra' },
    { city: 'Mumbai', state: 'Maharashtra' },
    { city: 'Nashik', state: 'Maharashtra' },
    { city: 'Nagpur', state: 'Maharashtra' },
    { city: 'Kolhapur', state: 'Maharashtra' },
    { city: 'Solapur', state: 'Maharashtra' },
    { city: 'Aurangabad', state: 'Maharashtra' },
    { city: 'Latur', state: 'Maharashtra' },
    { city: 'Nanded', state: 'Maharashtra' }
];

const CATEGORIES = [
    { name: 'Grocery Store', description: 'Fresh groceries and daily needs' },
    { name: 'Electronics Store', description: 'Gadgets, appliances, and mobiles' },
    { name: 'Clothing Store', description: 'Fashion and apparel' },
    { name: 'Furniture Store', description: 'Home decor and furniture' },
    { name: 'Restaurant', description: 'Food, dining, and takeaways' },
    { name: 'Medical Store', description: 'Pharmacy and healthcare products' }
];

// Helper to generate random rating between 3.5 and 5.0
const getRandomRating = () => (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
const getRandomReviews = () => Math.floor(Math.random() * 500) + 10;
const getRandomPopular = () => Math.random() > 0.6 ? 1 : 0;

// Shop name prefixes/suffixes by category
const nameGenerators = {
    'Grocery Store': (city) => [`${city} Fresh Mart`, `Shree Grocery ${city}`, `${city} Supermarket`, `Daily Needs ${city}`],
    'Electronics Store': (city) => [`${city} Electronics`, `TechZone ${city}`, `Digital World ${city}`, `SmartGadgets ${city}`],
    'Clothing Store': (city) => [`${city} Fashion Hub`, `Style Street ${city}`, `Trendy Wear ${city}`, `Shree Collection ${city}`],
    'Furniture Store': (city) => [`${city} Furniture House`, `Comfort Wood ${city}`, `Modern Living ${city}`, `Royal Furniture ${city}`],
    'Restaurant': (city) => [`The Great ${city} Dine`, `Spicy ${city} Kitchen`, `${city} Food Court`, `Tasty Bites ${city}`],
    'Medical Store': (city) => [`${city} City Pharmacy`, `Sai Medicals ${city}`, `HealthPlus ${city}`, `Care Chemist ${city}`]
};

async function runQuery(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

async function seedDatabase() {
    try {
        console.log("Seeding 10 locations...");
        for (const loc of CITIES) {
            try {
                await runQuery(
                    "INSERT INTO locations (city, state, status) VALUES (?, ?, 'Active')", 
                    [loc.city, loc.state]
                );
            } catch (e) { }
        }

        console.log("Seeding 6 categories...");
        for (const cat of CATEGORIES) {
            try {
                await runQuery(
                    "INSERT INTO categories (name, description, status) VALUES (?, ?, 'Active')", 
                    [cat.name, cat.description]
                );
            } catch (e) { }
        }

        console.log("Clearing old businesses to prevent massive duplication (Optional, commented out)...");
        // await runQuery("DELETE FROM businesses"); 

        console.log("Seeding city-wise dummy data across all tabs...");
        let businessCount = 0;

        for (const loc of CITIES) {
            for (const cat of CATEGORIES) {
                // Generate 3 shops per category per city
                const names = nameGenerators[cat.name](loc.city);
                for (let i = 0; i < 3; i++) {
                    const shopName = names[i % names.length];
                    const rating = getRandomRating();
                    const reviews = getRandomReviews();
                    const is_popular = getRandomPopular();
                    
                    // We'll slightly modify the name to ensure uniqueness if the loop wraps around
                    const finalName = i >= names.length ? `${shopName} (Branch ${i+1})` : shopName;

                    try {
                        await runQuery(
                            `INSERT INTO businesses (businessTitle, storeName, category, location, rating, review, description, mobileNumber, whatsappNumber, is_popular, status) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')`,
                            [
                                finalName, finalName, cat.name, loc.city, rating, reviews, 
                                `Welcome to ${finalName}! The best ${cat.name} in ${loc.city}.`, 
                                '9876543210', '9876543210', is_popular
                            ]
                        );
                        businessCount++;
                    } catch (e) {
                        // Ignore duplicate insert errors
                    }
                }
            }
        }

        console.log(`Successfully seeded ${businessCount} shops across ${CITIES.length} cities and ${CATEGORIES.length} categories!`);
    } catch (err) {
        console.error("Seeding error:", err);
    } finally {
        process.exit();
    }
}
