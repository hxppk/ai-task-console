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
const subTasksByTask = {
  'TSK-20260308-001': [
    {
      id: 'SUB-001',
      name: '满30减5通用券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      duration: '4.8s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.1s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'done', duration: null },
        { step: '结果回传', status: 'done', duration: null },
      ],
      errors: [],
      ext: {
        type: '满减',
        amount: '5元',
        scope: '全品类',
        validRange: '2026-03-10 ~ 03-25',
        stock: 8000,
        draftId: 'draft-20260310-001',
        bizStatus: BIZ_COUPON_STATUS.CONFIRMED,
      },
    },
    {
      id: 'SUB-002',
      name: '8折小程序专享券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      duration: '5.2s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.5s' },
        { step: '校验', status: 'done', duration: '0.3s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'done', duration: null },
        { step: '结果回传', status: 'done', duration: null },
      ],
      errors: [],
      ext: {
        type: '折扣',
        amount: '8折',
        scope: '小程序',
        validRange: '2026-03-10 ~ 03-25',
        stock: 3000,
        draftId: 'draft-20260310-002',
        bizStatus: BIZ_COUPON_STATUS.CONFIRMED,
      },
    },
    {
      id: 'SUB-003',
      name: '新客立减10元券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      duration: '4.5s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '2.9s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '0.9s' },
        { step: '确认提交', status: 'done', duration: null },
        { step: '结果回传', status: 'done', duration: null },
      ],
      errors: [],
      ext: {
        type: '立减',
        amount: '10元',
        scope: '新客专享',
        validRange: '2026-03-08 ~ 03-31',
        stock: 2000,
        draftId: 'draft-20260310-003',
        bizStatus: BIZ_COUPON_STATUS.CONFIRMED,
      },
    },
  ],
  'TSK-20260310-002': [
    {
      id: 'SUB-004',
      name: '春季新品满50减10',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      duration: '5.0s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.3s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'done', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        type: '满减',
        amount: '10元',
        scope: '新品类目',
        validRange: '2026-03-15 ~ 04-15',
        stock: 5000,
        draftId: 'draft-20260311-001',
        bizStatus: BIZ_COUPON_STATUS.CONFIRMED,
      },
    },
    {
      id: 'SUB-005',
      name: '春季新品8.5折券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      duration: '4.7s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.0s' },
        { step: '校验', status: 'done', duration: '0.3s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        type: '折扣',
        amount: '8.5折',
        scope: '新品类目',
        validRange: '2026-03-15 ~ 04-15',
        stock: 3000,
        draftId: 'draft-20260311-002',
        bizStatus: BIZ_COUPON_STATUS.PENDING_CONFIRM,
      },
    },
    {
      id: 'SUB-006',
      name: '春季新品立减5元',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.CREATING,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'running', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        type: '立减',
        amount: '5元',
        scope: '全品类',
        validRange: '2026-03-15 ~ 04-15',
        stock: 8000,
        draftId: null,
        bizStatus: BIZ_COUPON_STATUS.CREATING,
      },
    },
    {
      id: 'SUB-007',
      name: '春季拉新20元券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        type: '立减',
        amount: '20元',
        scope: '新客专享',
        validRange: '2026-03-15 ~ 04-15',
        stock: 2000,
        draftId: null,
        bizStatus: BIZ_COUPON_STATUS.CREATING,
      },
    },
    {
      id: 'SUB-008',
      name: '春季满100减20',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        type: '满减',
        amount: '20元',
        scope: '全品类',
        validRange: '2026-03-15 ~ 04-15',
        stock: 4000,
        draftId: null,
        bizStatus: BIZ_COUPON_STATUS.CREATING,
      },
    },
  ],
  'TSK-20260312-003': [
    {
      id: 'SUB-009',
      name: '会员日专属折扣券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      duration: '6.1s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '4.2s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        type: '折扣',
        amount: '7折',
        scope: '全品类',
        validRange: '2026-03-15 ~ 03-15',
        stock: 10000,
        draftId: 'draft-20260312-001',
        bizStatus: BIZ_COUPON_STATUS.PENDING_CONFIRM,
      },
    },
    {
      id: 'SUB-010',
      name: '会员日满减券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      duration: '5.3s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.6s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        type: '满减',
        amount: '15元',
        scope: '全品类',
        validRange: '2026-03-15 ~ 03-15',
        stock: 5000,
        draftId: 'draft-20260312-002',
        bizStatus: BIZ_COUPON_STATUS.PENDING_CONFIRM,
      },
    },
  ],
  'TSK-20260314-004': [
    {
      id: 'SUB-011',
      name: '周年庆满100减30',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.FAILED,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.8s' },
        { step: '校验', status: 'failed', duration: '0.3s' },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: ['校验失败：有效期起始日期不能早于当前日期'],
      ext: {
        type: '满减',
        amount: '30元',
        scope: '全品类',
        validRange: '2026-04-01 ~ 04-30',
        stock: 6000,
        draftId: null,
        bizStatus: BIZ_COUPON_STATUS.CREATING,
      },
    },
    {
      id: 'SUB-012',
      name: '周年庆8折券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      duration: '5.0s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.2s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        type: '折扣',
        amount: '8折',
        scope: '全品类',
        validRange: '2026-04-01 ~ 04-30',
        stock: 8000,
        draftId: 'draft-20260314-001',
        bizStatus: BIZ_COUPON_STATUS.PENDING_CONFIRM,
      },
    },
    {
      id: 'SUB-013',
      name: '周年庆新客立减15',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.CREATING,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'running', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        type: '立减',
        amount: '15元',
        scope: '新客专享',
        validRange: '2026-04-01 ~ 04-30',
        stock: 3000,
        draftId: null,
        bizStatus: BIZ_COUPON_STATUS.CREATING,
      },
    },
    {
      id: 'SUB-014',
      name: '周年庆满200减50',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {
        type: '满减',
        amount: '50元',
        scope: '全品类',
        validRange: '2026-04-01 ~ 04-30',
        stock: 2000,
        draftId: null,
        bizStatus: BIZ_COUPON_STATUS.CREATING,
      },
    },
  ],
  'TSK-20260315-005': [
    {
      id: 'SUB-015',
      name: '咖啡品类拉新5元券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.FAILED,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'failed', duration: '2.1s' },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: ['填写表单失败：门店清单格式不匹配，缺少必填列"门店编码"'],
      ext: {
        type: '立减',
        amount: '5元',
        scope: '咖啡品类',
        validRange: '2026-03-20 ~ 04-20',
        stock: 10000,
        draftId: null,
        bizStatus: BIZ_COUPON_STATUS.CREATING,
      },
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
    skillType: '建券',
    subTaskCount: 3,
    completedCount: 3,
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
    skillType: '建券',
    subTaskCount: 5,
    completedCount: 2,
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
    skillType: '建券',
    subTaskCount: 2,
    completedCount: 2,
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
    skillType: '建券',
    subTaskCount: 4,
    completedCount: 1,
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
    skillType: '建券',
    subTaskCount: 1,
    completedCount: 0,
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
    skillType: '建券',
    subTaskCount: 3,
    completedCount: 0,
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
