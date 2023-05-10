# Amazonia API

(by: Adriano Anschau, to: Ateliware)

(email: adrianoanschau@gmail.com)

published on https://amazonia-api.up.railway.app/

## Made with

<img height="30" src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png" alt="VS Code" /> <img height="30" src="https://user-images.githubusercontent.com/25181517/186884159-4b5e122b-95de-4a32-b10b-7f6fdffa4c5a.png" alt="Linux Mint" /> <img height="30" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="Javascript"> <img height="30" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="Typescript"> <img height="30" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="NodeJS" /> <img height="30" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" /> <img height="30" src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest" />

## Run

To test this application on your machine, follow these steps:

1. Use `git clone https://github.com/adrianoanschau/amazonia` to make a copy of the project;
2. Access the API directory with `cd amazonia/amazonia-api`;
3. Install the project's dependencies with `yarn install`;
4. Create a file with the name `.env` and the following content:

```
APP_NAME='Amazon API'
HOST='0.0.0.0'
PORT=8080
DELIVERY_TIMES_API='https://mocki.io/v1'
DELIVERTY_TIMES_UPDATE_FREQUENCY=600 # in seconds
DELIVERY_TIMES_MAP_ROUTE='/10404696-fd43-4481-a7ed-f9369073252f'
```

5. To run in development mode, use the command `yarn start:dev`.
