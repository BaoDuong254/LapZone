import { Request, Response } from "express";
import { getUserProfile, updateUserProfile } from "services/client/account.service";
import {
  UpdateProfileSchema,
  TUpdateProfileSchema,
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

export { getAccountPage, postUpdateProfile };
