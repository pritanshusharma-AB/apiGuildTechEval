# Consumer Loyalty Backend

A demo NestJS application for testing API guild engineers during the hiring process. This backend application uses a PostgreSQL database via a local Docker setup. Candidates can pull the repo, spin up a database, start the app, and build out feature requests so we can observe their general computer skills, test development knowledge, and fitness for the role during a 1:1 in-person pair programming session.

## Running Locally

1. add .env file based off .env-sample
1. install nodejs using [NVM](https://formulae.brew.sh/formula/nvm)
1. switch to correct node version using NMV `nvm use`
1. install node_modules `npm install`
1. install [Rancher desktop](https://formulae.brew.sh/cask/rancher) for running Docker containers
1. start fresh db containers `npm run db:restart`. shuts down existing dbs and restarts clean
1. run db migrations `npm run db:migration:run`
1. optionally, seed data `npm run db:seed`
1. run nestjs app `npm run start:debug`
1. open in browser at `http://localhost:3000/graphql`
1. to reset db to fresh, migrate, and run seeds `npm run db:reset`
1. to add a new migration based off entities `npm run db:migration:generate -- -n src/db/migrations/[filename]`

## Business Challenge

To increase sales and popularity of our products, we would like to build out a consumer loyalty program where consumers earn points for their purchases of eligible products. This system tracks purchases at participating retailers nationwide, and credits customer accounts with points that they can later redeem for merchandise or other prizes. Data on customers, products, retailers, and promotions are managed by our company, but data about purchases comes directly from retailer point-of-sale systems via an API call to our consumer-loyalty-backend.

## Deliverables

When a customer purchases a promoted product, the store's POS terminal sends a request to the backend. Your job is to implement:

1. GraphQL Purchase Mutation — Receives a purchase event and credits loyalty points if the product qualifies:
   - Customers receive points based on the award_rate of the current promotion per dollar spent on a qualifying product
   - Prevent double crediting if the same purchase is submitted twice
   - Update the customer's point balance atomically
   - Make as robust as possible--this is your chance to show your skills!

## Assumptions

- 1 product per purchase per retailer per customer
- All retailers carry all products
- Products and retailers won't change
- Millions of purchase requests could come in per hour, concurrently

## DB Schema

<img src="src/db/dbdiagram.png" />

## 💡 NestJS Basics You Might Need

https://docs.nestjs.com/first-steps
<br/>@Controller() for routing
<br/>@Post(), @Get() to define endpoints
<br/>@Body() to read request bodies
<br/>@Injectable() service with depedency injection
<br/>@Entity() + @PrimaryGeneratedColumn() for DB models
<br/>@IsString(), @IsNotEmpty() for validation with class-validator