## Payment Gateway 
### RazorPay
1. Order Created in System 
2. PayNow Button Clicked : Get Razore Order Id
    - Request : order_token 
    - Server : 
4. 

## Booking System
### 1. Checkout Without Login
CHECKOUT PAGE : order items, user info & address
    = cart items fetch : with price calcualtion
    = checkout button clicked 
    = Login Process
        i. if email_phone==Notregistered : account created & auto login without verify    
        ii. if email==registed || email==phone_no : Force User to Login or Change the email || phone_no by popoup
                    - Login Popup : 
                            First Step :
                                We have found email and phone no. in our server, Please login and Proceed to Order Booking
                                - Login By Email With OTP 
                                - Login By Email With Password 
                                - Login By Phone No. With Password
                                - Cancel, I will change Email and Phone No. (It will close the popup )
                            Second Step :
                                - Form : of above inputs 
    = server response ...
    = Then Step 2 with cartAddress Variable
### 1.1 Checkout With Login
 order items, & address
    = cart items fetch : with price calcualtion
    = Delivery Address : auto fillup
    = checkout button clicked 
    = server response ..
    = Then Step 2 with cartAddress Variable 

2. Order Summary Page  :
    - Address in Memory
    - Order Items in LocalStorage
    - Place Order button clicked
    - Order Save in DB & Return Token
    - Then Step 3 with token in url

3. Payment Page 
    - fetch Payment Method
    - Then Step 4 : with token
    3.1 Payment Method: COD
            - 
    - 
4. Invoice  
    = if Success
        - Notify to Admin
        - order info send to email
        - Order Details Display
        - Invoice Download Display
        - 
    = if failed
        - Order Details Display
        - Retry Payment Button : it will redirect to Step 3
        - Cancel Button



********************** PRODUCT PRICE STRUCTURE  **********************
1. Product Base Price = 200 
2. Discount 20% : only for UI only, do not show in tax invoice etc. everywhere....

--- Internal System --- 
Base price              = 200 (Input By Admin)
GST @18%                = 36
-----------------------------
Product price (GST)     = 236 

==== Below Calculate on Product Price On Checkout Time===
Coupon 0%               = 0
Shipping                = + 0
------------------------------
Final Payable           = 236
[New Price] = 236 rs. 
[Old Price] = 236 + 10% Discount = 259.6 rs. - Strike Price : UI Displaying only...

--- USER DISPLAYED ---
Price Details
--------------------------------
Product Price        ₹259.60
Discount             -₹23.60
--------------------------------
Subtotal             ₹236.00
Coupon               -₹0
Shipping             ₹0
--------------------------------
Amount Payable       ₹236.00
(Inclusive of GST)

********************** END PRODUCT STRUCUTRE **********************

## Site Pending Work 
1. Order Book System
2. Track System
3. User Panel:Like Amzone/Flipkart
    - Login Page
        - Login with Registered Gmail
        - Email Login With OTP 
        - Mobile Number Login With OTP 
        - Email/Mobile Login with Password 
        - Forget Password by Email/Mobile Number  
    - Order List
    - Profile
    - Logout
    - Change Password
    - Two Factor Authentication : Applicable only with Password Login -- Email, Phone Number
4. View Product 
    - Popup : details all 
    - Product Page : for seo
    - Multi Product Images

-- Pages --
2. About Page 
3. Careers 
4. Blogs
5. Contact us



## Admin Panel
1. Dashboard : Total Order, Total Cancelled Orders Total New Order, Total Delivered Order, Total Pending Order. Total Return Order, Total Users, Total New Users, Total Income, Total Pending Incomes
2. Orders
    - Delivered Orders
    - New Orders : which yet not seen yet
    - Pending Orders
    - Cancelled Orders
3. User List
    - New Users
    - Active Users
    - InActive Users
4. Enquiry Form
    - Contact Form
    - Career Form
5. Admin List
6. My Profile
7. Change Password
8. Logout
9. Login Page
    - Username With Password Login
    - Two Factor Authentication : Applicable only with Password Login -- Email, Phone Number

=== Information Push to Github === 
1. MYSQL Library...
     - Update whereAnyLiks &  whereLike, whereIn
2. useCart