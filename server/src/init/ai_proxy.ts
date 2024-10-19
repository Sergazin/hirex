import { app } from "./web_server";
import { Request, Response, NextFunction } from "express";
import proxy from "express-http-proxy";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set");

//const openai_url = "https://google.com";
const openai_url = "https://api.openai.com/v1";
//const openai_url = "https://zato93one.free.beeceptor.com";

const isMultipartRequest = function (req: Request) {
  let contentTypeHeader = req.headers["content-type"];
  return contentTypeHeader && contentTypeHeader.indexOf("multipart") > -1;
};

const proxyMiddleware = function () {
  return function (req: Request, res: Response, next: NextFunction) {
    let reqAsBuffer = false;
    let parseReqBody = true;
    if (isMultipartRequest(req)) {
      reqAsBuffer = true;
      parseReqBody = false;
    }
    return proxy(openai_url, {
      reqAsBuffer,
      parseReqBody,
      proxyReqOptDecorator: (opts) => {
        opts.headers!["Authorization"] = `Bearer ${OPENAI_API_KEY}`;
        return opts;
      },
    })(req, res, next);
  };
};

app.use("/api/ai-proxy", proxyMiddleware());
