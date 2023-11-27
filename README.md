# Price Engine Express

This project is solution for the problem that need system to process price data and provide price recommendation. 

## Problem Statement:
For this case, let’s attempt to build a pricing engine that can determine the optimal price for our products, balancing our need for proﬁtability with the need to remain competitive in the market.
Let’s assume that we are obtaining our cost of goods sold (COGS) data from supplier price lists and reverse bids, where suppliers submit multiple bids to secure contracts by oering the lowest possible prices. You are the Engineer that is tasked to lead the development of this pricing engine.

## The Formula
`Product Price` = purchase_price +  margin 
`Purchase Price` = average prouct price from supplier

## Prerequisites

Before getting started, make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running the following command:

    ```shell
    npm install
    ```

4. Start the server by running the following command:

    ```shell
    node app.js
    ```

5. Open your browser and visit `http://localhost:3000` to access the application.
6. if you fix or change the code to get impact in the application you must close the application then run it again
    ```shell
        node app.js
    ```

## Project Structure

The project structure is organized as follows:

- `app.js`: Entry point of the application.
- `models/`: Contains the data models for the application.
- `managers/` : Contain the Logic for the application.
- `PriceEngine` : main object who resposible to calculate and get Selling Price recommendataion 
- `ddl.sql` : Script to create table and inject data dummy on database
- `createImageMysql` : Script to running MySQL on Docker
- `PriceEngine.postman_collection.json` : file collection Postman for testing the API, you can import it on postman application


## API Endpoints

The following API endpoints are available:

- `GET /price-suggestion?id=[productId]&price=[price requested]`: Get selling price recomendation from PriceEngine

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

