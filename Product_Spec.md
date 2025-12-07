# Product Specification: ShadowOS

## 1. Product Overview
**ShadowOS** is a SaaS platform designed to bridge the gap between "Shadow Operators" and "Creators". It enables Operators to partner with Creators to manage and sell digital products, while automating revenue splits and financial management.

## 2. Core Features

### 2.1 Authentication & User Roles
- **System**: Supabase Authentication.
- **Method**: **Passwordless OTP (One-Time Password) via Email Magic Link**.
  - Users enter their email address only (no password field).
  - A 6-digit verification code is sent to their email.
  - Users enter the code to authenticate.
  - For testing: emails ending in `@example.com` use mock OTP `123456`.
- **Roles**:
    - **Shadow Operator**: Admin-like access, manages products, view global stats.
    - **Creator**: restricted access, views their own products and earnings.
    - **Customer**: (Implicit) purchases products.

### 2.2 Dual Dashboard
- **Operator Dashboard**:
    - Overview of all creators and products.
    - Total revenue analytics.
    - Management of revenue split configurations.
- **Creator Dashboard**:
    - Sales performance for their specific products.
    - Wallet balance and payout history.

### 2.3 Product Management
- **Digital Products**: Support for uploading and selling digital files.
- **Product Creation**:
    - Title, Description, Price.
    - Image Uploads (Supabase Storage bucket `product-media`).
    - File Uploads (Secure delivery).
- **Discovery**:
    - Landing page with trending products.
    - Search functionality with live suggestions.

### 2.4 Order & Financial System
- **Order Processing**: Track purchases and status.
- **Revenue Splits**:
    - Automatic calculation of earnings between Operator and Creator based on agreed percentage.
- **Wallet System**:
    - Balance tracking for each user (Operator/Creator).
    - Withdrawal request management.

## 3. Technical Architecture

### 3.1 Frontend
- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS v4.
- **Components**: Shadcn UI.
- **Icons**: Lucide React.

### 3.2 Backend & Database
- **Platform**: Supabase.
- **Database**: PostgreSQL.
- **Features**: 
    - Row Level Security (RLS) for data protection.
    - Real-time subscriptions for dashboard updates.
    - Storage for media files.

## 4. User Flows
1.  **Onboarding**: Users sign up/login. Operators invite Creators.
2.  **Listing**: Operator sets up a product for a Creator, defines split %.
3.  **Purchase**: Customer buys product. Payment is verified (Midtrans).
4.  **Distribution**: Revenue is split and added to respective Wallets. access to digital file is granted to Customer.

## 5. Future Roadmap
- Advanced Analytics.
- Multi-currency support.
- Automated payouts via payment gateway API.
