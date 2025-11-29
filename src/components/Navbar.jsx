import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { deleteCart, getCart } from "../Redux/ActionCreators/CartActionCreators"

export default function Navbar() {
  let [cart, setCart] = useState([])
  let [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  let [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)

  let MaincategoryStateDataRaw = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateDataRaw = useSelector(state => state.SubcategoryStateData)
  let BrandStateDataRaw = useSelector(state => state.BrandStateData)
  let CartStateDataRaw = useSelector(state => state.CartStateData)

  const MaincategoryStateData = Array.isArray(MaincategoryStateDataRaw) ? MaincategoryStateDataRaw : []
  const SubcategoryStateData = Array.isArray(SubcategoryStateDataRaw) ? SubcategoryStateDataRaw : []
  const BrandStateData = Array.isArray(BrandStateDataRaw) ? BrandStateDataRaw : []
  const CartStateData = Array.isArray(CartStateDataRaw) ? CartStateDataRaw : []

  let dispatch = useDispatch()
  let navigate = useNavigate()

  function logout() {
    localStorage.clear()
    navigate("/login")
  }

  function deleteRecord(_id) {
    if (confirm("Are You Sure to Remove That Item From Cart: ")) {
      dispatch(deleteCart({ _id: _id }))
      getAPIData()
    }
  }

  function getAPIData() {
    dispatch(getCart())
    if (Array.isArray(CartStateData) && CartStateData.length) {
      const userId = localStorage.getItem("userid")
      const userCart = CartStateData.filter(x => {
        const itemUserId = typeof x.user === 'object' ? x.user?._id : x.user
        return itemUserId === userId
      })
      setCart(userCart)
    } else {
      setCart([])
    }
  }

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
    setIsCategoryDropdownOpen(false)
  }

  useEffect(() => {
    dispatch(getMaincategory())
  }, [MaincategoryStateData.length])

  useEffect(() => {
    dispatch(getSubcategory())
  }, [SubcategoryStateData.length])

  useEffect(() => {
    dispatch(getBrand())
  }, [BrandStateData.length])

  useEffect(() => {
    getAPIData()
  }, [CartStateData.length])

  return (
    <>
      <header className="top-header">
        <nav className="navbar navbar-expand-xl w-100 navbar-dark container gap-3">
          {/* Logo - Always visible */}
          <Link className="navbar-brand d-flex align-items-center" to="/" onClick={handleLinkClick}>
            <img src="/assets/images/E-Cart1.png" className="logo-img" alt="E-Cart Logo" style={{ maxHeight: '40px' }} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-btn d-xl-none btn btn-link text-white p-2"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
            style={{ fontSize: '1.5rem', border: 'none' }}
          >
            <i className={isMobileMenuOpen ? "bi bi-x" : "bi bi-list"}></i>
          </button>

          {/* Mobile Offcanvas Menu */}
          <div
            className={`offcanvas offcanvas-start ${isMobileMenuOpen ? 'show' : ''}`}
            tabIndex="-1"
            id="offcanvasNavbar"
            style={{
              visibility: isMobileMenuOpen ? 'visible' : 'hidden',
              transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            <div className="offcanvas-header">
              <div className="offcanvas-logo">
                <Link to="/" onClick={handleLinkClick}>
                  <img src="/assets/images/E-Cart1.png" className="logo-img" alt="Logo" />
                </Link>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body primary-menu">
              <ul className="navbar-nav justify-content-start flex-grow-1 gap-1">
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLinkClick}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about" onClick={handleLinkClick}>About</Link>
                </li>

                {/* Mobile-Friendly Categories Accordion */}
                <li className="nav-item d-xl-none">
                  <button
                    className="nav-link btn btn-link text-start w-100 d-flex justify-content-between align-items-center"
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    style={{ textDecoration: 'none', border: 'none', padding: '0.5rem 1rem' }}
                  >
                    Categories
                    <i className={`bi bi-chevron-${isCategoryDropdownOpen ? 'up' : 'down'}`}></i>
                  </button>

                  {isCategoryDropdownOpen && (
                    <div className="mobile-category-menu ps-3">
                      <div className="mb-3">
                        <h6 className="text-white-50 small mb-2">Maincategories</h6>
                        <ul className="list-unstyled">
                          {MaincategoryStateData.filter(x => x.active).map((item) => (
                            <li key={item._id || item.name} className="mb-1">
                              <Link
                                to={`/shop?mc=${item.name}`}
                                className="text-white text-decoration-none d-block py-1"
                                onClick={handleLinkClick}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-3">
                        <h6 className="text-white-50 small mb-2">Subcategories</h6>
                        <ul className="list-unstyled">
                          {SubcategoryStateData.filter(x => x.active).slice(0, 8).map((item) => (
                            <li key={item._id || item.name} className="mb-1">
                              <Link
                                to={`/shop?sc=${item.name}`}
                                className="text-white text-decoration-none d-block py-1"
                                onClick={handleLinkClick}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-3">
                        <h6 className="text-white-50 small mb-2">Brands</h6>
                        <ul className="list-unstyled">
                          {BrandStateData.filter(x => x.active).slice(0, 8).map((item) => (
                            <li key={item._id || item.name} className="mb-1">
                              <Link
                                to={`/shop?br=${item.name}`}
                                className="text-white text-decoration-none d-block py-1"
                                onClick={handleLinkClick}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>

                {/* Desktop Categories Dropdown */}
                <li className="nav-item dropdown d-none d-xl-block">
                  <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                    data-bs-toggle="dropdown">
                    Categories
                  </a>
                  <div className="dropdown-menu dropdown-large-menu">
                    <div className="row">
                      <div className="col-12 col-xl-3">
                        <h6 className="large-menu-title">Maincategories</h6>
                        <ul className="list-unstyled">
                          {MaincategoryStateData.filter(x => x.active).map((item) => (
                            <li key={item._id || item.name}>
                              <Link to={`/shop?mc=${item.name}`}>{item.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-12 col-xl-3">
                        <h6 className="large-menu-title">Subcategories</h6>
                        <ul className="list-unstyled">
                          {SubcategoryStateData.filter(x => x.active).map((item) => (
                            <li key={item._id || item.name}>
                              <Link to={`/shop?sc=${item.name}`}>{item.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-12 col-xl-3">
                        <h6 className="large-menu-title">Brands</h6>
                        <ul className="list-unstyled">
                          {BrandStateData.filter(x => x.active).map((item) => (
                            <li key={item._id || item.name}>
                              <Link to={`/shop?br=${item.name}`}>{item.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-12 col-xl-3 d-none d-xl-block">
                        <div className="pramotion-banner1">
                          <img src="/assets/images/menu-img.webp" className="img-fluid" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/shop" onClick={handleLinkClick}>Shop</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/featurespage" onClick={handleLinkClick}>Features</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/testimonialpage" onClick={handleLinkClick}>Testimonial</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contactus" onClick={handleLinkClick}>Contact</Link>
                </li>

                {/* User Menu - Mobile */}
                {localStorage.getItem("login") ? (
                  <li className="nav-item d-xl-none">
                    <div className="mobile-user-menu mt-3 pt-3 border-top border-secondary">
                      <p className="text-white-50 small mb-2">Hello, {localStorage.getItem("name")}</p>
                      <Link className="nav-link" to="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
                      {localStorage.getItem("role") !== "Buyer" && (
                        <Link className="nav-link" to="/admin" onClick={handleLinkClick}>Admin Dashboard</Link>
                      )}
                      <Link className="nav-link" to="/profile" onClick={handleLinkClick}>My Profile</Link>
                      <Link className="nav-link" to="/update-profile" onClick={handleLinkClick}>Edit Profile</Link>
                      <Link className="nav-link" to="/cart" onClick={handleLinkClick}>Cart</Link>
                      <Link className="nav-link" to="/orders" onClick={handleLinkClick}>Orders</Link>
                      <Link className="nav-link" to="/wishlist" onClick={handleLinkClick}>Wishlist</Link>
                      <Link className="nav-link" to="/buyer-address" onClick={handleLinkClick}>Addresses</Link>
                      <button className="nav-link btn btn-link text-danger" onClick={() => { logout(); handleLinkClick(); }}>
                        Logout
                      </button>
                    </div>
                  </li>
                ) : (
                  <li className="nav-item d-xl-none">
                    <Link className="nav-link" to="/login" onClick={handleLinkClick}>Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Secondary Menu - Icons (Always visible on right) */}
          <ul className="navbar-nav secondary-menu flex-row ms-auto">
            <li className="nav-item">
              <a className="nav-link dark-mode-icon" href="#">
                <div className="mode-icon">
                  <i className="bi bi-moon"></i>
                </div>
              </a>
            </li>

            {localStorage.getItem("login") ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/wishlist"><i className="bi bi-suit-heart"></i></Link>
                </li>
                <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
                  <a className="nav-link position-relative" href="#">
                    <div className="cart-badge">{cart.length}</div>
                    <i className="bi bi-basket2"></i>
                  </a>
                </li>
                <li className="nav-item d-none d-xl-block dropdown">
                  <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-person-circle"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                    {localStorage.getItem("role") !== "Buyer" && (
                      <li><Link className="dropdown-item" to="/admin">Admin Dashboard</Link></li>
                    )}
                    <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                    <li><Link className="dropdown-item" to="/update-profile">Edit Profile</Link></li>
                    <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                    <li><Link className="dropdown-item" to="/orders">Orders</Link></li>
                    <li><Link className="dropdown-item" to="/wishlist">Wishlist</Link></li>
                    <li><Link className="dropdown-item" to="/buyer-address">Addresses</Link></li>
                    <li><hr /></li>
                    <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                  </ul>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="offcanvas-backdrop fade show d-xl-none"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ zIndex: 1040 }}
        ></div>
      )}

      {/* Cart Offcanvas */}
      <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header bg-section-2">
          <h5 className="mb-0 fw-bold" id="offcanvasRightLabel">{cart.length} items in the cart</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="cart-list">
            {cart.map(item => {
              const product = item.product || {}
              return <div key={item._id}>
                <div className="d-flex align-items-center gap-3">
                  <div className="bottom-product-img">
                    <Link to={`/product/${product._id}`}>
                      <img src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${product.pic?.[0] || item.pic}`} width={80} height={80} alt="" />
                    </Link>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0 fw-light mb-1">{product.name || item.name}</h6>
                    <p className="mb-0"><strong>{item.quantity || item.qty} X &#8377;{product.finalPrice || item.price}</strong></p>
                  </div>
                  <div className="ms-auto fs-5">
                    <button className="btn btn-danger btn-sm" onClick={() => deleteRecord(item._id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            })}
          </div>
        </div>
        {cart.length ? (
          <div className="offcanvas-footer p-3 border-top">
            <div className="d-grid">
              <Link to="/checkout" className="btn btn-lg btn-dark btn-ecomm px-5 py-3">Checkout</Link>
            </div>
          </div>
        ) : null}
      </div>

      <style jsx>{`
        /* Mobile Menu Enhancements */
        .mobile-menu-btn {
          background: none;
          color: white;
        }
        
        .offcanvas {
          max-width: 85vw;
        }
        
        .mobile-category-menu {
          max-height: 60vh;
          overflow-y: auto;
        }
        
        .mobile-user-menu .nav-link {
          padding: 0.5rem 0;
        }
        
        /* Touch-friendly tap targets */
        @media (max-width: 1199.98px) {
          .nav-link {
            padding: 0.75rem 1rem;
            min-height: 44px;
            display: flex;
            align-items: center;
          }
          
          .navbar-nav .nav-item {
            width: 100%;
          }
          
          .secondary-menu .nav-link {
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        
        /* Smooth transitions */
        .offcanvas {
          transition: transform 0.3s ease-in-out;
        }
        
        .offcanvas-backdrop {
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </>
  )
}
