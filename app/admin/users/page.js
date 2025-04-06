"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import UserItem from "./UserItem";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to fetch users",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching users",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [toast]);

  if (loading) {
    return (
      <div className="space-y-6 px-4 py-8">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <section className="min-h-screen px-4 bg-background py-8">
      <div className="container max-w-7xl mx-auto space-y-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight">Manage Users</h1>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full my-4" />
        </motion.div>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            {users.length === 0 ? (
              <motion.p
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="text-muted-foreground text-center"
              >
                No users found.
              </motion.p>
            ) : (
              <div className="grid gap-6">
                {users.map((user, index) => (
                  <motion.div
                    key={user._id}
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.1 }}
                  >
                    <UserItem user={user} setUsers={setUsers} />
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}