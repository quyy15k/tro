import { Sequelize } from "sequelize";
import db from "../models";
import { query } from "express";
const { Op } = require("sequelize");
import { v4 as generateId } from "uuid";
import generateCode from "../ultis/generateCode";
import moment from "moment";
import generateDate from "../ultis/generateDate";

export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        order: [["createdAt", "DESC"]],
        attributes: [
          "id",
          "title",
          "star",
          "address",
          "description",
          "isActive",
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getPostsLimitService = (
  page,
  { limitPost, order, userId, searchText = [], ...query },
  { priceNumber, areaNumber }
) =>
  new Promise(async (resolve, reject) => {
    const favoriteAttribute = userId
      ? [
          Sequelize.literal(`(
                SELECT COUNT(1)
                FROM Favorites AS favorites
                WHERE favorites.postId = Post.id AND favorites.userId = '${userId}'
            )`),
          "favorite",
        ]
      : [Sequelize.literal("false"), "favorite"];
    const hadRentedAttribute = userId
      ? [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM Histories AS history
            WHERE history.postId = Post.id AND history.userId = '${userId}'
          )`),
          "hadRentedCount",
        ]
      : [Sequelize.literal("0"), "hadRentedCount"];

    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query };
      const limit = +limitPost || +process.env.LIMIT;
      queries.limit = limit;
      if (priceNumber) query.priceNumber = { [Op.between]: priceNumber };
      if (areaNumber) query.areaNumber = { [Op.between]: areaNumber };
      if (order) queries.order = [order];
      if (Array.isArray(searchText) && searchText.length > 0) {
        query.title = {
          [Op.or]: searchText.map((text) => ({ [Op.like]: `%${text}%` })),
        };
      } else if (searchText) {
        query.title = { [Op.like]: `%${searchText}%` };
      }

      const response = await db.Post.findAndCountAll({
        where: { ...query, isActive: true },
        raw: true,
        nest: true,
        offset: offset * limit,
        ...queries,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
          { model: db.Overview, as: "overviews" },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "address",
          "description",
          "quantity",
          favoriteAttribute,
          hadRentedAttribute,
        ],
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getNewPostService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        where: { isActive: true },
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
        ],
        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const createNewPostService = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const attributesId = generateId();
      const imagesId = generateId();
      const overviewId = generateId();
      const labelCode = generateCode(body.label);
      const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
      const currentData = generateDate();
      await db.Post.create({
        id: generateId(),
        title: body.title || null,
        labelCode,
        quantity: +body.quantity || 1,
        address: body.address || null,
        attributesId,
        categoryCode: body.categoryCode,
        description: JSON.stringify(body.description) || null,
        userId,
        overviewId,
        imagesId,
        areaCode: body.areaCode || null,
        priceCode: body.priceCode || null,
        provinceCode: body?.province?.includes("Thành phố")
          ? generateCode(body?.province?.replace("Thành phố", ""))
          : generateCode(body?.province?.replace("Tỉnh", "")) || null,
        priceNumber: body.priceNumber,
        areaNumber: body.areaNumber,
        isActive:false,
      });
      await db.Attribute.create({
        id: attributesId,
        price:
          +body.priceNumber < 1
            ? `${+body.priceNumber * 1000000} đồng/tháng`
            : `${body.priceNumber} triệu/tháng`,
        acreage: `${body.areaNumber} m2`,
        published: moment(new Date()).format("DD/MM/YYYY"),
        hashtag,
      });
      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(body.images),
      });
      await db.Overview.create({
        id: overviewId,
        code: hashtag,
        area: body.label,
        type: body?.category,
        target: body?.target,
        bonus: "Tin Thường",
        created: currentData.today,
        expired: currentData.expireDay,
      });
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố", "") },
            { value: body?.province?.replace("Tỉnh", "") },
          ],
        },
        default: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố", ""))
            : generateCode(body?.province?.replace("Tỉnh", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố", "")
            : body?.province?.replace("Tỉnh", ""),
        },
      });

      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        default: {
          code: labelCode,
          value: body.label,
        },
      });
      resolve({
        err: 0,
        msg: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });
export const getPostsLimitAdminService = (page, id, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query, userId: id };
      const response = await db.Post.findAndCountAll({
        where: {
          ...queries,
          isActive: true,
        },
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        order: [["createdAt", "DESC"]],
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
          { model: db.Overview, as: "overviews" },
        ],
        // attributes: ['id', 'title', 'star', 'address', 'description']
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const updatePost = ({
  postId,
  overviewId,
  imagesId,
  attributesId,
  ...body
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const labelCode = generateCode(body.label);
      await db.Post.update(
        {
          title: body.title,
          labelCode,
          address: body.address || null,
          categoryCode: body.categoryCode,
          description: JSON.stringify(body.description) || null,
          areaCode: body.areaCode || null,
          priceCode: body.priceCode || null,
          quantity: +body.quantity,
          provinceCode: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố", ""))
            : generateCode(body?.province?.replace("Tỉnh", "")) || null,
          priceNumber: body.priceNumber,
          areaNumber: body.areaNumber,
        },
        {
          where: { id: postId },
        }
      );
      await db.Attribute.update(
        {
          price:
            +body.priceNumber < 1
              ? `${+body.priceNumber * 1000000} đồng/tháng`
              : `${body.priceNumber} triệu/tháng`,
          acreage: `${body.areaNumber} m2`,
        },
        {
          where: { id: attributesId },
        }
      );
      await db.Image.update(
        {
          image: JSON.stringify(body.images),
        },
        {
          where: { id: imagesId },
        }
      );
      await db.Overview.update(
        {
          area: body.label,
          type: body?.category,
          target: body?.target,
        },
        {
          where: { id: overviewId },
        }
      );
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố", "") },
            { value: body?.province?.replace("Tỉnh", "") },
          ],
        },
        default: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố", ""))
            : generateCode(body?.province?.replace("Tỉnh", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố", "")
            : body?.province?.replace("Tỉnh", ""),
        },
      });

      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        default: {
          code: labelCode,
          value: body.label,
        },
      });
      resolve({
        err: 0,
        msg: "UPDATED",
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateStatusPost = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.update(payload, {
        where: { id },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Đã ẩn" : " failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const deletePost = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: { id: postId },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Đã xoá" : " failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
