# WordPress Core Data Viewer with Metadata

## Introduction
The "WordPress Core Data Viewer with Metadata" is a Next.js application designed to facilitate the viewing and management of WordPress database information. It provides an intuitive interface for accessing and displaying core WordPress data such as users, posts, comments, and terms, along with their associated metadata.

## Features
- Interface for easy access to WordPress core data: Users, Posts, Comments, and Terms.
- Capability to view and interact with metadata for each data type.
- Dynamic sorting and presentation of data.
- Secure database connections managed through environment variables.

## Setup

### Prerequisites
- Node.js installed on your system.
- Access to a WordPress database.

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jimmylee827/Wordpress-Core-Data-Viewer-with-Metadata.git
   ```
2. **Navigate to the Project Directory:**:
   ```bash
   cd Wordpress-Core-Data-Viewer-with-Metadata/wp-data-manager
   ```
3. **Install Dependencies:**:
   ```bash
   npm install
   ```
4. **Environment Configuration:**:
   Create a .env.local file in the project root and add your database connection details:
   ```bash
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

## Usage
Open http://localhost:3000 in your browser to interact with the application. The interface includes buttons for each data category (Users, Posts, Comments, Terms). Click on these buttons to view the data and use the 'Toggle Metadata' button for each entry to view or hide additional details.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes.
4. Push to your branch and submit a pull request.

## License
This project is licensed under the MIT License.
