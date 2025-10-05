Here’s a fleshed-out, professional-sounding version of your **README** that keeps your voice and purpose clear, while giving it a more complete structure:

---

# 🧭 Mini Explorer

**Mini Explorer** is a lightweight blockchain explorer built for the **Stacks network**.
It allows users to easily connect their **mainnet** or **testnet** wallets and view transaction details for any address.
The goal is to provide a simple and developer-friendly interface for exploring activity on Stacks without the complexity of a full-scale explorer.

---

## 🚀 Features

* **Wallet Connection:** Connect to either Stacks mainnet or testnet using the latest version of `stacks/connect`.
* **Address Lookup:** Search for any Stacks address and view its transaction history in real time.
* **Network Detection:** Automatically detects which network (mainnet or testnet) the user is connected to.
* **Responsive UI:** Built with modern web technologies for a clean and accessible experience.

---

## 🛠️ Tech Stack

* **[Hiro API](https://docs.hiro.so/api)** – for fetching blockchain data and transaction details.
* **[Stacks/Connect](https://stacks.js.org/)** – for wallet integration and user authentication.
* **[Next.js](https://nextjs.org/)** – framework for building fast, scalable frontend applications.
* **WalletConnect** – for seamless connection to Stacks-compatible wallets.

---

## 🧩 Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/Khemmie-Ray/Mini-Block-Explorer.git
   cd mini-explorer
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn 
   ```

3. Create a `.env.local` file and add your Hiro API endpoint if needed.
   Example:

   ```
   NEXT_PUBLIC_STACKS_API_URL=https://api.testnet.hiro.so
   ```

4. Run the development server

   ```bash
   npm run dev
   or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see the app in action.

