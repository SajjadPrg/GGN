import db from "./db";
import * as bcrypt from "bcrypt";

export const register = async (form: {
  username: string;
  email: string;
  password: string;
}): Promise<{ error: boolean; result: { message: string; data?: any } }> => {
  try {
    const userExist = await db.user.findFirst({
      where: { OR: [{ username: form.username }, { email: form.email }] },
    });
    if (userExist) {
      return {
        error: true,
        result: { message: "نام‌کاربری یا ایمل از قبل وجود دارد" },
      };
    }

    const hash = await bcrypt.hash(form.password, 10);
    const user = await db.user.create({
      data: {
        username: form.username,
        email: form.email,
        password: hash,
      },
    });

    //!TODO send activation email

    const { password, resetPassKey, id, ...data } = user;
    return {
      error: false,
      result: { message: "ثبت‌نام با موفقیت انجام شد", data },
    };
  } catch (error) {
    return { error: true, result: { message: "خطا در بخش سرویس" } };
  }
};
