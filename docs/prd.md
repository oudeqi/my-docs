
# 巴厘岛旅游局app需求文档
-------------------------------------------


## 介绍
巴厘旅游局是巴厘旅游局在Android平台上的官方平台。帮助巴厘游客游览巴厘的网站，比如寻找有趣的景点，风景名胜区等活动。
-------------------------------------------


## 平台
1. Android
2. Website
3. CMS
4. Server
-------------------------------------------


## 语言
英语
-------------------------------------------


## Website
1. Landing Page //首页
``` bash
a) Banner
b) Category
c) Top Product List
```
2. Login
3. Register
4. Forgot Password
5. Search
6. Attraction Screen //吸引力
7. Restaurant Screen //餐厅
8. Tour Package Screen //旅行包
9. Transportation Screen //交通运输
10. Notification //通知
11. My Booking //我的预定
12. My Profile //我的个人资料
``` bash
a) My Review //我的评论
b) My Bookmark //我的书签
c) Settings //设置
```
13. Be a reseller //是一个经销商
-------------------------------------------


## CMS
1. Admin Management //超级管理员
``` bash
a) Create/Delete account to access CMS //创建/删除访问CMS的帐户
```
2. Splash Management //启动图片管理
``` bash
a) Add Splash Image
b) Splash Image List
c) Remove Splash Image
```
3. User Management //用户管理
``` bash
a) Created Time //创建的时间
b) Username
c) Profile picture //大头贴照
d) Email address
e) Phone number (if any)
f) Change Password
g) “Delete User” button
```
4. Reseller Management //经销商管理
``` bash
a) Username
b) Profile picture
c) Email address
d) Phone number
e) Reseller Data (provided by BTB side) //经销商数据
f) Change Password
g) “Verified” button //“已验证”按钮
h) “Not Verified” button //“未验证”按钮
i) “Delete Reseller” button //“删除经销商”按钮
```
5. Merchant Management //爱好者/商人管理
``` bash
a) Username
b) Profile picture
c) Email address
d) Phone number
e) Merchant Data (provided by BTB)
f) Change Password
g) “Verified” button
h) “Not Verified” button
i) “Delete Merchant” button
```
6. Product Management //产品管理
``` bash
a) Created Time
b) Picture
c) Name
d) Category
e) Location
f) Price
g) Info/Description //信息描述
h) Merchants Name //商家名称
i) Ratings //收视率
j) Reviews //评论
k) “Add Products” button
l) “Delete Products” button
```
7. Top Product Management //顶级产品管理
``` bash
a) Top products list
b) Add top products
c) Remove top products
```
8. Transaction Management //事务管理
``` bash
a) Username
b) Product Name
c) Quantity //量
d) Category //类别
e) Price
f) Account Type (Reseller/User/Merchant) //账户类型（经销商/用户/商人）
g) Booking person name (on behalf of who) //预订人名（代表谁）
h) Booking person contact number //预订人联络号码
i) Booking person Pickup Time (Transportation) //订舱时间(交通运输)
j) Booking person Pickup Location(Transportation) //订舱位(交通运输)
k) Total person(Transportation) //总人数（运输）
l) Notes(Transportation)
```
9. Review Management //评论管理
``` bash
a) Product Name
b) User Name
c) Review Content
d) Comment (if any)
e) Photos
f) Ratings
g) “Delete comment” button
h) “Delete Review” button
```
-------------------------------------------


