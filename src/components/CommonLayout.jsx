import { NavLink, useLocation } from "react-router-dom";
import { rules, useFormValidation } from "../validation/formValidation";

function CommonLayout({ children }) {
  const { pathname } = useLocation();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Register", path: "/register" },
  ];

  const routeSubtitles = {
    "/": "Discover trending products, best deals, and new arrivals.",
    "/register": "Create your account for faster checkout and rewards.",
  };

  const currentSubtitle =
    routeSubtitles[pathname] ||
    "Explore our ecommerce experience and services.";

  return (
    <div className="common-layout">
      <header className="site-header">
        <div className="top-strip py-2">
          <div className="container d-flex flex-wrap justify-content-between gap-2 small">
            <span>Free shipping on orders over $50</span>
            <span>Support: support@workshop.com</span>
          </div>
        </div>
        <div className="container py-3">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-3 mb-lg-2">
            <div className="site-title-wrap">
              <h1 className="site-title m-0">Workshop</h1>
              <p className="site-subtitle m-0">{currentSubtitle}</p>
            </div>
          </div>

          <nav
            className="navbar navbar-expand-lg p-0"
            aria-label="Main navigation"
          >
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
              aria-controls="mainNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mainNavbar">
              <ul className="menu-list navbar-nav ms-lg-auto m-0 p-0">
                {menuItems.map((item) => (
                  <li key={item.path} className="nav-item">
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        isActive
                          ? "menu-link menu-link-active nav-link"
                          : "menu-link nav-link"
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <main className="site-main container py-4">{children}</main>

      <footer className="site-footer">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <h3 className="h6">Workshop</h3>
              <p className="small mb-0">
                Your trusted ecommerce destination for quality products, secure
                payments, and fast delivery.
              </p>
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <h3 className="h6">Company</h3>
              <ul className="list-unstyled small mb-0 d-flex flex-column gap-1">
                <li>
                  <NavLink to="/about" className="footer-link">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="footer-link">
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faq" className="footer-link">
                    FAQ
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-3 col-lg-3">
              <h3 className="h6">Customer Care</h3>
              <ul className="list-unstyled small mb-0 d-flex flex-column gap-1">
                <li>
                  <NavLink to="/terms-of-service" className="footer-link">
                    Terms of Service
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacy-policy" className="footer-link">
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/shop" className="footer-link">
                    Shop
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="border-top mt-3 pt-3 text-center">
              <small>
                © {new Date().getFullYear()} Workshop. All rights reserved.
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CommonLayout;
