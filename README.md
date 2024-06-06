# Product Scraper Application - Frontend

This is the frontend portion of the Product Scraper Application, developed using Angular 17 and Tailwind CSS. This application allows users to interact with the backend to scrape product details from e-commerce websites, view and search through the listed products, and manage product details. Currently Darax and Flipka

## Features

- **Home Page**: 
  - **Search Bar**: Allows users to search for products. The search is triggered after a brief pause in typing to enhance performance and user experience.
  - **Product List Component**: Displays a list of products with pagination.
  - **Category Dropdown**: Filters products by selected category.
  - **URL Submission**: Users can enter a URL to scrape a product. Upon successful scraping, the user is redirected to the product detail page. If the scraping fails, an error message is displayed.

- **Product Detail Page**: 
  - Provides detailed information about a specific product.
  - Accessible by clicking on a product from the product list.

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Angular CLI**: Ensure you have Angular CLI installed (version 17).
- **Backend**: Ensure the backend portion of the application is running. Follow the backend README for setup instructions. [Backend Repo](https://github.com/aa-rohan/Scraper-Demo-API)

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/aa-rohan/Scraper-Demo-API.git
   cd Scraper-Demo-UI
   ```
   
2. **Install Dependencies:**

   ```sh
    npm install
    ```
   
3. **Start the server:**

   ```sh
    ng serve
    ```
The application will be available at http://localhost:4200.

   
## Usage

### Homepage
- **Search for products**: Use the search bar to find products matching your search term. The search will trigger automatically after a brief pause in typing.
- **Filter products**: Select a category from the dropdown to filter products by that category.
- **Pagination**: Navigate through the list of products using pagination controls.
- **Scrape a new product**: Enter a product URL in the input field and click the scrape button to scrape the product. If successful, you will be redirected to the product detail page. If an error occurs, an error message will be displayed.

### Product Detail Page
- View detailed information about a specific product and visit the product url.
   
## Next Steps

With more time, the following could be integrated:

- **Add more filters**: Filter by price or by domain.
- **Expand Unit Testing**: Add more testing for critical functionality.