## Merchant Role (This is all the access that merchant will get in backend)//商家角色（这是商家在后端得到的所有访问）
1. Add Products //添加产品
``` bash
a) Input Picture (min 1 pics, max 6 pics)//输入图片（最小1张图片，最大6张图片）
b) Input Name of the product //产品的输入名称
c) Input Category (Attraction, Tour Package, Restaurant, Transportation)//输入类别（景点，旅游包，餐馆，交通）
d) Input location //输入位置
	i. Open Map to tag location//打开地图标记位置
e) Price
	i. Price for user //用户价格
	 --Input price
	 --Select date
	ii. Price for reseller (optional)//经销商价格（可选）
	 --Input price
	 --Select date
f) Info/Description//信息描述
```
2. Edit/Delete Products //编辑/删除产品
``` bash
a) Edit/Delete Picture (min 1 pics, max 6 pics)
b) Edit/Delete Name of the product
c) Price
	i. Price for user
		--Input price
		--Select date
	ii. Price for reseller (optional)
	 --Input price
	 --Select date
d) Info/Description
```
3. Product List
``` bash
a) Product List
	i. Name
	ii. Picture
	iii.Category
	iv.Location
	v. Price
	vi.“Top products” label//“顶级产品”标签
	vii. Pay to be top products --> Tap to go to “payment option page”//付费成为顶级产品——点击进入“支付选项页面”
		--Cash, Credit Card, PayPal//现金、信用卡、贝宝
b) Product Details //产品详情
	i. Picture
	ii. Name
	iii.Category
	iv.Location
	v. Review
	vi.Price
	vii. Info/Description
```
4. Notification/Inbox //通知/收件箱
``` bash
a) Order Notification --> Tap to go to order page details//订单通知>点击转到订单页面详细信息
```
5. Review
``` bash
a) Review List
	i. Username
	ii. User Profile Picture
	iii.Date
	iv.Review Content
	v. Photos (if any)
b) Review Details //审查细节
	i. Username
	ii. User Profile Picture
	iii.Date
	iv.Review Content
	v. Review Rating
	vi.Photos (if any)
	vii. Write comment
		--Comment box
		--“Post comment” button
```
6. Order //订单
``` bash
a) My Order List
	i. Product Name
	ii. Product Picture
	iii.Booking Person Name
	iv.Booking person name
	v. Booking person contact number
	vi.Departure Time (if any)\//偏离的时间（如果有）
b) Order Page Details
	i. Product Name
	ii. Product Picture
	iii.Category
	iv.Price
	v. Departure Date (if any)
	vi.Quantity //量
	vii. Booking person name (on behalf of who)
	viii. Booking person contact number
	ix.Booking person Pickup Time (Transportation)
	x. Booking person Pickup Location(Transportation)
	xi.Total person(Transportation)
	xii. Notes(Transportation)
```
-------------------------------------------


