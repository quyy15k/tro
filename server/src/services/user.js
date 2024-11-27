import { where } from "sequelize";
import db from "../models";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const getOne = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id, isActive: true },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get user.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getAllUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        raw: true,
        attributes: {
          exclude: ["password", "avatar"],
        },
        order: [["createdAt", "DESC"]],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get user.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateUser = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(payload, {
        where: { id },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? "UP" : "Failed to update user.",
      });
    } catch (error) {
      reject(error);
    }
  });
export const adminUpdateUserInfo = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(payload, {
        where: { id },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? "UP" : "Failed to update user.",
      });
    } catch (error) {
      reject(error);
    }
  });
export const adminCreateUserInfo = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.create({
        ...payload,
        password: hashPassword(payload.password),
        id: v4(),
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "User created successfully." : "Failed to create user.",
      });
    } catch (error) {
      reject(error);
    }
  });
