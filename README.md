# React + TypeScript

# QR & Barcode Generator Web Application

This is a web-based QR and Barcode Generator that allows users to create bulk QR codes and barcodes for various purposes, such as inventory management, product labeling, and marketing campaigns. Users can select the code type (QR or Barcode), configure the generation method (serial or random), and customize options like prefix, starting number, and quantity. Once the codes are generated, they can be downloaded as an Excel file.

## Features

-  **QR Code Generation**: Generate QR codes based on custom inputs (prefix, start number, quantity).
-  **Barcode Generation**: Generate barcode images in `CODE128` format.
-  **Bulk Code Generation**: Generate multiple QR codes or barcodes at once, with configurable parameters.
-  **Download Options**: Download the generated codes as an Excel file with embedded images of the codes.
-  **Customizable Inputs**: Prefix, starting number, and quantity of codes can be adjusted.

## Demo

-  You can try out a live demo of the application [here](https://qrandbar-code-generator.web.app/).

## Technologies Used

-  **Frontend**: React, TypeScript, Tailwind CSS, ExcelJS, QRCode, JsBarcode.

-  **Libraries**: FileSaver.js for file downloading, ExcelJS for working with Excel files.

## Installation

### Prerequisites

Make sure you have the following installed:

-  Node.js (version 18 or higher)
-  npm or yarn (package manager)

### Step-by-Step Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/smsohag32/qr-and-bar-code-generator.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd qr-barcode-generator
   ```

3. **Install dependencies**:

   If you're using npm:

   ```bash
   npm install
   ```

   Or if you're using yarn:

   ```bash
   yarn install
   ```

4. **Run the application**:

   To start the development server, use:

   ```bash
   npm start
   ```

   Or with yarn:

   ```bash
   yarn start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

### QR Code & Barcode Generation

1. **Select Code Type**: Choose between QR Code or Barcode generation from the dropdown menu.
2. **Choose Generation Method**: Select either **Serial** (incremental) or **Random** (unique random values).
3. **Prefix**: Optionally, add a prefix to the generated codes (e.g., `INV-`).
4. **Start Number**: Specify the starting number for serial generation.
5. **Quantity**: Set how many codes you want to generate (up to 1000).
6. **Generate Codes**: Click the "Generate Codes" button to generate the requested codes.
7. **Download Codes**: After the codes are generated, you can download them in an Excel file.

### Downloading the Codes

After generating the codes, you can download them as an Excel file, which includes the code and an image of the generated code (QR/Barcode).

### Example of Generated Excel File

The downloaded Excel file will contain the following columns:

-  **ID**: A unique identifier for each code.
-  **Code**: The generated code (QR or Barcode).
-  **Image**: The embedded image of the generated code.

--- End ---
