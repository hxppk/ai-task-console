// Task statuses for admin backend
export const ADMIN_TASK_STATUS = {
  QUEUED: '待创建',
  PARSING: '解析中',
  CREATING: '创建中',
  PENDING_CONFIRM: '待确认',
  COMPLETED: '已完成',
  PARTIAL_ERROR: '部分异常',
  ERROR: '创建异常',
}

// Task statuses for business list (simplified)
export const BIZ_TASK_STATUS = {
  CREATING: '创建中',
  PENDING_CONFIRM: '待确认',
  COMPLETED: '已完成',
}

// Coupon statuses for admin backend
export const ADMIN_COUPON_STATUS = {
  QUEUED: '排队中',
  CREATING: '创建中',
  COMPLETED: '已完成',
  FAILED: '失败',
}

// Coupon statuses for business list (simplified)
export const BIZ_COUPON_STATUS = {
  CREATING: '创建中',
  PENDING_CONFIRM: '待确认',
  CONFIRMED: '已确认',
}

// Status tag colors (antd Tag color prop)
export const ADMIN_TASK_STATUS_COLOR = {
  [ADMIN_TASK_STATUS.QUEUED]: 'default',
  [ADMIN_TASK_STATUS.PARSING]: 'processing',
  [ADMIN_TASK_STATUS.CREATING]: 'processing',
  [ADMIN_TASK_STATUS.PENDING_CONFIRM]: 'warning',
  [ADMIN_TASK_STATUS.COMPLETED]: 'success',
  [ADMIN_TASK_STATUS.PARTIAL_ERROR]: 'error',
  [ADMIN_TASK_STATUS.ERROR]: 'error',
}

export const ADMIN_COUPON_STATUS_COLOR = {
  [ADMIN_COUPON_STATUS.QUEUED]: 'default',
  [ADMIN_COUPON_STATUS.CREATING]: 'processing',
  [ADMIN_COUPON_STATUS.COMPLETED]: 'success',
  [ADMIN_COUPON_STATUS.FAILED]: 'error',
}

export const BIZ_TASK_STATUS_COLOR = {
  [BIZ_TASK_STATUS.CREATING]: 'processing',
  [BIZ_TASK_STATUS.PENDING_CONFIRM]: 'warning',
  [BIZ_TASK_STATUS.COMPLETED]: 'success',
}

export const BIZ_COUPON_STATUS_COLOR = {
  [BIZ_COUPON_STATUS.CREATING]: 'processing',
  [BIZ_COUPON_STATUS.PENDING_CONFIRM]: 'warning',
  [BIZ_COUPON_STATUS.CONFIRMED]: 'success',
}

// Coupon execution steps (for admin coupon detail drawer timeline)
export const COUPON_EXEC_STEPS = [
  '解析参数',
  '填写表单',
  '校验',
  '生成草稿',
  '确认提交',
  '结果回传',
]

// Task progress steps (for admin task detail stepper)
export const TASK_PROGRESS_STEPS = ['待创建', '解析', '创建', '待确认', '已完成']

