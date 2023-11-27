# Price Engine Express

This project aims to provide a solution for scenarios that require a system to process price data and give price recommendations.

## Problem Statement:
The goal is to create a pricing engine that determines the optimal price for our products. This engine should strike a balance between our need for profit and market competitiveness. We base our Cost of Goods Sold (COGS) data on supplier price lists and reverse bids, where suppliers submit multiple bids to secure contracts by offering the lowest possible prices. As the lead engineer, your task is to develop this pricing engine.

## The Formula
- `Product Price` = Purchase_Price + Margin
- `Purchase Price` = Average product price from the supplier

## The Solution
1. The `Price Engine` determines the purchase price from Logistic data.
2. Determine the `minimum margin`, `margin requested`, `margin current price`, and `margin from historical data`.
3. Compare all margins and choose the highest one that is not greater than the `product price requested` and not below the `minimum margin`.

## Prerequisites

Ensure the following are installed on your machine before starting:

- Node.js
- npm (Node Package Manager)
- Docker

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running the following command:

    ```shell
    npm install
    ```
4. Double-click the `createImageMysql.bat` file to create an instance of MySQL on the Docker environment.
5. Execute the `ddl.sql` file to generate the data structure and dummy data into the database.
6. Start the server by running the following command:

    ```shell
    node app.js
    ```
7. Open your browser and visit `http://localhost:3000` to access the application.
8. If you make any code changes that affect the application, you must close and rerun the application:

    ```shell
    node app.js
    ```

## Project Structure

The project is organized as follows:

- `app.js`: Entry point of the application.
- `models/`: Contains the data models for the application.
- `managers/` : Contains the application logic.
- `managers/PriceEngine.js` : The main object responsible for calculating and providing selling price recommendations.
- `ddl.sql` : Script to create a table and insert dummy data into the database.
- `createImageMysql.bat` : Script to run MySQL on Docker.
- `PriceEngine.postman_collection.json` : Postman collection file to test the API. You can import it into the Postman application.

## API Endpoints

The following API endpoints are available:

- `GET /price-suggestion?id=[productId]&price=[price requested]`: Get a selling price recommendation from PriceEngine.
        - `product id` : ID of Product Data
        - `Price` : Product Price that the customer offers in RFQ

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
