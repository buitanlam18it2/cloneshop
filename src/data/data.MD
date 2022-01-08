# Dummy Data for Amazon Clone

## Product Images

- https://ae01.alicdn.com/kf/Hb322d1c994334f0aa7fe8d09853b5a83v/Ngo-i-Tr-i-o-Gi-M-a-ng-o-Kho-c-Nam-D-y-m.jpg_q50.jpg

- https://ae01.alicdn.com/kf/H8968561ad9b9429ea6f21a7d06ee0993U/Ngo-i-Tr-i-o-Gi-M-a-ng-o-Kho-c-Nam-D-y-m.jpg_q50.jpg

- https://ae01.alicdn.com/kf/H1c217b078eea4eeb98ba6f702c61465b2/Ngo-i-Tr-i-o-Gi-M-a-ng-o-Kho-c-Nam-D-y-m.jpg_q50.jpg

- https://product.hstatic.net/1000369857/product/akk19__3__73bf817e66024169858ab524603b6060_1024x1024.jpg

- https://product.hstatic.net/1000369857/product/akk19__8__60f88fc1b3e84b29829bad2b58af2577.jpg

- https://product.hstatic.net/1000369857/product/z2832983793700_192e2f419a9a958e619eaf3b3539c26e_compressed_d10da87a521641949f731863e98e0b10.jpg

- https://product.hstatic.net/1000369857/product/z2844930117230_08b198438928bc3b13bceebf093ec7c2_compressed_03d7e9c85f8347838a2a80ea7da6cfcc.jpg

- https://product.hstatic.net/1000369857/product/z2857724688774_8d482a9a788d1e106e5c9f9b016ff84b_compressed_5d4222d9b380461195ebd148eca0d1ec.jpg

- https://product.hstatic.net/1000369857/product/z2806047533249_5ce48bceca03973fcdbc27bf70646817_ad025e3d9a544123b4a0e0becd54208e.jpg

- https://product.hstatic.net/1000369857/product/z2806047519790_81e09a96d4ff3ccbe064235b9862b7f9_ef7535e4ecf849e2b4ed3030f4d17fcc.jpg

- https://product.hstatic.net/1000369857/product/z2806047493210_51c1828e4930f32e58b8d4235ae3e011_c727d57445114b5fb38ec4520aac6b8d.jpg

- https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/mouse2.jpg

- https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/mouse3.jpg

## Files
- **products.ts**: A list of products having:
  - id
  - title
  - image
  - avgRating
  - ratings
  - price
  - oldPrice (optional)
- **product.ts**: Product details
  - id
  - title
  - *description*
  - image
  - *images* (array of images)
  - *options* (array if possible variation/options)
  - avgRating
  - ratings
  - price
  - oldPrice (optional)
- **cart.ts**: Items in the cart
  - id
  - item
  - quantity
  - option (selected option)