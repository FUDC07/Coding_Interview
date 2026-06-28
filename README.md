**# Coding Interview Assessment**

**This repository contains the solutions for the coding interview assessment, covering algorithmic problem-solving (Python), API troubleshooting (Markdown), and a frontend e-commerce product page (React + TypeScript + Tailwind CSS).**

**## Folder Structure**

**- `TaskA/`: Mystic Waves problem solution (Python).**

**- `TaskB/`: CargoCraft Fleet problem solution (Python).**

**- `TaskC/`: Xero API written answers (Markdown).**

**- `FrontendTask/`: E-commerce Product Detail Page (React + Vite + Tailwind CSS).**

**---**

**##### Task A: Mystic Waves #####**

**### How to Run**

**1. Ensure you have Python 3.x installed on your system.**

**2. Open a terminal and navigate to the `TaskA` folder.**

**3. Run the script using the following command:**

&#x09;**```bash**

&#x09;**python A.py**
**4. Provide the input as specified in the prompt (e.g., number of test cases followed by x and n pairs).**



**Assumptions**



&#x20;   **The input is read from standard input (stdin) as plain text.**

&#x20;   **The output is printed to standard output (stdout), with each result on a new line.**

**#####  Task B: CargoCraft Fleet  #####**

**### How to Run**

**1. Ensure you have Python 3.x installed on your system.**

**2. Open a terminal and navigate to the TaskB folder.**

**3. Run the script using the following command:**

&#x20;   **```bash**

&#x20;   **python B.py**

**4. Provide the input as specified in the prompt (number of test cases followed by n values).**



**Assumptions**



&#x20;   **The input handles up to 10^18 propulsion units, utilizing Python's arbitrary-precision integer arithmetic to prevent overflow.**

&#x20;   **If the total n is an odd number or less than 4, it is impossible to form the fleet, hence -1 is returned.**



**#####  Task C: API Questions  #####**

**### How to View**



**Navigate to the TaskC folder and open the Task\_C\_answers.md file in any Markdown viewer or text editor to read the written answers regarding the Xero API scenarios.**

**##### Task D Frontend Task: E-commerce Product Detail Page #####**

**## How to Run**

1. **Ensure you have Node.js (v16 or higher) installed.**

**2. Open a terminal and navigate to the FrontendTask folder.**

**3. Install the necessary dependencies:**



&#x20;   **npm install**          

&#x20;       

**4. Start the development server:**



&#x20;   **npm run dev**



**5. Open your browser and visit the local URL provided in the terminal (usually http://localhost:5173).**



**Assumptions**



&#x20;   **Mock API Behavior: Since a real backend is not required, network latency is simulated using setTimeout (1000ms for fetching product details, 800ms for adding to cart).**

&#x20;   **Initial State: The page defaults to selecting the first available variant (Color and Size) upon loading.**

&#x20;   **Cart Count: The add-to-cart API response simulates an existing cart count of 3 items, incrementing upon each successful addition.**

&#x20;   **Stock Limits: If the user switches to a variant with lower stock than the currently selected quantity, the quantity automatically resets to 1.**

&#x20;   **Invalid Requests: The "Add to Cart" button is disabled if the current selected variant is out of stock.**









