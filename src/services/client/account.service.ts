import { prisma } from "config/database";
import { comparePassword, hashPassword } from "services/user.service";

// Get user profile by ID
const getUserProfile = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      fullName: true,
      address: true,
      phone: true,
      avatar: true,
      accountType: true,
      role: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });
  return user;
};

// Update user profile
const updateUserProfile = async (
  userId: number,
  fullName: string,
  phone?: string,
  address?: string,
  avatar?: string
) => {
  const updateData: any = {
    fullName,
  };

  if (phone) updateData.phone = phone;
  if (address) updateData.address = address;
  if (avatar) updateData.avatar = avatar;

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
  });

  return updatedUser;
};

// Change user password
const changeUserPassword = async (userId: number, currentPassword: string, newPassword: string) => {
  // Get current user with password
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Verify current password
  const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);
  if (!isCurrentPasswordValid) {
    throw new Error("Current password is incorrect");
  }

  // Hash new password
  const hashedNewPassword = await hashPassword(newPassword);

  // Update password in database
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedNewPassword,
    },
  });

  return updatedUser;
};

export { getUserProfile, updateUserProfile, changeUserPassword };
