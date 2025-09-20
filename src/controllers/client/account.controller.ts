import { Request, Response } from "express";
import { getUserProfile, updateUserProfile, changeUserPassword } from "services/client/account.service";
import {
  UpdateProfileSchema,
  TUpdateProfileSchema,
  TChangePasswordSchema,
  ChangePasswordSchema,
} from "validation/account.schema";

// Display account management page
const getAccountPage = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/login");
  }

  try {
    const userProfile = await getUserProfile(user.id);
    const successMessage = req.session?.successMessage || null;
    const errorMessage = req.session?.errorMessage || null;

    // Clear messages after displaying
    if (req.session) {
      delete req.session.successMessage;
      delete req.session.errorMessage;
    }

    return res.render("client/account/manage.ejs", {
      user: userProfile,
      successMessage,
      errorMessage,
      profileErrors: [],
      passwordErrors: [],
      oldProfileData: {
        fullName: userProfile?.fullName || "",
        phone: userProfile?.phone || "",
        address: userProfile?.address || "",
      },
    });
  } catch (error) {
    console.error("Error loading account page:", error);
    return res.redirect("/");
  }
};

// Update user profile
const postUpdateProfile = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/login");
  }

  const { fullName, phone, address } = req.body as TUpdateProfileSchema;
  const file = req.file;
  const avatar = file ? file.filename : undefined;

  try {
    // Validate input
    const validate = await UpdateProfileSchema.safeParseAsync(req.body);
    if (!validate.success) {
      const errors = validate.error.issues.map((err) => err.message);
      const userProfile = await getUserProfile(user.id);

      return res.render("client/account/manage.ejs", {
        user: userProfile,
        successMessage: null,
        errorMessage: null,
        profileErrors: errors,
        passwordErrors: [],
        oldProfileData: {
          fullName,
          phone: phone || "",
          address: address || "",
        },
      });
    }

    // Update profile
    await updateUserProfile(user.id, fullName, phone, address, avatar);

    if (req.session) {
      req.session.successMessage = "Cập nhật thông tin thành công!";
    }

    return res.redirect("/account");
  } catch (error) {
    console.error("Error updating profile:", error);
    if (req.session) {
      req.session.errorMessage = "Có lỗi xảy ra khi cập nhật thông tin!";
    }
    return res.redirect("/account");
  }
};

// Change user password
const postChangePassword = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/login");
  }

  const { currentPassword, newPassword } = req.body as TChangePasswordSchema;

  try {
    // Validate input
    const validate = await ChangePasswordSchema.safeParseAsync(req.body);
    if (!validate.success) {
      const errors = validate.error.issues.map((err) => err.message);
      const userProfile = await getUserProfile(user.id);

      return res.render("client/account/manage.ejs", {
        user: userProfile,
        successMessage: null,
        errorMessage: null,
        profileErrors: [],
        passwordErrors: errors,
        oldProfileData: {
          fullName: userProfile?.fullName || "",
          phone: userProfile?.phone || "",
          address: userProfile?.address || "",
        },
      });
    }

    // Change password
    await changeUserPassword(user.id, currentPassword, newPassword);

    if (req.session) {
      req.session.successMessage = "Đổi mật khẩu thành công!";
    }

    return res.redirect("/account");
  } catch (error: any) {
    console.error("Error changing password:", error);

    const userProfile = await getUserProfile(user.id);
    const errorMessage =
      error.message === "Current password is incorrect"
        ? "Mật khẩu hiện tại không đúng!"
        : "Có lỗi xảy ra khi đổi mật khẩu!";

    return res.render("client/account/manage.ejs", {
      user: userProfile,
      successMessage: null,
      errorMessage,
      profileErrors: [],
      passwordErrors: [],
      oldProfileData: {
        fullName: userProfile?.fullName || "",
        phone: userProfile?.phone || "",
        address: userProfile?.address || "",
      },
    });
  }
};

export { getAccountPage, postUpdateProfile, postChangePassword };
