"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { DashboardState, User, Role, Message } from "@/types";
import { mockUsers, mockRoles, mockMessages, mockStats } from "@/data/mockData";

// Action types for the reducer
type Action =
  | { type: "SET_PAGE"; payload: string }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_ROLE"; payload: Role }
  | { type: "DELETE_MESSAGE"; payload: string }
  | { type: "TOGGLE_ROLE_VISIBILITY"; payload: string }
  | { type: "RENAME_ROLE"; payload: { id: string; name: string } }
  | { type: "INIT_DARK_MODE"; payload: boolean };

// Initial state
const initialState: DashboardState = {
  users: mockUsers,
  roles: mockRoles,
  messages: mockMessages,
  stats: mockStats,
  currentPage: "dashboard",
  isDarkMode: false,
  isSidebarOpen: true,
};

// Reducer function
function dashboardReducer(
  state: DashboardState,
  action: Action
): DashboardState {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "TOGGLE_DARK_MODE":
      const newDarkMode = !state.isDarkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
      }
      return { ...state, isDarkMode: newDarkMode };
    case "INIT_DARK_MODE":
      return { ...state, isDarkMode: action.payload };
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
        stats: {
          ...state.stats,
          totalMembers: state.stats.totalMembers + 1,
        },
      };
    case "UPDATE_ROLE":
      return {
        ...state,
        roles: state.roles.map((role) =>
          role.id === action.payload.id ? action.payload : role
        ),
      };
    case "DELETE_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload
        ),
      };
    case "TOGGLE_ROLE_VISIBILITY":
      return {
        ...state,
        roles: state.roles.map((role) =>
          role.id === action.payload
            ? { ...role, isVisible: !role.isVisible }
            : role
        ),
      };
    case "RENAME_ROLE":
      return {
        ...state,
        roles: state.roles.map((role) =>
          role.id === action.payload.id
            ? { ...role, name: action.payload.name }
            : role
        ),
      };
    default:
      return state;
  }
}

// Context
const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Provider component
export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState); // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDarkMode = localStorage.getItem("darkMode");
      if (savedDarkMode) {
        dispatch({
          type: "INIT_DARK_MODE",
          payload: JSON.parse(savedDarkMode),
        });
      } else {
        // Check system preference
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        dispatch({
          type: "INIT_DARK_MODE",
          payload: systemPrefersDark,
        });
      }
    }
  }, []); // Apply dark mode using data-theme attribute
  useEffect(() => {
    if (typeof window !== "undefined") {
      const htmlElement = document.documentElement;
      if (state.isDarkMode) {
        htmlElement.setAttribute("data-theme", "dark");
        htmlElement.classList.add("dark");
      } else {
        htmlElement.setAttribute("data-theme", "light");
        htmlElement.classList.remove("dark");
      }
    }
  }, [state.isDarkMode]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to use the dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
