'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Code2, 
  Video, 
  Eye,
  Loader2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        const data = await res.json();
        if (res.ok) {
          // Map the API data to the stats structure
          setStats([
            { label: 'Total Blogs', value: data.blogCount, icon: FileText, trend: data.blogTrend },
            { label: 'Code Snippets', value: data.snippetCount, icon: Code2, trend: data.snippetTrend },
            { label: 'Projects', value: data.projectCount, icon: Video, trend: data.projectTrend }, // Using Video icon for projects
            { label: 'Total Views', value: data.totalViews, icon: Eye, trend: data.viewsTrend },
          ]);
          setActivities(data.recentActivities);
        } else {
          toast({ title: 'Error', description: data.message || 'Failed to fetch dashboard data', variant: 'destructive' });
        }
      } catch (error) {
        toast({ title: 'Error', description: 'An error occurred while fetching dashboard data', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{stat.label}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <span className="w-4 h-4 text-green-500">↑</span> {/* Simplified trend icon */}
                  {stat.trend}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <span>{activity.action}</span>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-muted-foreground">No recent activity found.</p>
          )}
        </div>
      </Card>
    </div>
  );
}