import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, BookOpen, BarChart3, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  user?: any;
  userRole?: 'student' | 'parent' | 'teacher' | 'admin';
}

export const Navbar = ({ user, userRole = 'student' }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = {
    student: [
      { icon: BookOpen, label: "Dashboard", href: "/dashboard" },
      { icon: BarChart3, label: "Aptitude Test", href: "/test" },
      { icon: User, label: "Career Paths", href: "/careers" },
    ],
    parent: [
      { icon: Users, label: "Children", href: "/children" },
      { icon: BarChart3, label: "Progress", href: "/progress" },
    ],
    teacher: [
      { icon: Users, label: "Students", href: "/students" },
      { icon: BarChart3, label: "Analytics", href: "/analytics" },
    ],
    admin: [
      { icon: Users, label: "Users", href: "/admin/users" },
      { icon: BarChart3, label: "Reports", href: "/admin/reports" },
    ]
  };

  const currentNavItems = navItems[userRole];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-hero p-2 rounded-lg shadow-card">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                PathwaysQuest
              </h1>
              <p className="text-xs text-muted-foreground">AI Career Guidance</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {currentNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium">Welcome, {user.name || 'Student'}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Login
                </Button>
                <Button variant="hero" size="sm">
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
        )}>
          <div className="pt-2 pb-3 space-y-1">
            {currentNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
            {!user && (
              <div className="px-3 pt-4 flex flex-col space-y-2">
                <Button variant="outline" size="sm">
                  Login
                </Button>
                <Button variant="hero" size="sm">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};