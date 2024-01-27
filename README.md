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

- **GET /stocks/Top10:**

  - Returns information for the top 10 stocks.

- **GET /stocks/stockname/:name:**

  - Finds stocks by name.

- **GET /stocks/stockhisory/:name**

  - Retrieves the stock price history list for UI graph for a particular stock name.

- **POST /favorites/add:**

  - Adds a stock to favorites.

    - Requires a JSON body with the stock information.
      <br>
      id here represents the unique identification for each user.

    ```json
    {
      "id": "XYZ123",
      "name": "Example Stock"
    }
    ```

- **GET /favorites/getfavourite/:id:**

  - Retrieves the list of favorite stocks for particular user having a specific id.

- **DELETE /favorites/delete**

  - Removes a stock from favorites.

    - Requires a JSON body with the stock information.
      <br>
      id here represents the unique identification for each user.

    ```json
    {
      "id": "XYZ123",
      "name": "Example Stock"
    }
    ```

## How to Use

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/stock-price-view-app.git
   ```

   Get to the directory.

   ```bash
   cd stock-price-view-app
   ```

2. **Install Mysql server in your system:**
   You can follow the tutorial <a href="https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04">here</a> for Ubuntu.

3. **Make python environment:**
   <br>
   Here name of the env is fetch_env

   ```bash
   python3 -m venv fetch_env
   ```

4. **Activate the python environment**

   ```bash
   source fetch_env/bin/activate
   ```

5. **Install python dependecies:**

   ```bash
   pip install requests pandas mysql-connector-python python-dotenv
   ```

6. **Add a .env file**
   <br>
   Add the username and password of your MySql account.

   ```bash
   MYSQL_HOST=localhost
   MYSQL_USER='USERNAME'
   MYSQL_PASSWORD='PASSWORD'
   MYSQL_DATABASE=equity_data
   MYSQL_TABLE=bhavcopy
   ```

7. **Run the python Script:**
   <br>
   fetch.py script will get data from <a href="https://www.bseindia.com/markets/MarketInfo/BhavCopy.aspx">BSE</a> and store it into MySQL database.

   ```bash
   python3 fetch.py
   ```

   You can pass the argument while executing the script to fetch for last N days.
   <br>
   Example:

   ```bash
   python3 fetch.py 5
   ```

8. **Install Dependencies:**
   Run

   ```bash
   npm install
   ```

   inside the stock-price-view-app directory.

9. **Start the Server:**
   ```bash
   node app.js
   ```
   The server will be running at http://localhost:5005 by default.

## Dependencies

- Node.js
- Express.js
- (Other dependencies listed in `package.json`)

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Special thanks to the Bombay Stock Exchange (BSE) for providing the data.