// Mock subtask data keyed by task ID
// Each task now has 4 subtasks (one per Skill): 建活动, 创建人群, 建活动落地页, 建券
const subTasksByTask = {
  'TSK-20260308-001': [
    {
      id: 'SUB-001',
      name: '38女神节活动配置',
      skillType: '建活动',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '3.2s',
      execSteps: [
        { step: '解析活动参数', status: 'done', duration: '0.3s' },
        { step: '配置活动规则', status: 'done', duration: '1.8s' },
        { step: '设置活动玩法', status: 'done', duration: '0.8s' },
        { step: '生成活动草稿', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {
        activityType: '满减活动',
        startTime: '2026-03-08 00:00',
        endTime: '2026-03-10 23:59',
        budget: '50,000元',
      },
      items: [],
    },
    {
      id: 'SUB-002',
      name: '目标人群-年轻女性',
      skillType: '创建人群',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '1.5s',
      execSteps: [
        { step: '解析人群条件', status: 'done', duration: '0.2s' },
        { step: '圈选人群', status: 'done', duration: '1.0s' },
        { step: '生成人群包', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {
        crowdSize: '1,200,000',
        tags: '18-30岁, 女性, 近30天活跃',
        crowdId: 'CRD-20260308-001',
      },
      items: [],
    },
    {
      id: 'SUB-003',
      name: '活动落地页',
      skillType: '建活动落地页',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '2.8s',
      execSteps: [
        { step: '选择页面模板', status: 'done', duration: '0.2s' },
        { step: '填充活动内容', status: 'done', duration: '1.5s' },
        { step: '生成页面', status: 'done', duration: '1.1s' },
      ],
      errors: [],
      ext: {
        pageUrl: 'https://h5.example.com/act/38women2026',
        templateName: '节日大促模板',
      },
      items: [],
    },
    {
      id: 'SUB-004',
      name: '优惠券批次',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 3,
      completedItemCount: 3,
      duration: '14.5s',
      execSteps: [
        { step: '解析券参数', status: 'done', duration: '0.3s' },
        { step: '批量创建草稿', status: 'done', duration: '12.0s' },
        { step: '校验结果', status: 'done', duration: '0.5s' },
        { step: '等待确认', status: 'done', duration: null },
        { step: '结果回传', status: 'done', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        {
          id: 'ITEM-001',
          name: '满30减5通用券',
          status: '已完成',
          ext: { type: '满减', amount: '5元', scope: '全品类', validRange: '2026-03-10 ~ 03-25', stock: 8000, draftId: 'draft-20260310-001', bizStatus: '已确认' },
        },
        {
          id: 'ITEM-002',
          name: '8折小程序专享券',
          status: '已完成',
          ext: { type: '折扣', amount: '8折', scope: '小程序', validRange: '2026-03-10 ~ 03-25', stock: 3000, draftId: 'draft-20260310-002', bizStatus: '已确认' },
        },
        {
          id: 'ITEM-003',
          name: '新客立减10元券',
          status: '已完成',
          ext: { type: '立减', amount: '10元', scope: '新客专享', validRange: '2026-03-08 ~ 03-31', stock: 2000, draftId: 'draft-20260310-003', bizStatus: '已确认' },
        },
      ],
    },
  ],
  'TSK-20260310-002': [
    {
      id: 'SUB-005',
      name: '春季新品活动配置',
      skillType: '建活动',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '2.9s',
      execSteps: [
        { step: '解析活动参数', status: 'done', duration: '0.2s' },
        { step: '配置活动规则', status: 'done', duration: '1.6s' },
        { step: '设置活动玩法', status: 'done', duration: '0.7s' },
        { step: '生成活动草稿', status: 'done', duration: '0.4s' },
      ],
      errors: [],
      ext: {
        activityType: '新品首发',
        startTime: '2026-03-15 00:00',
        endTime: '2026-04-15 23:59',
        budget: '80,000元',
      },
      items: [],
    },
    {
      id: 'SUB-006',
      name: '目标人群-新品偏好用户',
      skillType: '创建人群',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '1.8s',
      execSteps: [
        { step: '解析人群条件', status: 'done', duration: '0.3s' },
        { step: '圈选人群', status: 'done', duration: '1.2s' },
        { step: '生成人群包', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {
        crowdSize: '2,500,000',
        tags: '新品偏好, 近7天浏览新品, 高消费力',
        crowdId: 'CRD-20260310-001',
      },
      items: [],
    },
    {
      id: 'SUB-007',
      name: '活动落地页',
      skillType: '建活动落地页',
      status: ADMIN_COUPON_STATUS.CREATING,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '选择页面模板', status: 'done', duration: '0.3s' },
        { step: '填充活动内容', status: 'running', duration: null },
        { step: '生成页面', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        pageUrl: null,
        templateName: '春季上新模板',
      },
      items: [],
    },
    {
      id: 'SUB-008',
      name: '优惠券批次',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.CREATING,
      itemCount: 5,
      completedItemCount: 2,
      duration: null,
      execSteps: [
        { step: '解析券参数', status: 'done', duration: '0.3s' },
        { step: '批量创建草稿', status: 'running', duration: null },
        { step: '校验结果', status: 'pending', duration: null },
        { step: '等待确认', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        {
          id: 'ITEM-004',
          name: '春季新品满50减10',
          status: '已完成',
          ext: { type: '满减', amount: '10元', scope: '新品类目', validRange: '2026-03-15 ~ 04-15', stock: 5000, draftId: 'draft-20260311-001', bizStatus: '已确认' },
        },
        {
          id: 'ITEM-005',
          name: '春季新品8.5折券',
          status: '已完成',
          ext: { type: '折扣', amount: '8.5折', scope: '新品类目', validRange: '2026-03-15 ~ 04-15', stock: 3000, draftId: 'draft-20260311-002', bizStatus: '待确认' },
        },
        {
          id: 'ITEM-006',
          name: '春季新品立减5元',
          status: '创建中',
          ext: { type: '立减', amount: '5元', scope: '全品类', validRange: '2026-03-15 ~ 04-15', stock: 8000, draftId: null, bizStatus: '创建中' },
        },
        {
          id: 'ITEM-007',
          name: '春季拉新20元券',
          status: '排队中',
          ext: { type: '立减', amount: '20元', scope: '新客专享', validRange: '2026-03-15 ~ 04-15', stock: 2000, draftId: null, bizStatus: '创建中' },
        },
        {
          id: 'ITEM-008',
          name: '春季满100减20',
          status: '排队中',
          ext: { type: '满减', amount: '20元', scope: '全品类', validRange: '2026-03-15 ~ 04-15', stock: 4000, draftId: null, bizStatus: '创建中' },
        },
      ],
    },
  ],
  'TSK-20260312-003': [
    {
      id: 'SUB-009',
      name: '会员日活动配置',
      skillType: '建活动',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '2.5s',
      execSteps: [
        { step: '解析活动参数', status: 'done', duration: '0.2s' },
        { step: '配置活动规则', status: 'done', duration: '1.5s' },
        { step: '设置活动玩法', status: 'done', duration: '0.5s' },
        { step: '生成活动草稿', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {
        activityType: '会员专享',
        startTime: '2026-03-15 00:00',
        endTime: '2026-03-15 23:59',
        budget: '30,000元',
      },
      items: [],
    },
    {
      id: 'SUB-010',
      name: '目标人群-活跃会员',
      skillType: '创建人群',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '1.3s',
      execSteps: [
        { step: '解析人群条件', status: 'done', duration: '0.2s' },
        { step: '圈选人群', status: 'done', duration: '0.8s' },
        { step: '生成人群包', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {
        crowdSize: '800,000',
        tags: '会员, 近30天消费≥2次, 活跃用户',
        crowdId: 'CRD-20260312-001',
      },
      items: [],
    },
    {
      id: 'SUB-011',
      name: '活动落地页',
      skillType: '建活动落地页',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '2.1s',
      execSteps: [
        { step: '选择页面模板', status: 'done', duration: '0.2s' },
        { step: '填充活动内容', status: 'done', duration: '1.2s' },
        { step: '生成页面', status: 'done', duration: '0.7s' },
      ],
      errors: [],
      ext: {
        pageUrl: 'https://h5.example.com/act/member-day-0315',
        templateName: '会员日模板',
      },
      items: [],
    },
    {
      id: 'SUB-012',
      name: '优惠券批次',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 2,
      completedItemCount: 2,
      duration: '11.4s',
      execSteps: [
        { step: '解析券参数', status: 'done', duration: '0.3s' },
        { step: '批量创建草稿', status: 'done', duration: '9.5s' },
        { step: '校验结果', status: 'done', duration: '0.5s' },
        { step: '等待确认', status: 'done', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        {
          id: 'ITEM-009',
          name: '会员日专属折扣券',
          status: '已完成',
          ext: { type: '折扣', amount: '7折', scope: '全品类', validRange: '2026-03-15 ~ 03-15', stock: 10000, draftId: 'draft-20260312-001', bizStatus: '待确认' },
        },
        {
          id: 'ITEM-010',
          name: '会员日满减券',
          status: '已完成',
          ext: { type: '满减', amount: '15元', scope: '全品类', validRange: '2026-03-15 ~ 03-15', stock: 5000, draftId: 'draft-20260312-002', bizStatus: '待确认' },
        },
      ],
    },
  ],
  'TSK-20260314-004': [
    {
      id: 'SUB-013',
      name: '周年庆活动配置',
      skillType: '建活动',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '3.0s',
      execSteps: [
        { step: '解析活动参数', status: 'done', duration: '0.3s' },
        { step: '配置活动规则', status: 'done', duration: '1.7s' },
        { step: '设置活动玩法', status: 'done', duration: '0.7s' },
        { step: '生成活动草稿', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {
        activityType: '周年庆典',
        startTime: '2026-04-01 00:00',
        endTime: '2026-04-30 23:59',
        budget: '120,000元',
      },
      items: [],
    },
    {
      id: 'SUB-014',
      name: '目标人群-门店周边用户',
      skillType: '创建人群',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '1.6s',
      execSteps: [
        { step: '解析人群条件', status: 'done', duration: '0.2s' },
        { step: '圈选人群', status: 'done', duration: '1.1s' },
        { step: '生成人群包', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {
        crowdSize: '500,000',
        tags: '春熙路3km范围, 近90天到店, 消费≥1次',
        crowdId: 'CRD-20260314-001',
      },
      items: [],
    },
    {
      id: 'SUB-015',
      name: '活动落地页',
      skillType: '建活动落地页',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '2.4s',
      execSteps: [
        { step: '选择页面模板', status: 'done', duration: '0.2s' },
        { step: '填充活动内容', status: 'done', duration: '1.4s' },
        { step: '生成页面', status: 'done', duration: '0.8s' },
      ],
      errors: [],
      ext: {
        pageUrl: 'https://h5.example.com/act/anniversary-chunxi',
        templateName: '周年庆模板',
      },
      items: [],
    },
    {
      id: 'SUB-016',
      name: '优惠券批次',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.FAILED,
      itemCount: 4,
      completedItemCount: 1,
      duration: null,
      execSteps: [
        { step: '解析券参数', status: 'done', duration: '0.3s' },
        { step: '批量创建草稿', status: 'failed', duration: '8.2s' },
        { step: '校验结果', status: 'pending', duration: null },
        { step: '等待确认', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: ['批量创建草稿失败：第1张券校验失败 - 有效期起始日期不能早于当前日期'],
      ext: {},
      items: [
        {
          id: 'ITEM-011',
          name: '周年庆满100减30',
          status: '失败',
          ext: { type: '满减', amount: '30元', scope: '全品类', validRange: '2026-04-01 ~ 04-30', stock: 6000, draftId: null, bizStatus: '创建中' },
        },
        {
          id: 'ITEM-012',
          name: '周年庆8折券',
          status: '已完成',
          ext: { type: '折扣', amount: '8折', scope: '全品类', validRange: '2026-04-01 ~ 04-30', stock: 8000, draftId: 'draft-20260314-001', bizStatus: '待确认' },
        },
        {
          id: 'ITEM-013',
          name: '周年庆新客立减15',
          status: '创建中',
          ext: { type: '立减', amount: '15元', scope: '新客专享', validRange: '2026-04-01 ~ 04-30', stock: 3000, draftId: null, bizStatus: '创建中' },
        },
        {
          id: 'ITEM-014',
          name: '周年庆满200减50',
          status: '排队中',
          ext: { type: '满减', amount: '50元', scope: '全品类', validRange: '2026-04-01 ~ 04-30', stock: 2000, draftId: null, bizStatus: '创建中' },
        },
      ],
    },
  ],
  'TSK-20260315-005': [
    {
      id: 'SUB-017',
      name: '咖啡品类活动配置',
      skillType: '建活动',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '2.6s',
      execSteps: [
        { step: '解析活动参数', status: 'done', duration: '0.2s' },
        { step: '配置活动规则', status: 'done', duration: '1.5s' },
        { step: '设置活动玩法', status: 'done', duration: '0.6s' },
        { step: '生成活动草稿', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {
        activityType: '品类促销',
        startTime: '2026-03-20 00:00',
        endTime: '2026-04-20 23:59',
        budget: '25,000元',
      },
      items: [],
    },
    {
      id: 'SUB-018',
      name: '目标人群-咖啡消费者',
      skillType: '创建人群',
      status: ADMIN_COUPON_STATUS.FAILED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析人群条件', status: 'done', duration: '0.3s' },
        { step: '圈选人群', status: 'failed', duration: '2.1s' },
        { step: '生成人群包', status: 'pending', duration: null },
      ],
      errors: ['圈选人群失败：门店清单格式不匹配，缺少必填列"门店编码"'],
      ext: {
        crowdSize: null,
        tags: '咖啡偏好, 近30天咖啡品类消费',
        crowdId: null,
      },
      items: [],
    },
    {
      id: 'SUB-019',
      name: '活动落地页',
      skillType: '建活动落地页',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '选择页面模板', status: 'pending', duration: null },
        { step: '填充活动内容', status: 'pending', duration: null },
        { step: '生成页面', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        pageUrl: null,
        templateName: null,
      },
      items: [],
    },
    {
      id: 'SUB-020',
      name: '优惠券批次',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析券参数', status: 'pending', duration: null },
        { step: '批量创建草稿', status: 'pending', duration: null },
        { step: '校验结果', status: 'pending', duration: null },
        { step: '等待确认', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        {
          id: 'ITEM-015',
          name: '咖啡品类拉新5元券',
          status: '排队中',
          ext: { type: '立减', amount: '5元', scope: '咖啡品类', validRange: '2026-03-20 ~ 04-20', stock: 10000, draftId: null, bizStatus: '创建中' },
        },
      ],
    },
  ],
  'TSK-20260316-006': [
    {
      id: 'SUB-021',
      name: '周末特惠活动配置',
      skillType: '建活动',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析活动参数', status: 'pending', duration: null },
        { step: '配置活动规则', status: 'pending', duration: null },
        { step: '设置活动玩法', status: 'pending', duration: null },
        { step: '生成活动草稿', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        activityType: null,
        startTime: null,
        endTime: null,
        budget: null,
      },
      items: [],
    },
    {
      id: 'SUB-022',
      name: '目标人群',
      skillType: '创建人群',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析人群条件', status: 'pending', duration: null },
        { step: '圈选人群', status: 'pending', duration: null },
        { step: '生成人群包', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        crowdSize: null,
        tags: null,
        crowdId: null,
      },
      items: [],
    },
    {
      id: 'SUB-023',
      name: '活动落地页',
      skillType: '建活动落地页',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '选择页面模板', status: 'pending', duration: null },
        { step: '填充活动内容', status: 'pending', duration: null },
        { step: '生成页面', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        pageUrl: null,
        templateName: null,
      },
      items: [],
    },
    {
      id: 'SUB-024',
      name: '优惠券批次',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 0,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析券参数', status: 'pending', duration: null },
        { step: '批量创建草稿', status: 'pending', duration: null },
        { step: '校验结果', status: 'pending', duration: null },
        { step: '等待确认', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [],
    },
  ],
}

// Mock tasks
export const tasks = [
  {
    id: 'TSK-20260308-001',
    name: '38女神节活动建券',
    source: 'OA审批',
    oaNumber: 'OA-2026-3842',
    activity: '38女神节全国大促',
    subTaskCount: 4,
    completedCount: 4,
    totalCouponCount: 3,
    adminStatus: ADMIN_TASK_STATUS.COMPLETED,
    bizStatus: BIZ_TASK_STATUS.COMPLETED,
    confirmedCount: 3,
    creator: '陈悦',
    createdAt: '2026-03-08 14:20',
  },
  {
    id: 'TSK-20260310-002',
    name: '春季新品上市优惠券',
    source: 'OA审批',
    oaNumber: 'OA-2026-3901',
    activity: '春季新品发布会',
    subTaskCount: 4,
    completedCount: 2,
    totalCouponCount: 5,
    adminStatus: ADMIN_TASK_STATUS.CREATING,
    bizStatus: BIZ_TASK_STATUS.CREATING,
    confirmedCount: 1,
    creator: '张文佳',
    createdAt: '2026-03-10 09:15',
  },
  {
    id: 'TSK-20260312-003',
    name: '会员日专属折扣券',
    source: 'OA审批',
    oaNumber: 'OA-2026-4001',
    activity: '3月会员日活动',
    subTaskCount: 4,
    completedCount: 4,
    totalCouponCount: 2,
    adminStatus: ADMIN_TASK_STATUS.PENDING_CONFIRM,
    bizStatus: BIZ_TASK_STATUS.PENDING_CONFIRM,
    confirmedCount: 0,
    creator: '林巧',
    createdAt: '2026-03-12 16:30',
  },
  {
    id: 'TSK-20260314-004',
    name: '门店周年庆满减券',
    source: 'OA审批',
    oaNumber: 'OA-2026-4012',
    activity: '春熙路店3周年',
    subTaskCount: 4,
    completedCount: 3,
    totalCouponCount: 4,
    adminStatus: ADMIN_TASK_STATUS.PARTIAL_ERROR,
    bizStatus: BIZ_TASK_STATUS.CREATING,
    confirmedCount: 0,
    creator: '骆颖',
    createdAt: '2026-03-14 11:00',
  },
  {
    id: 'TSK-20260315-005',
    name: '咖啡品类拉新券',
    source: '手动上传',
    oaNumber: null,
    activity: '咖啡日均提升计划',
    subTaskCount: 4,
    completedCount: 1,
    totalCouponCount: 1,
    adminStatus: ADMIN_TASK_STATUS.ERROR,
    bizStatus: BIZ_TASK_STATUS.CREATING,
    confirmedCount: 0,
    creator: '方鸣',
    createdAt: '2026-03-15 08:45',
  },
  {
    id: 'TSK-20260316-006',
    name: '周末特惠满减券',
    source: 'OA审批',
    oaNumber: 'OA-2026-4088',
    activity: '周末特惠活动',
    subTaskCount: 4,
    completedCount: 0,
    totalCouponCount: 0,
    adminStatus: ADMIN_TASK_STATUS.QUEUED,
    bizStatus: BIZ_TASK_STATUS.CREATING,
    confirmedCount: 0,
    creator: '李婷',
    createdAt: '2026-03-16 10:30',
  },
]

// Helper: get subtasks for a task
export function getSubTasksForTask(taskId) {
  return subTasksByTask[taskId] || []
}

// Helper: get a single task by ID
export function getTask(taskId) {
  return tasks.find((t) => t.id === taskId) || null
}

// Helper: get coupon items for a task (from the 建券 subtask)
export function getCouponItemsForTask(taskId) {
  const subTasks = getSubTasksForTask(taskId)
  const couponSubTask = subTasks.find(s => s.skillType === '建券')
  return couponSubTask ? couponSubTask.items : []
}

// Stats for admin dashboard
export function getAdminStats() {
  return {
    total: tasks.length,
    running: tasks.filter((t) => t.adminStatus === ADMIN_TASK_STATUS.CREATING).length,
    partialError: tasks.filter((t) => t.adminStatus === ADMIN_TASK_STATUS.PARTIAL_ERROR).length,
    error: tasks.filter((t) => t.adminStatus === ADMIN_TASK_STATUS.ERROR).length,
  }
}

// Stats for biz dashboard
export function getBizStats() {
  return {
    pendingConfirm: tasks.filter((t) => t.bizStatus === BIZ_TASK_STATUS.PENDING_CONFIRM).length,
    running: tasks.filter((t) => t.bizStatus === BIZ_TASK_STATUS.CREATING).length,
    completed: tasks.filter((t) => t.bizStatus === BIZ_TASK_STATUS.COMPLETED).length,
  }
}
