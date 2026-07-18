-- Create shops table
CREATE TABLE IF NOT EXISTS shops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image LONGTEXT NOT NULL,
  businessTitle VARCHAR(255) NOT NULL,
  storeName VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  rating DECIMAL(3, 1) DEFAULT 0,
  review INT DEFAULT 0,
  location TEXT,
  description TEXT,
  mobileNumber VARCHAR(20),
  whatsappNumber VARCHAR(20),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
