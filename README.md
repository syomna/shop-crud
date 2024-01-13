# Shop CRUD
This repository contains a Shop CRUD (Create, Read, Update, Delete) application built with Vite and TypeScript using React, Redux, Firebase, Google maps.

### Getting Started
To run the application locally, follow these steps:
Make sure you have Node.js installed on your machine.

Create a Firebase project from here: [Create](https://firebase.google.com/docs/web/setup)

Navigate to your project and enable JavaScript API: [Google cloud](https://console.cloud.google.com/)



### Installation
Clone the repository:

```bash
git clone <repository-url>
```
Navigate to the project directory:

```bash
cd shop-crud
```
Install dependencies:

```bash
npm install
```
Create .env file with the following variables: 
```python
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_GOOGLE_API_KEY=your_google_api_key
```
Running the Application
After completing the installation, you can run the application with the following command:

```bash
npm run dev
```
This will start the development server, and you can access the application in your web browser at http://localhost:5173/