## Android
1. Splash Screen
``` bash
a) Launches every time the app opens
```
2. Welcome Screen
``` bash
a) Shows when first install app/clear data
```
3. Login Screen
``` bash
Account Type: User/Reseller/Merchant
a) Login by email address
	i. Input email address
	ii. Input password
	iii. “Login” button --> go to homepage screen
b) Login by facebook
	i. Authorized facebook account
	ii. Go to homepage screen
c) “Forgot password” button --> go to Forgot Password screen
d) “Register” button --> go to Register screen
```
4. Register Screen
``` bash
a) Input user name (at least 3 characters, alphabets and numbers only)
b) Upload profile picture
c) Input email address
d) Input verification code (user needs to put in verification code sent to their email address)
	i. Send another verification code button (after 60s)
e) Input phone number (not mandatory)
f) Input password
g) Confirm password (must be the same as Input password)
h) “Register” button --> go to homepage screen
i) “Back to Login” button (go back to Login screen)
```
5. Forgot Password Screen
``` bash
Page 1:
	a) Input email address
Page 2:
	b) Input verification code (user needs to put in verification code sent to their email)
	c) Send another verification code button (after 60s)
Page 3:
	d) Set new password
	e) Confirm new password (must be the same as Set new password)
	f) Confirm reset button
```
6. Homepage screen
``` bash
a) Search --> go to search page
b) Current Location (Google Maps)
c) Top Product List (managed by CMS) --> tap one of the list and go to page
details
	i. Pictures
	ii. Name
	iii. Location
	iv. Category (Attraction/Restaurant/Tour Package)
	v. Distance
	vi. Price
d) Attraction --> go to attraction page screen
e) Restaurant --> go to Food Package page screen
f) Tour Package --> go to tour package page screen
g) Transportation (Car Rental/Driver) --> go to transportation page screen
```
7. Search Page Screen
``` bash
a) Search Box (search by name)
b) “Search” button --> go to search result page
c) Search History
	i. Shows list of past searches below the Search Box (max 5 results)
```
8. Search Result Page (searching on title)
``` bash
a) Filter Category
	i. Attraction
	ii. Restaurant
	iii. Tour Attraction
	iv. Transportation
b) Sort by:
	i. By name (ascending/descending)
	ii. By type (attraction/restaurant/tour package)
	iii. By price (lowest/highest)
c) Search List (20 results/page) --> Top products related to the search will be shown first at the top
	i. Picture
	ii. Name
	iii. Location
	iv. Category (attraction/restaurant/tour package/transportation)
	v. Price
```
9. Attraction Screen
``` bash
a) Attraction List
	i. Pictures
	ii. Name of the attraction
	iii. Location
	iv. Attraction (Label)
	v. Price/Pax
b) Attraction Page Details
	i. Main picture
	ii. Name of the attraction
	iii. Location
	iv. Attraction (Label)
	v. Price/Pax
	vi. Info/description
	vii. Open time
	viii. Merchant Name (click to see all of merchant’s products)
	ix. Call (button to call directly)
	x. Whatsapp (button to go directly to whatsapp)
	xi. “Bookmark” button (button to add to My Bookmarks)
	xii. “Add Review” button (button to go to ‘Write your review’ page)
		--Write your review page
			-Input review field
			-Add photos(min 0 pics, max 6 pics)
			-“Post review” button
	xiii. Share (Facebook and Copy Link)
	xiv. Read all reviews (show total review count, click to see All reviews page)
		--All reviews page (show list of all available reviews from the users)
			-Review
				_Profile picture
				_Display name
				_Date of the review
				_User’s review content
				_Comment (from merchant) (only merchant that can comment the reviews)
	xv. “Book Now” button --> go to make a booking page
		--Make a booking page
			-Choose date (Calendar Price)
			-Quantity
			-Input name (on behalf of who)
			-Input contact number
			-Book button --> Payment Page
		--Payment page
			-Select Payment
				_Credit card
				_Cash
				_Paypal
			-After user books successfully, system will generate booking number, user will get email regarding the booking details
```
10.Food Package Screen
``` bash
a) Food Package List
	i. Pictures
	ii. Name of the Food Package
	iii. Location
	iv. Restaurant (Label)
	v. Price/Pax
b) Food Package Page Details
	i. Main picture
	ii. Name of the Food Package
	iii. Location
	iv. Restaurant (Label)
	v. Price/Pax
	vi. Info/description
	vii. Open time
	viii. Merchant Name (click to see all of merchant’s products)
	ix. Call (button to call directly)
	x. Whatsapp (button to go directly to whatsapp)
	xi. “Bookmark” button (button to add to My Bookmarks)
	xii. “Add Review” button (button to go to ‘Write your review’ page)
		--Write your review page
			-Input review field
			-Add photo (min 0 pics, max 6 pics)
			-“Post review” button
	xiii. Share (Facebook and Copy Link)
	xiv. Read all reviews (show total review count, click to see All reviews page)
		--All reviews page (show list of all available reviews from the users)
			-Review
				_Profile picture
				_Display name
				_Date of the review
				_User’s review content
				_Comment (from merchant) (only merchant that can comment the reviews)
	xv. “Book Now” button --> go to make a booking page
		--Make a booking page
			-Quantity
			-Input name (on behalf of who)
			-Input contact number
			-Book button --> Payment Page
		--Payment page
			-Select Payment
				_Credit card
				_Cash
				_Paypal

		--After user books successfully, system will generate booking number, user will get email regarding the booking details
```
11.Tour Package Screen
``` bash
a) Tour Package List
	i. Pictures
	ii. Name of the Tour Package
	iii. Location
	iv. Tour Package (Label)
	v. Price/Pax
b) Tour Package Page Details
	i. Main picture
	ii. Name of the Tour Package
	iii. Location
	iv. Tour Package (Label)
	v. Price/Pax
	vi. Info/description
	vii. Open time
	viii. Merchant Name (click to see all of merchant’s products)
	ix. Call (button to call directly)
	x. “Bookmark” button (button to add to My Bookmarks)
	xi. “Add Review” button (button to go to ‘Write your review’ page)
		--Write your review page
			-Input review field
			-Add photo (min 0 pics, max 6 pics)
			-“Post review” button
	xii. Share (Facebook and Copy Link)
	xiii. Read all reviews (show total review count, click to see All reviews page)
		--All reviews page (show list of all available reviews from the users)
			-Review
				_Profile picture
				_Display name
				_Date of the review
				_User’s review content
				_Comment (from merchant) (only merchant that can comment the reviews)
	xiv. “Book Now” button --> go to make a booking page
		--Make a booking page
			-Choose Date (Calendar Price)
			-Quantity
			-Input name (on behalf of who)
			-Input contact number
			-Book button --> Payment Page
		--Payment page
			-Select Payment
				_Credit card
				_Cash
				_Paypal
			-After user books successfully, system will generate booking number, user will get email regarding the booking details
```
12.Transportation Screen
``` bash
a) Transportation List
	i. Pictures
	ii. Name of the Transportation
	iii. Location
	iv. Transportation (Label)
	v. Price/Pax
b) Transportation Page Details
	i. Main picture
	ii. Name of the Transportation
	iii. Location
	iv. Transportation (Label)
	v. Price/Pax
	vi. Info/description
	vii. Open time
	viii. Merchant Name
	ix. Call (button to call directly)
	x. Whatsapp (button to go directly to whatsapp)
	xi. “Bookmark” button (button to add to My Bookmarks)
	xii. “Add Review” button (button to go to ‘Write your review’ page)
		--Write your review page
			-Input review field
			-Add photo (min 0 pics, max 6 pics)
			-“Post review” button
	xiii. Share (Facebook and Copy Link)
	xiv. Read all reviews (show total review count, click to see All reviews page)
		--All reviews page (show list of all available reviews from the users)
			-Review
				_Profile picture
				_Display name
				_Date of the review
				_User’s review content
				_Comment (from merchant) (only merchant that can comment the reviews)
	xv. “Book Now” button --> go to make a booking page
		--Make a booking page
			-Choose Date (Calendar Price)
			-Quantity
			-Input name (on behalf of who)
			-Input Pickup Time
			-Input Pickup Location
			-Input total person
			-Notes
			-Input contact number
			-Book button --> Payment Page
		--Payment page
			-Select Payment
				_Credit card
				_Cash
				_Paypal
			-After user books successfully, system will generate booking number, user will get email regarding the booking details
```
13.Menu Bar
``` bash
a) Homepage
b) My Bookings
	i. My Bookings List
		--booking number
		--Name
		--Departure Date (if available)
		--Price
		--Status
		--“Cancel Booking” button
	ii. My Bookings List
		--Status
		--Price
		--“Write Review” button
		--booking number
		--Name of the products booked
		--Category (Attraction/Restaurant/Tour Package/Transportation)
		--Departure Date (if available)
		--Quantity
		--Product Details
		--Terms & Conditions
		--Location
		--Name (on behalf of who)
		--Total person (booked for how many people) (if available)
		--Contact number
		--Call (button to call directly)
		--Whatsapp (button to go directly to whatsapp)
		--Cancel Booking
c) Notification/Inbox
	i. Booking Notification
	ii. Promo Notification
d) My Account
	i. Profile Picture
	ii. Display Name
	iii. Verify Phone Number
		--Input phone number
		--Input verification code
		--Send another verification code button
	iv. My Bookmarks
		--Picture
		--Name
		--Location
		--Category (attraction/restaurant/tour package)
		--Price
	v. My Reviews
		--Picture
		--Name
		--Location
		--Type (attraction/restaurant/tour package)
		--My review
	vi. Settings
		--Change profile picture
		--Change display name
		--Change password
			-Input current password
			-Input new password
			-Confirm new password
			-Sign out
		--Contact Us
		--Terms of service
		--Rate us (depends on app market) : 2 weeks once
		--Be a reseller
			-To be a reseller, user needs to fill in some personal datas
			(will be provided by BTB side). After that, admins in CMS
			will verify the account. If the account verified, then reseller
			will received their reseller code. Reseller will be able to
			purchase products just like user, but reseller needs to input
			their reseller code when booking a product and get reseller
			price to buy the product. For the reseller, the booking page
			will be:

			-Attraction Booking Page
				_Choose Date (Calendar Price)
				_Quantity
				_Input name (on behalf of who)
				_Input contact number
				_Input User Email Address
				_Input Code
				_Book button --> Payment Page
			-Food Package Booking Page
				_Quantity
				_Input name (on behalf of who)
				_Input contact number
				_Input User Email Address
				_Input Code
				_Book button --> Payment Page
			-Tour Attraction Booking Page
				_Choose Date (Calendar Price)
				_Quantity
				_Input name (on behalf of who)
				_Input contact number
				_Input User Email Address
				_Input Code
				_Book button --> Payment Page
			-Transportation Booking Page
				_Choose Date (Calendar Price)
				_Quantity
				_Input name (on behalf of who)
				_Input Pickup Time
				_Input Pickup Location
				_Input total person
				_Notes
				_Input contact number
				_Input User Email Address
				_Input Code
				_Book button --> Payment Page
			-After reseller books successfully, system will generate
			booking number, and booking details will be sent to user
			email address as input in booking page, but the discount for
			the voucher will not be displayed inside the email.
```
NOTE: For merchant account, when merchant order a booking, he/she doesn’t have to go to
payment page, it can go directly to successful booking page. Later the booking details and
the bill will be displayed in CMS backend.