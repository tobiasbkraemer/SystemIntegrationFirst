README – Assignment 11b: Payment Integration
===========================================

Summary:
--------
This project integrates a payment solution using Stripe Checkout. 
Instead of building my own payment flow, I used Stripe’s hosted checkout page.
The solution fulfills the requirement of integrating with an *external* payment system.

Technologies Used:
------------------
- React (via Vite)
- Stripe Checkout
- npm / JavaScript

Why Stripe?
-----------
I chose Stripe because:
- It is free to use in test mode
- It is well-documented and quick to integrate
- Hosted checkout makes it possible to do everything from the frontend

Stripe Test Card:
-----------------
Card Number: 4242 4242 4242 4242  
Expiration: any future date (e.g. 12/34)  
CVC: 123  
ZIP: optional (e.g. 12345)

How I Built the Solution:
--------------------------

1. Setup Stripe:
   - Created a Stripe account (https://dashboard.stripe.com)
   - Created a product under "Products"
   - Generated a Payment Link (e.g. https://buy.stripe.com/test_XXXXXX)

2. Setup Project:
   - Created a new React app using Vite:

     npm create vite@latest 11b-payment -- --template react
     cd 11b-payment
     npm install

   - Installed Stripe’s client library:

     npm install @stripe/stripe-js

3. Stripe Integration:
   - In `App.jsx`, I used the Stripe SDK to redirect users to the checkout link:

4. Running the App:
   - Start development server:

     npm run dev

   - Open in browser: http://localhost:5173/

   - Click "Køb produkt" to test checkout

Screenshot suggestions (optional):
----------------------------------
- Payment page before and after test payment
- Stripe Dashboard showing the payment

Evaluation:
-----------
This solution shows how to integrate Stripe Checkout from a frontend-only setup. 
It fulfills the requirement of integrating with an external payment provider 
without manually building a payment backend.

Extras:
-------
- The solution uses test-mode only (no real payments)
- Can easily be extended with webhooks or backend verification if needed

