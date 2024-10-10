import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { httpCode } from "../configs/constant.js";
import bcrypt from "bcrypt";

import { createAccessToken, createRefreshToken } from "../configs/jwt.js";

const model = initModels(sequelize);

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await model.users.findOne({
      where: {
        email,
      },
    });
    if (existUser) {
      return res
        .status(httpCode.BAD_REQUEST)
        .json({ message: "User da ton tai" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await model.users.create({
      name,
      email,
      password: hashPassword,
    });
    return res
      .status(httpCode.CREATED)
      .json({ message: "Dang ky thanh cong", data: newUser });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await model.users.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res
        .status(httpCode.UNAUTHORIZED)
        .json({ message: "User khong ton tai" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(httpCode.UNAUTHORIZED)
        .json({ message: "Password khong chinh xac" });
    }
    const payload = { userId: user.user_id, role: user.role };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    await model.users.update(
      { refresh_token: refreshToken },
      {
        where: {
          user_id: user.user_id,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(httpCode.OK)
      .json({ message: "Dang nhap thanh cong", data: accessToken });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const extendToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(httpCode.UNAUTHORIZED);
    }
    const checkRefreshToken = await model.users.findOne({
      refresh_token: refreshToken,
    });
    if (!checkRefreshToken) {
      return res.status(httpCode.UNAUTHORIZED);
    }
    const payload = {
      userId: checkRefreshToken.user_id,
      role: checkRefreshToken.role,
    };
    const accessToken = createAccessToken(payload);
    return res
      .status(httpCode.CREATED)
      .json({ message: "Tao token moi thanh cong", data: accessToken });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

export { register, login, extendToken };
