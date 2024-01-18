const sentOtpToUser = async (model, userId, otp) => {
  try {
    // step 3: creating verification token
    const token = await model.create({
      owner: userId,
      token: otp,
    });
    if (!token) throw createError(403, "User token not created");

    return token;
  } catch (error) {
    return error;
  }
};

module.exports = {
  sentOtpToUser,
};
