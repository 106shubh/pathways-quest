import { TrendingUp, Users, Star, Globe } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Students Guided",
    description: "Across India",
    color: "primary"
  },
  {
    icon: Star,
    value: "95%",
    label: "Success Rate",
    description: "Career Satisfaction",
    color: "secondary"
  },
  {
    icon: TrendingUp,
    value: "200+",
    label: "Career Paths",
    description: "From Traditional to Emerging",
    color: "accent"
  },
  {
    icon: Globe,
    value: "12",
    label: "Languages",
    description: "Including Regional Languages",
    color: "warning"
  }
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Trusted by Students
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Across India</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform has helped thousands of students discover their ideal career paths
            and achieve their academic goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const colorMap = {
              primary: "bg-gradient-primary text-white",
              secondary: "bg-gradient-secondary text-white",
              accent: "bg-gradient-accent text-white",
              warning: "bg-warning text-warning-foreground"
            };

            return (
              <div key={index} className="text-center group">
                <div className="relative">
                  {/* Icon Background */}
                  <div className={`inline-flex p-4 rounded-full ${colorMap[stat.color as keyof typeof colorMap]} mb-4 shadow-card group-hover:shadow-glow transition-all duration-300`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  
                  {/* Animated Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse-glow"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold text-foreground group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Impact */}
        <div className="mt-16 bg-card p-8 rounded-2xl shadow-card">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-secondary mb-2">Rural Coverage</div>
              <p className="text-muted-foreground">Reaching Tier-2 and Tier-3 cities with offline capabilities</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-2">Government Partnership</div>
              <p className="text-muted-foreground">Aligned with National Education Policy 2020</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning mb-2">Future Ready</div>
              <p className="text-muted-foreground">Covering emerging careers in AI, Green Energy, and more</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};