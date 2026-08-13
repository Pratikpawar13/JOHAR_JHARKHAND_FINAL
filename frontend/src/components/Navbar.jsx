import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import dropdown from "../assets/dropdown.svg"; // your svg

// ---------- Styles ----------
const styles = {
  wrapper: {
    position: "relative",
    display: "inline-block",
  },

  /* Toggle button */
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.6rem 1rem",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "8px",
    cursor: "pointer",
    userSelect: "none",
    color: "#fff",
    background: "rgba(255, 255, 255, 0.26)",
    fontWeight: 500,
    fontSize: "1rem",
    letterSpacing: "0.5px",
    transition: "background 0.3s, box-shadow 0.3s",
  },
  buttonHover: {
    background: "rgba(255, 255, 255, 0.06)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  },

  arrow: {
    width: "18px",
    height: "18px",
    transition: "transform 0.3s ease",
  },

  /* Dropdown menu with glass effect */
  menu: {
    position: "absolute",
    top: "3rem",
    left: "-1.6rem", //to centered the list
    display: "flex",
    flexDirection: "column",
    minWidth: "180px",
    backdropFilter: "blur(10px)",
    background: "rgba(35, 35, 35, 0.2)", // translucent dark
    padding: "0.8rem",
    borderRadius: "10px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
    gap: "0.4rem",
    zIndex: 20,
  },

  navLink: {
    textDecoration: "none",
    color: "white",
    padding: "0.5rem 0.8rem",
    borderRadius: "6px",
    fontSize: "0.95rem",
    transition: "background 0.2s, color 0.2s",
  },
  navLinkHover: {
    background: "rgba(255,255,255,0.15)",
    color: "#f97316", // orange highlight
  },
  navLinkActive: {
    fontWeight: 600,
    color: "#f97316",
  },
};

// ---------- Hover helper ----------
function useHover() {
  const [hovered, setHovered] = React.useState(false);
  return {
    hovered,
    bind: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
}

// ---------- Component ----------
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { hovered, bind } = useHover();
  const { isAuthenticated, user, logout } = useAuth();

  // Close dropdown when authentication state changes
  React.useEffect(() => {
    setOpen(false);
  }, [isAuthenticated, user]);

  // Base navigation items that are always visible
  const baseNav = [
    { to: "/destinations", label: "Destinations" },
    { to: "/experiences", label: "Experiences" },
    { to: "/plan-your-trip", label: "Plan Your Trip" },
    { to: "/festivals", label: "Festivals" },
    { to: "/gallery", label: "Gallery" },
    { to: "/guide-services", label: "Guide Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  // Authentication-specific navigation items
  const authNav = React.useMemo(() => {
    if (isAuthenticated && user) {
      const items = [
        { to: "/profile", label: `Profile (${user?.name || user?.email || 'User'})` },
        { to: "/feedback", label: "Feedback" }
      ];
      
      // Add admin dashboard for admin users
      if (user?.userType === 'admin') {
        items.push({ to: "/feedbackDashboard", label: "Feedback Dashboard" });
      }
      
      items.push({ action: "logout", label: "Logout" });
      return items;
    } else {
      return [{ to: "/auth", label: "Login" }];
    }
  }, [isAuthenticated, user]);

  // Combine all navigation items
  const nav = [...authNav, ...baseNav, { to: "/payment", label: "Payment" }];

  const handleItemClick = async (item) => {
    if (item.action === "logout") {
      try {
        await logout();
        setOpen(false);
      } catch (error) {
        console.error('Logout failed:', error);
      }
    } else {
      // Close dropdown when navigating
      setOpen(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Toggle Button */}
      <div
        style={{
          ...styles.button,
          ...(hovered ? styles.buttonHover : {}),
        }}
        onClick={() => setOpen((prev) => !prev)}
        {...bind}
      >
        Explore
        <img
          src={dropdown}
          alt="toggle"
          style={{
            ...styles.arrow,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </div>

      {/* Menu links */}
      {open && (
        <div style={styles.menu}>
          {nav.map((item, index) => (
            item.action ? (
              <ActionButton 
                key={`action-${index}`} 
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </ActionButton>
            ) : (
              <StyledNavLink 
                key={item.to} 
                to={item.to}
                onNavigate={() => setOpen(false)}
              >
                {item.label}
              </StyledNavLink>
            )
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Styled NavLink ----------
function StyledNavLink({ to, children, onNavigate }) {
  const { hovered, bind } = useHover();
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      style={({ isActive }) => {
        const base = { ...styles.navLink };
        if (hovered) Object.assign(base, styles.navLinkHover);
        if (isActive) Object.assign(base, styles.navLinkActive);
        return base;
      }}
      {...bind}
    >
      {children}
    </NavLink>
  );
}

// ---------- Action Button ----------
function ActionButton({ onClick, children }) {
  const { hovered, bind } = useHover();
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.navLink,
        ...(hovered ? styles.navLinkHover : {}),
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
      }}
      {...bind}
    >
      {children}
    </button>
  );
}
