import {
  pgTable,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  decimal,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 行家表
export const experts = pgTable("experts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  avatar: text("avatar"),
  level: varchar("level", { length: 50 }).notNull().default("初级行家"), // 认证行家 | 金牌行家 | 战略行家 | 初级行家
  title: varchar("title", { length: 200 }),
  city: varchar("city", { length: 50 }),
  years: integer("years").default(0),
  intro: text("intro"),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0),
  caseCount: integer("case_count").default(0),
  hourlyRate: integer("hourly_rate").default(0),
  wechat: varchar("wechat", { length: 100 }),
  email: varchar("email", { length: 200 }),
  skills: text("skills").array(),
  status: varchar("status", { length: 20 }).default("active"), // active | inactive
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 技能标签表
export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  category: varchar("category", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// 模板表
export const templates = pgTable("templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 200 }).notNull(),
  thumbnail: text("thumbnail"),
  price: integer("price").default(0),
  authorId: uuid("author_id").references(() => experts.id),
  category: varchar("category", { length: 100 }),
  subcategory: varchar("subcategory", { length: 100 }),
  industry: varchar("industry", { length: 100 }),
  description: text("description"),
  features: text("features").array(),
  collectCount: integer("collect_count").default(0),
  status: varchar("status", { length: 20 }).default("active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 博客表
export const blogs = pgTable("blogs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 300 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  coverImage: text("cover_image"),
  authorId: uuid("author_id").references(() => experts.id),
  category: varchar("category", { length: 50 }),
  readCount: integer("read_count").default(0),
  status: varchar("status", { length: 20 }).default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 评价表
export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  expertId: uuid("expert_id").references(() => experts.id).notNull(),
  authorName: varchar("author_name", { length: 100 }),
  authorCompany: varchar("author_company", { length: 200 }),
  rating: integer("rating").notNull(), // 1-5
  content: text("content"),
  projectTitle: varchar("project_title", { length: 200 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// 用户表
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 200 }).unique(),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 200 }),
  role: varchar("role", { length: 20 }).default("user"), // user | expert | admin
  status: varchar("status", { length: 20 }).default("active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 需求表
export const demands = pgTable("demands", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectName: varchar("project_name", { length: 200 }).notNull(),
  projectType: varchar("project_type", { length: 50 }).notNull(), // 模板定制 | 系统开发 | 技术咨询 | 培训服务
  budgetMin: integer("budget_min"),
  budgetMax: integer("budget_max"),
  industry: varchar("industry", { length: 100 }),
  companySize: varchar("company_size", { length: 50 }), // 1-50人 | 50-200人 | 200-500人 | 500人以上
  description: text("description"),
  contactName: varchar("contact_name", { length: 100 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  contactEmail: varchar("contact_email", { length: 200 }),
  status: varchar("status", { length: 20 }).default("pending"), // pending | matched | in_progress | completed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 成功案例表
export const cases = pgTable("cases", {
  id: uuid("id").primaryKey().defaultRandom(),
  expertId: uuid("expert_id").references(() => experts.id).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  thumbnail: text("thumbnail"),
  industry: varchar("industry", { length: 100 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const expertsRelations = relations(experts, ({ many }) => ({
  templates: many(templates),
  blogs: many(blogs),
  reviews: many(reviews),
  cases: many(cases),
}));

export const templatesRelations = relations(templates, ({ one }) => ({
  author: one(experts, { fields: [templates.authorId], references: [experts.id] }),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
  author: one(experts, { fields: [blogs.authorId], references: [experts.id] }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  expert: one(experts, { fields: [reviews.expertId], references: [experts.id] }),
}));

export const casesRelations = relations(cases, ({ one }) => ({
  expert: one(experts, { fields: [cases.expertId], references: [experts.id] }),
}));
