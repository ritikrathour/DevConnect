"use client";
import { useState } from "react";
import {
  Code2,
  Menu,
  X,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { data: user } = useAuth().me();
  console.log(user?.data);

  const notifications = [
    { id: 1, title: "New connection request", time: "5m ago", unread: true },
    { id: 2, title: "Project update from @john", time: "1h ago", unread: true },
    {
      id: 3,
      title: "Your code review is ready",
      time: "3h ago",
      unread: false,
    },
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-500/20 bg-[#0a0a0f]/95 backdrop-blur-xl">
      {/* Top gradient line */}
      <div className="h-0.5 w-full bg-linear-to-r from-transparent via-emerald-400 to-transparent opacity-50"></div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:block">
                dev
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                  Connect
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            {user?.data && (
              <nav className="hidden md:flex items-center gap-1">
                <a
                  href="/explore"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  Explore
                </a>
                <a
                  href="/projects"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  Projects
                </a>
                <a
                  href="/developers"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  Developers
                </a>
                <a
                  href="/community"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  Community
                </a>
              </nav>
            )}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects, developers..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-400 transition-all placeholder-gray-600 text-sm"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-white/10 border border-white/10 rounded text-gray-500">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search - Mobile */}
            <button className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <Search className="w-5 h-5" />
            </button>

            {user?.data ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    )}
                  </button>

                  {/* Notifications Dropdown  */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-[#0f0f15] border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-4 border-b border-white/10">
                        <h3 className="font-semibold">Notifications</h3>
                        {unreadCount > 0 && (
                          <p className="text-xs text-gray-400 mt-1">
                            {unreadCount} unread
                          </p>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 ${
                              notif.unread ? "bg-emerald-500/5" : ""
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm">{notif.title}</p>
                              {notif.unread && (
                                <span className="w-2 h-2 bg-emerald-400 rounded-full mt-1 shrink-0"></span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {notif.time}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-white/10">
                        <a
                          href="/notifications"
                          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          View all notifications
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 pr-3 hover:bg-white/5 rounded-lg transition-all"
                  >
                    <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-black" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                  </button>
                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#0f0f15] border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-4 border-b border-white/10">
                        <p className="font-semibold capitalize">
                          {user?.data && user?.data?.username}
                        </p>
                        <p className="text-sm text-gray-400">
                          {user?.data && user?.data?.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors"
                        >
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">Profile</span>
                        </Link>
                        <a
                          href="/settings"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors"
                        >
                          <Settings className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">Settings</span>
                        </a>
                      </div>
                      <div className="border-t border-white/10 py-2">
                        <button className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors w-full text-red-400">
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed left-0 w-full  border-t bg-[#0a0a0f]/95 border-white/10 py-4 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-1">
              <a
                href="/explore"
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Explore
              </a>
              <a
                href="/projects"
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Projects
              </a>
              <a
                href="/developers"
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Developers
              </a>
              <a
                href="/community"
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Community
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-400/50 to-transparent"></div>
    </header>
  );
};
export default Header;
