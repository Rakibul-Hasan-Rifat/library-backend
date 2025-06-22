import app from "./app";
import { port } from "./app/configs/env.variables";
import { serverConnect } from "./app/configs/server.config";

const main = async () => {
  try {
    await serverConnect();
    // app.listen(port, () => {
    //   console.log(`The app is running at http://localhost:${port}`);
    // });
  } catch (error) {
    console.log(error);
  }
};

main();

export default app;