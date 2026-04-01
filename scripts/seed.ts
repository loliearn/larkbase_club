import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_paDV4usRh2Tq@ep-withered-violet-a4gr3xx4-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(connectionString);

async function seed() {
  console.log("Seeding database...");

  // Insert experts
  const expertsResult = await sql`
    INSERT INTO experts (id, name, avatar, level, title, city, years, intro, rating, review_count, case_count, hourly_rate, wechat, email, skills, status)
    VALUES
      ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', '张明', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang', '认证行家', '飞书多维表格专家', '北京', 5, '专注飞书多维表格解决方案，帮助20+企业完成数字化转型。', 4.8, 45, 12, 300, 'lark_expert_001', 'zhangming@larkbase.club', ARRAY['多维表格', '自动化', 'API集成', '数据看板', 'CRM'], 'active'),
      ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', '李静', 'https://api.dicebear.com/7.x/avataaars/svg?seed=li', '金牌行家', '系统集成专家', '上海', 8, '10年企业数字化经验，擅长系统集成与流程自动化。', 4.9, 102, 45, 500, 'lark_expert_002', 'lijing@larkbase.club', ARRAY['系统集成', 'API集成', '自动化', 'CRM'], 'active'),
      ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', '王强', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang', '认证行家', '数据可视化专家', '深圳', 3, '数据驱动型顾问，专注于可视化与自动化方案。', 4.6, 28, 8, 200, 'lark_expert_003', 'wangqiang@larkbase.club', ARRAY['数据看板', '自动化', '多维表格'], 'active'),
      ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', '赵丽', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhao', '初级行家', '多维表格培训师', '杭州', 2, '专注于多维表格入门培训与模板定制。', 4.7, 15, 5, 150, 'lark_expert_004', 'zhaoli@larkbase.club', ARRAY['多维表格', '模板定制', '培训'], 'active'),
      ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', '陈伟', 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen', '认证行家', '企业数字化顾问', '上海', 6, '帮助制造业客户实现数字化转型，拥有丰富的MES系统经验。', 4.9, 78, 22, 400, 'lark_expert_005', 'chenwei@larkbase.club', ARRAY['多维表格', '系统集成', '自动化'], 'active'),
      ('a1b2c3d4-e5f6-7890-abcd-ef1234567806', '刘芳', 'https://api.dicebear.com/7.x/avataaars/svg?seed=liu', '认证行家', 'CRM系统专家', '北京', 4, '专注于客户关系管理系统搭建与销售流程优化。', 4.7, 33, 10, 280, 'lark_expert_006', 'liufang@larkbase.club', ARRAY['CRM', '数据看板', '模板定制'], 'active')
    RETURNING id, name
  `;
  console.log("Inserted experts:", expertsResult.length);

  // Insert templates
  const templatesResult = await sql`
    INSERT INTO templates (id, title, thumbnail, price, author_id, category, subcategory, industry, description, features, collect_count, status)
    VALUES
      ('b1b2c3d4-e5f6-7890-abcd-ef1234567801', '电商CRM系统', '', 299, 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', '销售管理', '客户管理', '零售/电商', '专为电商企业设计的CRM系统，包含客户信息管理、销售跟进、商机漏斗等功能。', ARRAY['客户信息管理', '销售跟进记录', '商机漏斗分析', '自动提醒功能'], 28, 'active'),
      ('b1b2c3d4-e5f6-7890-abcd-ef1234567802', '制造业MES系统', '', 599, 'a1b2c3d4-e5f6-7890-abcd-ef1234567805', '生产制造', '生产管理', '制造业', '面向制造业的生产执行系统，实时监控生产进度与质量。', ARRAY['生产进度追踪', '质量检测管理', '设备维护记录', '生产报表分析'], 45, 'active'),
      ('b1b2c3d4-e5f6-7890-abcd-ef1234567803', '连锁门店督导系统', '', 0, 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', '运营管理', '门店管理', '连锁门店', '连锁门店多维度督导检查系统，支持巡店任务与问题跟踪。', ARRAY['巡店任务管理', '问题上报跟踪', '数据统计分析', '多门店统一管理'], 12, 'active'),
      ('b1b2c3d4-e5f6-7890-abcd-ef1234567804', '客户池管理', '', 199, 'a1b2c3d4-e5f6-7890-abcd-ef1234567806', '销售管理', '客户管理', '通用', '统一的客户资源管理平台，防止客户流失，提升跟进效率。', ARRAY['客户信息录入', '跟进记录管理', '客户分层管理', '流失预警'], 8, 'active'),
      ('b1b2c3d4-e5f6-7890-abcd-ef1234567805', '销售漏斗管理', '', 399, 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', '销售管理', '商机管理', '通用', '可视化销售漏斗，从线索到成交全流程追踪。', ARRAY['线索管理', '商机转化追踪', '阶段可视化', '业绩预测'], 35, 'active'),
      ('b1b2c3d4-e5f6-7890-abcd-ef1234567806', '进销存管理系统', '', 499, 'a1b2c3d4-e5f6-7890-abcd-ef1234567805', '运营管理', '采购管理', '通用', '完整的进销存管理方案，采购、销售、库存一体化。', ARRAY['采购管理', '库存实时同步', '销售订单管理', '财务报表'], 22, 'active'),
      ('b1b2c3d4-e5f6-7890-abcd-ef1234567807', '项目任务管理', '', 0, 'a1b2c3d4-e5f6-7890-abcd-ef1234567804', '运营管理', '项目管理', '通用', '团队协作与项目进度管理工具，支持看板与列表视图。', ARRAY['任务分配', '进度追踪', '甘特图视图', '团队协作'], 56, 'active'),
      ('b1b2c3d4-e5f6-7890-abcd-ef1234567808', '人力资源管理', '', 599, 'a1b2c3d4-e5f6-7890-abcd-ef1234567806', '人力资源', '员工管理', '通用', '员工档案管理、考勤统计、绩效评估一体化系统。', ARRAY['员工档案管理', '考勤数据统计', '绩效考核', '假期管理'], 18, 'active')
    RETURNING id, title
  `;
  console.log("Inserted templates:", templatesResult.length);

  // Insert blogs
  const blogsResult = await sql`
    INSERT INTO blogs (id, title, excerpt, content, cover_image, author_id, category, read_count, status, published_at)
    VALUES
      ('c1b2c3d4-e5f6-7890-abcd-ef1234567801', '飞书多维表格入门指南：从零开始搭建你的第一个多维表格', '从零开始搭建你的第一个多维表格，详细讲解基础操作与视图切换。', '本文详细介绍如何从零开始使用飞书多维表格...', '', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', '教程', 1280, 'published', NOW()),
      ('c1b2c3d4-e5f6-7890-abcd-ef1234567802', '如何选择合适的行家', '企业数字化转型中如何筛选匹配的行家服务，避免踩坑。', '企业在选择数字化转型服务商时，需要注意...', '', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', '行业洞察', 856, 'published', NOW()),
      ('c1b2c3d4-e5f6-7890-abcd-ef1234567803', '进阶指南：自动化工作流', '利用多维表格自动化功能提升团队效率，详解IFTTT和工作流。', '飞书多维表格的自动化功能可以大大提升工作效率...', '', 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', '教程', 2103, 'published', NOW()),
      ('c1b2c3d4-e5f6-7890-abcd-ef1234567804', '最佳实践：行业解决方案合集', '各行业多维表格解决方案汇总，电商、制造、零售全覆盖。', '本文汇总了多个行业的多维表格最佳实践方案...', '', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', '行业洞察', 1580, 'published', NOW())
    RETURNING id, title
  `;
  console.log("Inserted blogs:", blogsResult.length);

  // Insert reviews
  const reviewsResult = await sql`
    INSERT INTO reviews (id, expert_id, author_name, author_company, rating, content, project_title, created_at)
    VALUES
      ('d1b2c3d4-e5f6-7890-abcd-ef1234567801', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', '王总', '某科技公司', 5, '张明老师非常专业，项目交付及时，以后还会合作。整个沟通过程非常顺畅，需求理解到位。', '电商CRM系统定制', NOW() - INTERVAL '15 days'),
      ('d1b2c3d4-e5f6-7890-abcd-ef1234567802', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', '李总', '某零售公司', 5, '帮我们搭建的CRM系统大大提升了团队效率，非常满意！', '销售流程优化', NOW() - INTERVAL '10 days'),
      ('d1b2c3d4-e5f6-7890-abcd-ef1234567803', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', '赵总', '某制造企业', 5, '李静老师对系统集成有很深理解，帮我们打通了多个系统的数据孤岛。', 'MES系统集成', NOW() - INTERVAL '20 days'),
      ('d1b2c3d4-e5f6-7890-abcd-ef1234567804', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', '周总', '某贸易公司', 4, '专业度高，但交付周期稍微长了一些。整体满意。', '业务流程自动化', NOW() - INTERVAL '5 days'),
      ('d1b2c3d4-e5f6-7890-abcd-ef1234567805', 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', '刘总', '某数据公司', 5, '王强的数据看板做得非常漂亮，领导层很满意！', '管理层数据看板', NOW() - INTERVAL '8 days')
    RETURNING id
  `;
  console.log("Inserted reviews:", reviewsResult.length);

  // Insert cases
  const casesResult = await sql`
    INSERT INTO cases (id, expert_id, title, thumbnail, industry, description, created_at)
    VALUES
      ('e1b2c3d4-e5f6-7890-abcd-ef1234567801', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', '电商CRM系统', '', '零售/电商', '为某电商企业搭建完整的CRM系统，客户满意度提升40%。', NOW() - INTERVAL '30 days'),
      ('e1b2c3d4-e5f6-7890-abcd-ef1234567802', 'a1b2c3d4-e5f6-7890-abcd-ef1234567805', '制造业MES系统', '', '制造业', '为某制造企业实施MES系统，产能提升25%。', NOW() - INTERVAL '45 days'),
      ('e1b2c3d4-e5f6-7890-abcd-ef1234567803', 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', '连锁门店督导系统', '', '连锁门店', '为某连锁品牌搭建督导系统，巡店效率提升60%。', NOW() - INTERVAL '20 days'),
      ('e1b2c3d4-e5f6-7890-abcd-ef1234567804', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', '企业数据中台', '', '金融', '帮助某金融企业搭建数据中台，打通12个业务系统。', NOW() - INTERVAL '60 days')
    RETURNING id
  `;
  console.log("Inserted cases:", casesResult.length);

  console.log("Seed completed!");
}

seed().catch(console.error);
