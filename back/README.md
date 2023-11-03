# Project Name

Brief project description or an introduction.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Prerequisites

Before getting started, make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (version X.X.X or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/antipaeorg1/prooviAPI.git
   cd prooviAPI

2. Install project dependencies:
    ```bash
   npm install

# Configuration

3. Create a .env file in the project root and configure your environment constants. Here's an example .env file
   . (add them in backend server environment variables, for postmark API key there is also hardcoded key in email
   controller, just needed to uncomment it, for JWT token this must be implemented)

PORT=3000 (app.listen(3000) is already implemented in app.js file)
JWT_ACCESS_TOKEN =
230f328cc3324aaa2e057944baeb9078f71be3ae2720ca7da048535d4e782e7656ffd709cbf1f42f64b4ab6b0ac27d376cb3dec0f6d699244ae2af63e5fc75fb
POSTMARK=960bc81d-d202-4403-9226-d16e335154ec

# Usage

4. Start the server

```bash
npm start


