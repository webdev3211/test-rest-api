# Test Rest api for uploading dog pics

## Base URL

http://localhost:3000/api/dogs


## Overview

This API allows you to upload, delete, update, and fetch dog images. It also provides an endpoint to list all uploaded images.

## Getting Started

To get this API up and running, follow these steps:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: Node.js comes with npm (Node Package Manager). You’ll use npm to install the necessary dependencies.

### Setup

1. **Clone the Repository**

   If you haven’t already, clone the repository to your local machine:

   ```bash
   git clone https://github.com/webdev3211/tushar-test-assignment.git
   cd tushar-test-assignment
   npm install



## Endpoints

### 1. Upload a Dog Image

- **Endpoint:** `/upload`
- **Method:** `POST`
- **Description:** Uploads a dog image to the server.
- **Form Data:**
  - **Field:** `dog`
  - **Type:** `file`
- **Responses:**
  - **Success (201):**
    ```json
    {
      "success": true,
      "message": "File uploaded successfully",
      "id": "filename.ext"
    }
    ```
  - **Error (400):**
    ```json
    {
      "success": false,
      "error": "No file uploaded."
    }
    ```

### 2. Delete a Dog Image

- **Endpoint:** `/delete/:id`
- **Example:** `/delete/dog1.jpg`
- **Method:** `DELETE`
- **Description:** Deletes a dog image by its filename.
- **URL Parameters:**
  - **Parameter:** `id`
  - **Type:** `string`
  - **Description:** The filename of the image to delete.
- **Responses:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "message": "File deleted successfully"
    }
    ```
  - **Error (404):**
    ```json
    {
      "success": false,
      "error": "File not found"
    }
    ```
  - **Error (500):**
    ```json
    {
      "success": false,
      "error": "Something went wrong while deleting the file"
    }
    ```

### 3. Update a Dog Image

- **Endpoint:** `/update/:id`
- **Example:** `/update/dog1.jpg`
- **Method:** `PUT`
- **Description:** Updates an existing dog image by replacing it with a new one.
- **URL Parameters:**
  - **Parameter:** `id`
  - **Type:** `string`
  - **Description:** The filename of the image to replace.
- **Form Data:**
  - **Field:** `dog`
  - **Type:** `file`
- **Responses:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "message": "File updated successfully",
      "id": "newfilename.ext"
    }
    ```
  - **Error (400):**
    ```json
    {
      "success": false,
      "error": "No file uploaded."
    }
    ```
  - **Error (500):**
    ```json
    {
      "success": false,
      "error": "Error updating file."
    }
    ```

### 4. Fetch a Dog Image

- **Endpoint:** `/:id`
- **Example:** `/dog1.jpg`
- **Method:** `GET`
- **Description:** Fetches a dog image by its filename.
- **URL Parameters:**
  - **Parameter:** `id`
  - **Type:** `string`
  - **Description:** The filename of the image to fetch.
- **Responses:**
  - **Success (200):** Returns the image file.
  - **Error (404):**
    ```json
    {
      "success": false,
      "error": "No such file exists"
    }
    ```

### 5. Fetch a List of Uploaded Dog Images

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Retrieves a list of uploaded dog images.
- **Responses:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "message": "List of uploaded dog images",
      "files": [ "image1.jpg", "image2.jpg",]
    }
    ```
  - **Error (500):**
    ```json
    {
      "success": false,
      "error": "Error fetching file list."
    }
    ```



## Test cases
Run `npm test`