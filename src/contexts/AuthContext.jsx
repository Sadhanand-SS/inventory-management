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
    name: "Admin",
    role: "admin",
  },
  {
    id: 2,
    username: "vendor",
    password: "vendor123",
    name: "Vendor One",
    role: "vendor",
    vendorId: "V-101",
  },
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
