import authRouter from "./auth";
import insertRouter from "./insert";
import categoryRouter from "./category";
import postRouter from "./post";
import priceRouter from "./price";
import areaRouter from "./area";
import provinceRouter from "./province";
import userRouter from "./user";
import paymentRouter from "./payment";
import historyRouter from "./history";
import favoriteRouter from "./favorite";
import feedbackRouter from "./feedback";
import ViewRouter from "./post_view";
import SummaryRouter from "./summary";
import UserSearchRouter from "./user_search";

const initRoutes = (app) => {
  app.use("/api/v1/payment", paymentRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/price", priceRouter);
  app.use("/api/v1/area", areaRouter);
  app.use("/api/v1/province", provinceRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/history", historyRouter);
  app.use("/api/v1/favorite", favoriteRouter);
  app.use("/api/v1/feedback", feedbackRouter);
  app.use("/api/v1/view", ViewRouter);
  app.use("/api/v1/summary", SummaryRouter);
  app.use("/api/v1/search", UserSearchRouter);

  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRoutes;
