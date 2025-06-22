"use client";

import React from "react";
import {
  Menu,
  X,
  Home,
  Users,
  Shield,
  MessageSquare,
  Sun,
  Moon,
  Bell,
  User,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { NavigationItem } from "@/types";

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "Home", path: "/" },
  { id: "members", label: "Members", icon: "Users", path: "/members" },
  { id: "roles", label: "Roles", icon: "Shield", path: "/roles" },
  {
    id: "messages",
    label: "Messages",
    icon: "MessageSquare",
    path: "/messages",
  },
];

const iconMap = {
  Home,
  Users,
  Shield,
  MessageSquare,
};

export default function Sidebar() {
  const { state, dispatch } = useDashboard();

  const handlePageChange = (pageId: string) => {
    dispatch({ type: "SET_PAGE", payload: pageId });
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      dispatch({ type: "TOGGLE_SIDEBAR" });
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {state.isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
        />
      )}{" "}
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full theme-bg-secondary border-r theme-border z-50 transition-all duration-300 ${
          state.isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 md:translate-x-0 md:static md:z-auto`}
      >
        {" "}
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b theme-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl theme-text-primary">
              Discord Admin
            </span>
          </div>
          <button
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            className="md:hidden p-1 rounded-lg theme-hover"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 theme-text-secondary" />
          </button>
        </div>
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            return (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  state.currentPage === item.id
                    ? "bg-indigo-600 text-white"
                    : "theme-text-primary theme-hover"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>{" "}
        {/* Server Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t theme-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium theme-text-primary truncate">
                Discord Server
              </p>
              <p className="text-sm theme-text-secondary">
                {state.stats.onlineUsers} online
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
