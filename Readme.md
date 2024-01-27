# Stock Price View Application

## Objective

The Stock Price View Application allows users to access and manage data from the Bombay Stock Exchange (BSE). The application is versatile and can be implemented using Node.js or any other programming language of your choice.

## Tasks

### Data Script

- **Download Bhavcopy ZIP:**

  - Downloads the Equity Bhavcopy ZIP from the BSE website.

- **Extract and Read CSV:**

  - Extracts and reads the CSV file from the downloaded ZIP.

- **Store Data:**

  - Stores the data in either MongoDB or a SQL database, including fields such as code, name, open, high, low, close.

- **Date Customization:**

  - Allows changing the date in the ZIP URL to retrieve historic data.

- **Fetch Last 50 Days:**

  - Adds support to fetch the data for the last 50 days.

- **Run Script Before Server Start:**
  - The script can be executed before starting the server.

### API Creation

- **Use Express.js:**
  - Utilizes Express.js or a similar framework in another language to build a RESTful API.

#### API Endpoints

- **GET /api/top10stocks:**

  - Returns information for the top 10 stocks.

- **GET /api/stocks/:name:**

  - Finds stocks by name.

- **GET /api/stocks/:id/history:**

  - Retrieves the stock price history list for UI graph.

- **POST /api/favorites:**

  - Adds a stock to favorites.

    - Requires a JSON body with the stock information.

    ```json
    {
      "code": "XYZ123",
      "name": "Example Stock",
      "open": 100.0,
      "high": 120.0,
      "low": 90.0,
      "close": 110.0
    }
    ```

- **GET /api/favorites:**

  - Retrieves the list of favorite stocks.

- **DELETE /api/favorites/:id:**
  - Removes a stock from favorites.
    - Requires the stock ID in the URL path.

## How to Use

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/stock-price-view-app.git
   ```

2. **Install Dependencies:**

   ```bash
   cd stock-price-view-app
   npm install
   ```

3. **Run the Data Script:**

   ```bash
   node data-script.js
   ```

4. **Start the Server:**
   ```bash
   node server.js
   ```
   The server will be running at http://localhost:3000 by default.

## Dependencies

- Node.js
- Express.js
- (Other dependencies listed in `package.json`)

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Special thanks to the Bombay Stock Exchange (BSE) for providing the data.

Feel free to customize this readme according to your specific project details and requirements.
