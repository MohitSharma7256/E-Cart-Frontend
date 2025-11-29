import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const EditProfilePage = lazy(() => import("./pages/EditProfilePage"));
const SaveAddress = lazy(() => import("./pages/SaveAddress"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.js"));
const FeaturePage = lazy(() => import("./pages/FeaturePage.jsx"));
const TestimonialPage = lazy(() => import("./pages/TestimonialPage.jsx"));
const AdminHomePage = lazy(() => import("./pages/Admin/AdminHomePage.jsx"));
const AdminMaincategoryPage = lazy(() => import("./pages/Admin/MainCategory/AdminMaincategoryPage.jsx"));
const AdminMaincategoryCreatePage = lazy(() => import("./pages/Admin/MainCategory/AdminMaincategoryCreatePage.jsx"));
const AdminMaincategoryUpdatePage = lazy(() => import("./pages/Admin/MainCategory/AdminMaincategoryUpdatePage.jsx"));
const AdminSubcategoryPage = lazy(() => import("./pages/Admin/SubCategory/AdminSubcategoryPage.jsx"));
const AdminSubcategoryCreatePage = lazy(() => import("./pages/Admin/SubCategory/AdminSubcategoryCreatePage.jsx"));
const AdminSubcategoryUpdatePage = lazy(() => import("./pages/Admin/SubCategory/AdminSubcategoryUpdatePage.jsx"));
const AdminBrandPage = lazy(() => import("./pages/Admin/Brand/AdminBrandPage.jsx"));
const AdminBrandCreatePage = lazy(() => import("./pages/Admin/Brand/AdminBrandCreatePage.jsx"));
const AdminBrandUpdatePage = lazy(() => import("./pages/Admin/Brand/AdminBrandUpdatePage.jsx"));
const AdminFeaturePage = lazy(() => import("./pages/Admin/Feature/AdminFeaturePage.jsx"));
const AdminFeatureCreatePage = lazy(() => import("./pages/Admin/Feature/AdminFeatureCreatePage.jsx"));
const AdminFeatureUpdatePage = lazy(() => import("./pages/Admin/Feature/AdminFeatureUpdatePage.jsx"));
const AdminFaqPage = lazy(() => import("./pages/Admin/Faq/AdminFaqPage.jsx"));
const AdminFaqCreatePage = lazy(() => import("./pages/Admin/Faq/AdminFaqCreatePage.jsx"));
const AdminFaqUpdatePage = lazy(() => import("./pages/Admin/Faq/AdminFaqUpdatePage.jsx"));
const AdminProductPage = lazy(() => import("./pages/Admin/Product/AdminProductPage.jsx"));
const AdminProductCreatePage = lazy(() => import("./pages/Admin/Product/AdminProductCreatePage.jsx"));
const AdminProductUpdatePage = lazy(() => import("./pages/Admin/Product/AdminProductUpdatePage.jsx"));
const AdminSettingPage = lazy(() => import("./pages/Admin/SettingPage/AdminSettingPage.jsx"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile.jsx"));
const BuyerAddress = lazy(() => import("./pages/BuyerAddress.jsx"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage.jsx"));
const PaymentPage = lazy(() => import("./pages/PaymentPage.jsx"));
const AdminNewsletterPage = lazy(() => import("./pages/Admin/Newsletter/AdminNewsletterPage.jsx"));
const AdminContactUsPage = lazy(() => import("./pages/Admin/ContactUs/AdminContactUsPage.jsx"));
const AdminContactUsShowPage = lazy(() => import("./pages/Admin/ContactUs/AdminContactUsShowPage.jsx"));
const AdminCheckoutShowPage = lazy(() => import("./pages/Admin/Checkout/AdminCheckoutShowPage.jsx"));
const AdminCheckoutPage = lazy(() => import("./pages/Admin/Checkout/AdminCheckoutPage.jsx"));
const ForgetPassword1 = lazy(() => import("./pages/ForgatePassword1.jsx"));
const ForgetPassword2 = lazy(() => import("./pages/ForgatePassword2.jsx"));
const ForgetPassword3 = lazy(() => import("./pages/ForgatePassword3.jsx"));
const AdminUserPage = lazy(() => import("./pages/Admin/User/AdminUserPage.jsx"));
const AdminUserCreatePage = lazy(() => import("./pages/Admin/User/AdminUserCreatePage.jsx"));
const AdminUserUpdatePage = lazy(() => import("./pages/Admin/User/AdminUserUpdatePage.jsx"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Pages */}
          <Route path="" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/featurespage" element={<FeaturePage />} />
          <Route path="/testimonialpage" element={<TestimonialPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:_id" element={<ProductPage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password1" element={<ForgetPassword1 />} />
          <Route path="/forget-password2" element={<ForgetPassword2 />} />
          <Route path="/forget-password3" element={<ForgetPassword3 />} />

          {/* Buyer Routes */}
          {
            localStorage.getItem("login") ?
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path='/update-profile' element={<UpdateProfile />} />
                <Route path='/buyer-address' element={<BuyerAddress />} />
                <Route path="/editprofile" element={<EditProfilePage />} />
                <Route path="/saveaddress" element={<SaveAddress />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
              </> : null
          }

          {/* Admin Page */}
          {
            localStorage.getItem("login") && localStorage.getItem("role") !== "Buyer" ?
              <>
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminHomePage />} />

                {/* Main Category Routes */}
                <Route path="/admin/maincategory" element={<AdminMaincategoryPage />} />
                <Route path="/admin/maincategory/create" element={<AdminMaincategoryCreatePage />} />
                <Route path="/admin/maincategory/edit/:_id" element={<AdminMaincategoryUpdatePage />} />

                {/* Sub Category Routes */}
                <Route path="/admin/subcategory" element={<AdminSubcategoryPage />} />
                <Route path="/admin/subcategory/create" element={<AdminSubcategoryCreatePage />} />
                <Route path="/admin/subcategory/edit/:_id" element={<AdminSubcategoryUpdatePage />} />

                {/* Brand Routes */}
                <Route path="/admin/brand" element={<AdminBrandPage />} />
                <Route path="/admin/brand/create" element={<AdminBrandCreatePage />} />
                <Route path="/admin/brand/edit/:_id" element={<AdminBrandUpdatePage />} />

                {/* Feature Routes */}
                <Route path="/admin/feature" element={<AdminFeaturePage />} />
                <Route path="/admin/feature/create" element={<AdminFeatureCreatePage />} />
                <Route path="/admin/feature/edit/:_id" element={<AdminFeatureUpdatePage />} />

                {/* FAQ Routes */}
                <Route path="/admin/faq" element={<AdminFaqPage />} />
                <Route path="/admin/faq/create" element={<AdminFaqCreatePage />} />
                <Route path="/admin/faq/edit/:_id" element={<AdminFaqUpdatePage />} />

                {/* Product Routes */}
                <Route path="/admin/product" element={<AdminProductPage />} />
                <Route path="/admin/product/create" element={<AdminProductCreatePage />} />
                <Route path="/admin/product/edit/:_id" element={<AdminProductUpdatePage />} />

                {/* Setting Routes */}
                <Route path="/admin/setting" element={<AdminSettingPage />} />

                {/* News letter routes */}
                <Route path="/admin/newsletter" element={<AdminNewsletterPage />} />

                {/* Admin ContactUs Routes */}
                <Route path="/admin/contactus" element={<AdminContactUsPage />} />
                <Route path="/admin/contactus/show/:_id" element={<AdminContactUsShowPage />} />

                {/* Admin Checkouts routes */}
                <Route path="/admin/checkout" element={<AdminCheckoutPage />} />
                <Route path="/admin/checkout/show/:_id" element={<AdminCheckoutShowPage />} />

                {/* Super Admin Routes */}
                {
                  localStorage.getItem("role") === "Super Admin" ?
                    <>
                      <Route path="/admin/user" element={<AdminUserPage />} />
                      <Route path="/admin/user/create" element={<AdminUserCreatePage />} />
                      <Route path="/admin/user/edit/:_id" element={<AdminUserUpdatePage />} />
                    </> : null
                }

              </> : null
          }

          {/* Error Message */}
          <Route path="/*" element={<ErrorPage />} />

        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
