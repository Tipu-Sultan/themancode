"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserIcon, Edit, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function UserItem({ user: initialUser, setUsers }) {
  const [user, setUser] = useState(initialUser);
  const [editUser, setEditUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleUpdateUser = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${editUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isAdmin: editUser.isAdmin,
          permissions: editUser.permissions,
          adminRole: editUser.adminRole,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setUsers((prev) =>
          prev.map((u) => (u._id === data._id ? data : u))
        );
        setEditUser(null);
        toast({
          title: "Success",
          description: "User updated successfully!",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update user",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== user._id));
        toast({
          title: "Success",
          description: "User deleted successfully!",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete user",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      variants={itemVariants}
    >
      <div className="flex items-center gap-4">
        <UserIcon className="h-8 w-8 text-primary" />
        <div>
          <h3 className="text-lg font-medium">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {user.isAdmin && (
              <Badge variant="secondary">{user.adminRole || "Admin"}</Badge>
            )}
            {user.permissions && user.permissions.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {user.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="text-xs bg-yellow-300 text-gray-900 px-1.5 py-0.5 rounded"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            )}
            <Badge variant="outline">
              Last Login:{" "}
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "Never"}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditUser(user)}
                disabled={isLoading}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </motion.div>
          </DialogTrigger>
          <motion.div
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit User: {editUser?.name}</DialogTitle>
              </DialogHeader>
              {editUser && (
                <div className="space-y-6 p-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="isAdmin"
                      checked={editUser.isAdmin}
                      onCheckedChange={(checked) =>
                        setEditUser({ ...editUser, isAdmin: checked })
                      }
                    />
                    <Label htmlFor="isAdmin" className="text-sm">
                      Admin Status
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permissions" className="text-sm">
                      Permissions (comma-separated)
                    </Label>
                    <Input
                      id="permissions"
                      placeholder="e.g., create,read,update,delete"
                      value={editUser.permissions.join(", ")}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          permissions: e.target.value.split(", ").filter(Boolean),
                        })
                      }
                      className="border-gray-300 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminRole" className="text-sm">
                      Admin Role
                    </Label>
                    <Select
                      value={editUser.adminRole || "null"}
                      onValueChange={(value) =>
                        setEditUser({
                          ...editUser,
                          adminRole: value === "null" ? null : value,
                        })
                      }
                    >
                      <SelectTrigger id="adminRole" className="border-gray-300">
                        <SelectValue placeholder="Select admin role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">None</SelectItem>
                        <SelectItem value="superadmin">Superadmin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="content-manager">
                          Content Manager
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                    <Button
                      onClick={handleUpdateUser}
                      disabled={isLoading}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </motion.div>
                </div>
              )}
            </DialogContent>
          </motion.div>
        </Dialog>

        <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
          <Button
            variant="destructive"
            size="sm"
            className="hover:bg-red-600"
            onClick={handleDeleteUser}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}