"use client";

import React from "react";
import { Menu, Sun, Moon, Bell, User } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

export default function Navbar() {
  const { state, dispatch } = useDashboard();
  return (
    <nav className="theme-bg-secondary border-b theme-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            className="md:hidden p-2 rounded-lg theme-hover"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6 theme-text-secondary" />
          </button>

          {/* Page title */}
          <h1 className="text-2xl font-bold theme-text-primary capitalize">
            {state.currentPage}
          </h1>
        </div>{" "}
        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
            className="p-2 rounded-lg theme-hover transition-colors"
            aria-label={
              state.isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {state.isDarkMode ? (
              <Sun className="w-5 h-5 theme-text-secondary" />
            ) : (
              <Moon className="w-5 h-5 theme-text-secondary" />
            )}
          </button>
          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg theme-hover transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5 theme-text-secondary" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          {/* Profile */}
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium theme-text-primary">
                AdminUser
              </p>
              <p className="text-xs theme-text-secondary">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
