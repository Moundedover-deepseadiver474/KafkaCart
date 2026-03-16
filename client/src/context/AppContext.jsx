import { createContext, useContext, useState, useEffect } from "react";
import products from "../data/Products";
import { sendEvent } from "../utils/eventSender";
import toast from "react-hot-toast"

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

// Generate UUID
const generateUUID = () => {
  return crypto.randomUUID();
};

// LocalStorage keys
const STORAGE_KEYS = {
  USER: 'shopflow_user',
  CART: 'shopflow_cart',
  USERS_DB: 'shopflow_users_db'
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CART);
    }
  }, [cart]);

  // Get users database from localStorage
  const getUsersDB = () => {
    const db = localStorage.getItem(STORAGE_KEYS.USERS_DB);
    return db ? JSON.parse(db) : {};
  };

  // Save users database to localStorage
  const saveUsersDB = (usersDB) => {
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(usersDB));
  };

  // Auth functions
  const login = (email, password) => {
    const usersDB = getUsersDB();
    const userRecord = usersDB[email];

    if (!userRecord) {
      toast.error("User not found.");
      return false;
    }

    if (userRecord.password !== password) {
      toast.error("Incorrect password.");
      return false;
    }

    const userData = {
      userId: userRecord.userId,
      email: userRecord.email,
      name: userRecord.name
    };

    setUser(userData);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));

    sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "USER_LOGIN",
      userId: userData.userId,
      timestamp: Date.now(),
      source: "web",
      metadata: {}
    })

    return true;
  };

  const signup = (name, email, password) => {
    const usersDB = getUsersDB();

    if (usersDB[email]) {
      toast.error("User already exists. Please login.");
      return false;
    }

    const userId = generateUUID();
    const userRecord = {
      userId,
      name,
      email,
      password
    };

    // Save to users database
    usersDB[email] = userRecord;
    saveUsersDB(usersDB);

    // Set current user
    const userData = {
      userId,
      email,
      name
    };

    setUser(userData);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));

    sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "USER_SIGNUP",
      userId: userData.userId,
      timestamp: Date.now(),
      source: "web",
      metadata: {}
    })

    return true;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.CART);

    sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "USER_LOGOUT",
      userId: user.userId,
      timestamp: Date.now(),
      source: "web",
      metadata: {}
    })
  };

  // Cart functions
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "ADD_TO_CART",
      userId: user?.userId,
      productId: product.id,
      timestamp: Date.now(),
      source: "web",
      metadata: {
        price: product.price
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));

    sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "REMOVE_FROM_CART",
      userId: user?.userId,
      productId: id,
      timestamp: Date.now(),
      source: "web",
      metadata: {}
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    user,
    cart,
    products,
    login,
    signup,
    logout,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
