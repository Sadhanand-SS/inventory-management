import { createContext, useState } from "react";

/**
 * AuthContext
 * -----------
 * This context is responsible ONLY for authentication state.
 *
 * It answers:
 * - Who is the currently logged-in user?
 *
 * It does NOT:
 * - Fetch products
 * - Filter inventory
 * - Control routing
 * - Know about UI layout
 */

export const AuthContext = createContext(null);

/**
 * AuthProvider
 * ------------
 * This provider wraps the app and provides authentication data.
 *
 * REQUIRED STATE:
 * - user (single source of truth)
 *
 * REQUIRED DERIVED DATA:
 * - isAuthenticated (derived from user, NOT state)
 *
 * REQUIRED FUNCTIONS:
 * - login(credentials)
 * - logout()
 * - signup(data)
 */

const DUMMY_USERS = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    name: "System Admin",
    role: "admin",
  },

  // ===== VENDORS =====
  {
    id: 2,
    username: "aula",
    password: "aula@123",
    name: "AULA Vendor",
    role: "vendor",
    vendorId: "VEND-001",
  },
  {
    id: 3,
    username: "epomaker",
    password: "epomaker@123",
    name: "Epomaker Vendor",
    role: "vendor",
    vendorId: "VEND-002",
  },
  {
    id: 4,
    username: "skyloong",
    password: "skyloong@123",
    name: "Skyloong Vendor",
    role: "vendor",
    vendorId: "VEND-003",
  },
  {
    id: 5,
    username: "royalkludge",
    password: "rk@123",
    name: "Royal Kludge Vendor",
    role: "vendor",
    vendorId: "VEND-004",
  },
  {
    id: 6,
    username: "mchose",
    password: "mchose@123",
    name: "MCHOSE Vendor",
    role: "vendor",
    vendorId: "VEND-005",
  },
  {
    id: 7,
    username: "keychron",
    password: "keychron@123",
    name: "Keychron Vendor",
    role: "vendor",
    vendorId: "VEND-006",
  },
  {
    id: 8,
    username: "akko",
    password: "akko@123",
    name: "Akko Vendor",
    role: "vendor",
    vendorId: "VEND-007",
  },
  {
    id: 9,
    username: "ducky",
    password: "ducky@123",
    name: "Ducky Vendor",
    role: "vendor",
    vendorId: "VEND-008",
  },
  {
    id: 10,
    username: "redragon",
    password: "redragon@123",
    name: "Redragon Vendor",
    role: "vendor",
    vendorId: "VEND-009",
  },
  {
    id: 11,
    username: "varmilo",
    password: "varmilo@123",
    name: "Varmilo Vendor",
    role: "vendor",
    vendorId: "VEND-010",
  }
];

const AuthProvider = ({ children }) => {
  /**
   * STATE: user
   * -----------
   * user === null  → no one is logged in
   * user !== null  → someone is logged in
   *
   * Shape of user object you MUST follow:
   * {
   *   id,
   *   name,
   *   role: "admin" | "vendor",
   *   vendorId?  // only if role === "vendor"
   * }
   */
  const [user, setUser] = useState(null);

  /**
   * DERIVED VALUE (DO NOT MAKE THIS STATE)
   * -------------------------------------
   * Boolean that tells whether user is logged in.
   *
   * HINT:
   * - This should be derived from `user`
   * - Do NOT use useState for this
   */
  const isAuthenticated = !!user;

  /**
   * login
   * -----
   * Requirements:
   * - Accept credentials (username, password)
   * - Validate against dummy users (hardcoded list)
   * - If valid:
   *     - set user state (WITHOUT password)
   *     - return { success: true }
   * - If invalid:
   *     - do NOT update state
   *     - return { success: false, error }
   *
   * HINT:
   * - Dummy users should NOT be in state
   * - This function SHOULD return a Promise
   */
  const login = async ({ username, password }) => {
    const matchedUser = DUMMY_USERS.find(
      (user) => user.username === username && user.password === password
    );

    if (!matchedUser) {
      return { success: false, error: "INVALID_CREDENTIALS" };
    }
    const { password: _, ...cleanUser } = matchedUser;
    setUser(cleanUser);
    return { success: true, user: cleanUser };
  };

  /**
   * logout
   * ------
   * Requirements:
   * - Clear user state
   * - No return value needed
   *
   * HINT:
   * - Logging out simply means user becomes null
   */
  const logout = () => {
    setUser(null);
  };

  /**
   * signup
   * ------
   * Requirements (for now):
   * - Accept basic user info
   * - Create a new vendor user object
   * - Automatically log the user in
   * - Return { success: true }
   *
   * HINT:
   * - No persistence required
   * - You can generate vendorId here
   */
  const signup = async (data) => {
    const newUser = {
      id: Date.now(),
      name: data.name,
      username: data.username,
      role: "vendor",
      vendorId: `V-${Date.now()}`,
    };

    setUser(newUser);
    return { success: true };
  };

  /**
   * CONTEXT VALUE
   * -------------
   * Only expose what consumers actually need.
   */
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
