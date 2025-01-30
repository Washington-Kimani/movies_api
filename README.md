# This is a movies API
This API provides information about movies, actors, directors, and genres.
## Getting Started
To get started, you can clone this repository and run the API using the following commands:
```bash
git clone https://github.com/Washington-Kimani/movies_api.git
cd movies_api
npm install
npm run dev
```
This will start the development server on `http://localhost:5000`.
<br/>
<br/>
* The base URL of the API is `http://localhost:5000/api`.
* <b>Note:</b> The API uses JWT authentication. To access the API, you need to provide a valid JWT token in the `Authorization` header of the request. You can get a JWT token by logging in or registering.
* For login the link is `http://localhost:5000/api/auth/login`
* For register the link is `http://localhost:5000/api/auth/register`
* 
## Environment Variables
This API uses the following environment variables:
- `PORT` - The port to run the API on (default: 5000)
- `MONGODB_URI` - The URI of the MongoDB database to connect to (default: `mongodb://localhost:27017/movies`)
- `JWT_SECRET` - The secret key to use for JWT authentication (default: `secret`)
- `CLOUDINARY_CLOUD_NAME` - The Cloudinary cloud name to use for image uploads (default: `your_cloud_name`)
- `CLOUDINARY_API_KEY` - The Cloudinary API key to use for image uploads (default: `your_api_key`)
- `CLOUDINARY_API_SECRET` - The Cloudinary API secret to use for image uploads (default: `your_api_secret`)
## Endpoints
- `/movies` - Get all movies
- `/movies/id` - Get a specific movie by ID
- `/movies/search?q=The Dark Knight` - Search for movies by title
- `/actors` - Get all actors
- `/actors/id` - Get a specific actor by ID
- `/actors/search?q=Chris Hemsworth` - Search for actors by name

## Usage
You can first use the data in the json files to create the first few entries. If you're using mongoDB, use the MongoDB Compass to import the data. This is possible for atlas as well.
</br>
</br>
To use this API, you can make a GET request to the appropriate endpoint with the appropriate ID. For example, to get all movies, you can make a GET request to `/movies`. To get a specific movie by ID, you can make a GET request to `/movies/{id}`.
## Example
Here's an example of how to use the API to get all movies:

```javascript
fetch('http://localhost:5000/api/movies')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

This will make a GET request to `http://localhost:5000/api/movies` and return all movies in the response. The response will be in JSON format, so we can parse it using the `json()` method. The `then()` method is used to handle the response and log the data to the console. If there is an error, the `catch()` method will handle it and log the error to the console.
You can replace `http://localhost:5000/api/movies` with the appropriate endpoint and ID to get the data you need.
