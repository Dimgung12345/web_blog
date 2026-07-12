import crypto from "crypto";
import db from "../../models/index.js";

const SESSION_COOKIE = "session_id";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const sessions = new Map();

export const sessionMiddleware = (req, res, next) => {
  const sessionId = req.cookies[SESSION_COOKIE];
  if (sessionId && sessions.has(sessionId)) {
    const session = sessions.get(sessionId);
    if (Date.now() - session.createdAt < SESSION_TTL_MS) req.internalUserId = session.userId
    else {
      sessions.delete(sessionId)
      return res.redirect("/blog/login")
    };
    next()
  } else {
    return res.redirect("/blog/login");
  }
};

export const createSession = (userId) => {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, { userId, createdAt: Date.now() });
  return sessionId;
};

export const destroySession = (sessionId) => {
  sessions.delete(sessionId);
};

export const regenerateSession = (sessionId) => {
  if (!sessions.has(sessionId)) return null;
  const data = sessions.get(sessionId);
  sessions.delete(sessionId);
  const newSessionId = crypto.randomUUID();
  sessions.set(newSessionId, data);
  return newSessionId;
};

export const clearAllSessions = () => sessions.clear();

export const getSession = (sessionId) => sessions.get(sessionId) || null;

const getSessionData = (req) => {
  const sessionId = req.cookies[SESSION_COOKIE];
  if (!sessionId || !sessions.has(sessionId)) return null;
  const session = sessions.get(sessionId);
  if (Date.now() - session.createdAt >= SESSION_TTL_MS) {
    sessions.delete(sessionId);
    return null;
  }
  return { userId: session.userId, sessionId };
};

export const auth = (...allowedRoles) => {
  return async (req, res, next) => {
    if (allowedRoles.length === 0) return next();

    const data = getSessionData(req);
    if (!data) return res.redirect("/blog/login");

    req.internalUserId = data.userId;

    try {
      const user = await db.User.findByPk(data.userId, {
        attributes: ["id", "role", "username", "email"],
      });
      if (!user) {
        sessions.delete(data.sessionId);
        return res.redirect("/blog/login");
      }
      req.user = user;

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).render("pages/public/403");
      }

      next();
    } catch (err) {
      return res.status(500).send("Authentication error");
    }
  };
};
