import { prisma } from "./db.server";
import type { User } from "@prisma/client";
import { createCookieSessionStorage } from "@remix-run/node";
import { hashSync, compareSync } from "bcrypt";
import { redirect, json } from "@remix-run/node";

import serverError from "./../models/ServerError";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: ["thisismysecret"],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
  },
});

const createUserSession = async (userId: string, redirectTo: string) => {
  let session;
  try {
    session = await sessionStorage.getSession();
  } catch (error) {
    throw error;
  }
  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};

export const getUserFromSession = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");
  if (!userId) {
    throw redirect("/auth");
  }
  let user;
  try {
    user = await prisma.user.findFirst({
      where: { id: userId },
      include: { socialMedias: true },
    });
  } catch (error) {
    throw error;
  }
  if (!user) {
    throw redirect("/auth");
  }
  return user;
};
export const logout = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  try {
    const res = await sessionStorage.destroySession(session);
    return redirect("/auth", { headers: { "Set-Cookie": res } });
  } catch (error) {
    throw error;
  }
};
export const getRootUser = async () => {
  let user;
  try {
    user = await prisma.user.findFirst({
      where: { id: "64432d0ba5e18c1697a2e04c" },
      include: {
        socialMedias: true,
        projects: {
          include: {
            technologies: true,
            projectFeatureImages: {
              orderBy: { priority: "asc" },
              include: { multiScreenImages: { orderBy: { priority: "asc" } } },
            },
          },
        },
        technologies: true,
      },
    });
  } catch (error) {
    throw error;
  }
  const { password, ...userData } = user!;
  return userData;
};

export const register = async (userData: any) => {
  let user;
  try {
    const hashedPassword = hashSync(userData.password, 8);
    user = await prisma.user.create({
      data: {
        name: userData.name,
        secondaryEmail: userData.secondaryEmail,
        profileImage: "",
        contactNumber: "",
        firstLineAbout: "",
        secondLineAbout: "",
        thirdLineAbout: "",
        username: userData.username,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw error;
  }
  if (!user) {
    throw serverError(500, "Something went wrong");
  }

  try {
    return await createUserSession(user.id!, "/my-project");
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId: string, userData: any) => {
  try {
    await prisma.user.update({ where: { id: userId }, data: { ...userData } });
  } catch (error) {
    throw error;
  }
};

export const login = async (credientials: any) => {
  let user;
  try {
    user = await prisma.user.findFirst({
      where: { username: credientials.username },
    });
  } catch (error) {
    throw error;
  }
  if (!user) {
    throw serverError(404, "User not found");
  }

  const checkingPassword = compareSync(credientials.password, user.password);
  if (!checkingPassword) {
    throw serverError(403, "Authentication failed");
  }
  try {
    return await createUserSession(user.id!, "/my-project");
  } catch (error) {
    throw error;
  }
};
