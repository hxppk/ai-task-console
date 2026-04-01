// Task statuses for admin backend (lifecycle ends at draft_ready)
export const ADMIN_TASK_STATUS = {
  PENDING: '待创建',
  PROCESSING: '创建中',
  DRAFT_READY: '草稿已就绪',
  PARTIAL_ERROR: '部分异常',
  ERROR: '创建异常',
}

// Task statuses for business list (biz lifecycle)
export const BIZ_TASK_STATUS = {
  PROCESSING: '处理中',
  PENDING_CONFIRM: '待确认',
  CONFIRMED: '已确认',
  DISCARDED: '已废弃',
}

// Coupon statuses for admin backend
export const ADMIN_COUPON_STATUS = {
  QUEUED: '排队中',
  CREATING: '创建中',
  COMPLETED: '已完成',
  FAILED: '失败',
}

// Coupon statuses for business list
export const BIZ_COUPON_STATUS = {
  PROCESSING: '处理中',
  PENDING_CONFIRM: '待确认',
  CONFIRMED: '已确认',
  DISCARDED: '已废弃',
}

// Status tag colors (antd Tag color prop)
export const ADMIN_TASK_STATUS_COLOR = {
  [ADMIN_TASK_STATUS.PENDING]: 'default',
  [ADMIN_TASK_STATUS.PROCESSING]: 'processing',
  [ADMIN_TASK_STATUS.DRAFT_READY]: 'success',
  [ADMIN_TASK_STATUS.PARTIAL_ERROR]: 'warning',
  [ADMIN_TASK_STATUS.ERROR]: 'error',
}

export const ADMIN_COUPON_STATUS_COLOR = {
  [ADMIN_COUPON_STATUS.QUEUED]: 'default',
  [ADMIN_COUPON_STATUS.CREATING]: 'processing',
  [ADMIN_COUPON_STATUS.COMPLETED]: 'success',
  [ADMIN_COUPON_STATUS.FAILED]: 'error',
}

export const BIZ_TASK_STATUS_COLOR = {
  [BIZ_TASK_STATUS.PROCESSING]: 'processing',
  [BIZ_TASK_STATUS.PENDING_CONFIRM]: 'warning',
  [BIZ_TASK_STATUS.CONFIRMED]: 'success',
  [BIZ_TASK_STATUS.DISCARDED]: 'default',
}

export const BIZ_COUPON_STATUS_COLOR = {
  [BIZ_COUPON_STATUS.PROCESSING]: 'processing',
  [BIZ_COUPON_STATUS.PENDING_CONFIRM]: 'warning',
  [BIZ_COUPON_STATUS.CONFIRMED]: 'success',
  [BIZ_COUPON_STATUS.DISCARDED]: 'default',
}

// Coupon execution steps (admin view — ends at 生成草稿)
export const ADMIN_COUPON_EXEC_STEPS = [
  '解析参数',
  '填写表单',
  '校验',
  '生成草稿',
]

// Biz-side execution steps (after admin delivers draft)
export const BIZ_COUPON_EXEC_STEPS = [
  '等待业务确认',
  '确认后提交',
  '结果回传',
]

// Task progress steps (for admin task detail stepper)
export const TASK_PROGRESS_STEPS = ['待创建', '创建中', '草稿已就绪']

// Mock subtask data keyed by task ID
// Each task has subtasks (one per Skill): 建玩法, AIGC内容, 创建人群, 建活动落地页, 建券(每张券独立SubTask)
const subTasksByTask = {
  'TSK-20260308-001': [
    {
      id: 'SUB-001',
      name: '38女神节活动配置',
      skillType: '建玩法',
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
      name: '38女神节活动素材',
      skillType: 'AIGC内容',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 3,
      completedItemCount: 3,
      duration: '8.5s',
      execSteps: [
        { step: '解析创意需求', status: 'done', duration: '0.3s' },
        { step: '生成 AI 图片', status: 'done', duration: '6.8s' },
        { step: '图片质检', status: 'done', duration: '1.0s' },
        { step: '输出交付', status: 'done', duration: '0.4s' },
      ],
      errors: [],
      ext: {
        contentType: '活动主视觉+分享图',
        style: '国潮插画风',
        prompt: '38女神节主题，粉色浪漫风格，花朵元素，温馨氛围',
      },
      items: [
        { id: 'ITEM-A01', name: '活动主视觉-方案A', status: '已完成', ext: { imageType: '主视觉', resolution: '1920×1080', format: 'PNG' } },
        { id: 'ITEM-A02', name: '活动主视觉-方案B', status: '已完成', ext: { imageType: '主视觉', resolution: '1920×1080', format: 'PNG' } },
        { id: 'ITEM-A03', name: '社交分享图', status: '已完成', ext: { imageType: '分享图', resolution: '1080×1080', format: 'PNG' } },
      ],
    },
    {
      id: 'SUB-042',
      name: '满30减5通用券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.2s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.2s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.3s' },
        { step: '等待业务确认', status: 'done', duration: null },
        { step: '确认后提交', status: 'done', duration: null },
        { step: '结果回传', status: 'done', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-001', name: '满30减5通用券', status: '已完成', ext: { type: '满减', amount: '5元', scope: '全品类', validRange: '2026-03-10 ~ 03-25', stock: 8000, draftId: 'draft-20260310-001', bizStatus: '已确认' } },
      ],
    },
    {
      id: 'SUB-043',
      name: '8折小程序专享券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '4.8s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.0s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '等待业务确认', status: 'done', duration: null },
        { step: '确认后提交', status: 'done', duration: null },
        { step: '结果回传', status: 'done', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-002', name: '8折小程序专享券', status: '已完成', ext: { type: '折扣', amount: '8折', scope: '小程序', validRange: '2026-03-10 ~ 03-25', stock: 3000, draftId: 'draft-20260310-002', bizStatus: '已确认' } },
      ],
    },
    {
      id: 'SUB-044',
      name: '新客立减10元券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.0s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.5s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '0.8s' },
        { step: '等待业务确认', status: 'done', duration: null },
        { step: '确认后提交', status: 'done', duration: null },
        { step: '结果回传', status: 'done', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-003', name: '新客立减10元券', status: '已完成', ext: { type: '立减', amount: '10元', scope: '新客专享', validRange: '2026-03-08 ~ 03-31', stock: 2000, draftId: 'draft-20260310-003', bizStatus: '已确认' } },
      ],
    },
  ],
  'TSK-20260308-002': [
    {
      id: 'SUB-005',
      name: '38女神节门店活动配置',
      skillType: '建玩法',
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
        activityType: '门店促销',
        startTime: '2026-03-08 00:00',
        endTime: '2026-03-10 23:59',
        budget: '30,000元',
      },
      items: [],
    },
    {
      id: 'SUB-045',
      name: '门店满30减8券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.1s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.2s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.2s' },
        { step: '等待业务确认', status: 'done', duration: null },
        { step: '确认后提交', status: 'done', duration: null },
        { step: '结果回传', status: 'done', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-004', name: '门店满30减8券', status: '已完成', ext: { type: '满减', amount: '8元', scope: '门店专享', validRange: '2026-03-08 ~ 03-10', stock: 5000, draftId: 'draft-20260308-004', bizStatus: '已确认' } },
      ],
    },
    {
      id: 'SUB-046',
      name: '门店9折券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '4.9s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.0s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '1.2s' },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-005', name: '门店9折券', status: '已完成', ext: { type: '折扣', amount: '9折', scope: '门店专享', validRange: '2026-03-08 ~ 03-10', stock: 3000, draftId: 'draft-20260308-005', bizStatus: '待确认' } },
      ],
    },
    {
      id: 'SUB-047',
      name: '门店新客立减3元',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.CREATING,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'running', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-006', name: '门店新客立减3元', status: '创建中', ext: { type: '立减', amount: '3元', scope: '门店新客', validRange: '2026-03-08 ~ 03-10', stock: 8000, draftId: null, bizStatus: '处理中' } },
      ],
    },
    {
      id: 'SUB-048',
      name: '门店满50减12券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-007', name: '门店满50减12券', status: '排队中', ext: { type: '满减', amount: '12元', scope: '门店专享', validRange: '2026-03-08 ~ 03-10', stock: 2000, draftId: null, bizStatus: '处理中' } },
      ],
    },
    {
      id: 'SUB-049',
      name: '门店7折限时券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-008', name: '门店7折限时券', status: '排队中', ext: { type: '折扣', amount: '7折', scope: '门店限时', validRange: '2026-03-08 ~ 03-10', stock: 4000, draftId: null, bizStatus: '处理中' } },
      ],
    },
  ],
  'TSK-20260310-003': [
    {
      id: 'SUB-009',
      name: '春季新品活动配置',
      skillType: '建玩法',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '3.0s',
      execSteps: [
        { step: '解析活动参数', status: 'done', duration: '0.3s' },
        { step: '配置活动规则', status: 'done', duration: '1.6s' },
        { step: '设置活动玩法', status: 'done', duration: '0.8s' },
        { step: '生成活动草稿', status: 'done', duration: '0.3s' },
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
      id: 'SUB-010',
      name: '目标人群-新品偏好用户',
      skillType: '创建人群',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '1.8s',
      execSteps: [
        { step: '解析人群条件', status: 'done', duration: '0.2s' },
        { step: '圈选人群', status: 'done', duration: '1.3s' },
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
      id: 'SUB-011',
      name: '活动落地页',
      skillType: '建活动落地页',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '2.5s',
      execSteps: [
        { step: '选择页面模板', status: 'done', duration: '0.2s' },
        { step: '填充活动内容', status: 'done', duration: '1.5s' },
        { step: '生成页面', status: 'done', duration: '0.8s' },
      ],
      errors: [],
      ext: {
        pageUrl: 'https://h5.example.com/act/spring2026',
        templateName: '春季上新模板',
      },
      items: [],
    },
    {
      id: 'SUB-050',
      name: '春季新品满50减10',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.6s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.5s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '1.3s' },
        { step: '等待业务确认', status: 'done', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-009', name: '春季新品满50减10', status: '已完成', ext: { type: '满减', amount: '10元', scope: '新品类目', validRange: '2026-03-15 ~ 04-15', stock: 5000, draftId: 'draft-20260310-001', bizStatus: '待确认' } },
      ],
    },
    {
      id: 'SUB-051',
      name: '春季新品8.5折券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.2s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.2s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '1.3s' },
        { step: '等待业务确认', status: 'done', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-010', name: '春季新品8.5折券', status: '已完成', ext: { type: '折扣', amount: '8.5折', scope: '新品类目', validRange: '2026-03-15 ~ 04-15', stock: 3000, draftId: 'draft-20260310-002', bizStatus: '待确认' } },
      ],
    },
  ],
  'TSK-20260312-004': [
    {
      id: 'SUB-013',
      name: '会员日满100减30',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.FAILED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.8s' },
        { step: '校验', status: 'failed', duration: '0.3s' },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: ['校验失败：有效期起始日期不能早于当前日期'],
      ext: {},
      items: [
        { id: 'ITEM-011', name: '会员日满100减30', status: '失败', ext: { type: '满减', amount: '30元', scope: '全品类', validRange: '2026-03-15 ~ 03-15', stock: 6000, draftId: null, bizStatus: '处理中' } },
      ],
    },
    {
      id: 'SUB-014',
      name: '会员日8折券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.0s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.2s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-012', name: '会员日8折券', status: '已完成', ext: { type: '折扣', amount: '8折', scope: '全品类', validRange: '2026-03-15 ~ 03-15', stock: 8000, draftId: 'draft-20260312-001', bizStatus: '待确认' } },
      ],
    },
    {
      id: 'SUB-015',
      name: '会员日新客立减15',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.CREATING,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'running', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-013', name: '会员日新客立减15', status: '创建中', ext: { type: '立减', amount: '15元', scope: '新客专享', validRange: '2026-03-15 ~ 03-15', stock: 3000, draftId: null, bizStatus: '处理中' } },
      ],
    },
    {
      id: 'SUB-016',
      name: '会员日满200减50',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-014', name: '会员日满200减50', status: '排队中', ext: { type: '满减', amount: '50元', scope: '全品类', validRange: '2026-03-15 ~ 03-15', stock: 2000, draftId: null, bizStatus: '处理中' } },
      ],
    },
  ],
  'TSK-20260315-005': [
    {
      id: 'SUB-017',
      name: '咖啡品类拉新5元券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.FAILED,
      itemCount: 1,
      completedItemCount: 0,
      duration: '2.1s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '1.2s' },
        { step: '校验', status: 'failed', duration: '0.6s' },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: ['校验失败：咖啡品类ID无效，请检查品类配置'],
      ext: {},
      items: [
        { id: 'ITEM-015', name: '咖啡品类拉新5元券', status: '失败', ext: { type: '立减', amount: '5元', scope: '咖啡品类', validRange: '2026-03-20 ~ 04-20', stock: 10000, draftId: null, bizStatus: '处理中' } },
      ],
    },
  ],
  'TSK-20260316-006': [
    {
      id: 'SUB-021',
      name: '周末特惠活动配置',
      skillType: '建玩法',
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
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [],
    },
  ],

  // ========== 纯建券 OA 场景 (8 scenarios) ==========

  // Scenario 1: OA 单张券 - 待创建
  'TSK-20260317-007': [
    {
      id: 'SUB-025',
      name: '端午节满20减3券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-016', name: '端午节满20减3券', status: '排队中', ext: { type: '满减', amount: '3元', scope: '全品类', validRange: '2026-05-28 ~ 06-03', stock: 10000, draftId: null, bizStatus: '处理中' } },
      ],
    },
  ],

  // Scenario 2: OA 单张券 - 创建中
  'TSK-20260318-008': [
    {
      id: 'SUB-026',
      name: '新用户立减5元券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.CREATING,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'running', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-017', name: '新用户立减5元券', status: '创建中', ext: { type: '立减', amount: '5元', scope: '新客专享', validRange: '2026-03-20 ~ 04-20', stock: 5000, draftId: null, bizStatus: '处理中' } },
      ],
    },
  ],

  // Scenario 3: OA 单张券 - 待确认
  'TSK-20260319-009': [
    {
      id: 'SUB-027',
      name: '午餐时段满15减2券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.8s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.5s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.7s' },
        { step: '等待业务确认', status: 'running', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-018', name: '午餐时段满15减2券', status: '已完成', ext: { type: '满减', amount: '2元', scope: '午餐时段', validRange: '2026-03-25 ~ 04-25', stock: 20000, draftId: 'draft-20260319-001', bizStatus: '待确认' } },
      ],
    },
  ],

  // Scenario 4: OA 单张券 - 已确认
  'TSK-20260320-010': [
    {
      id: 'SUB-028',
      name: '周末9折饮品券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '6.1s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '2.0s' },
        { step: '校验', status: 'done', duration: '0.7s' },
        { step: '生成草稿', status: 'done', duration: '0.8s' },
        { step: '等待业务确认', status: 'done', duration: null },
        { step: '确认后提交', status: 'done', duration: '0.5s' },
        { step: '结果回传', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-019', name: '周末9折饮品券', status: '已完成', ext: { type: '折扣', amount: '9折', scope: '饮品类目', validRange: '2026-03-22 ~ 04-05', stock: 8000, draftId: 'draft-20260320-001', bizStatus: '已确认' } },
      ],
    },
  ],

  // Scenario 5: OA 多张券 - 待创建 (3 coupons, all QUEUED)
  'TSK-20260321-011': [
    {
      id: 'SUB-029',
      name: '夏日冰饮满10减2券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-020', name: '夏日冰饮满10减2券', status: '排队中', ext: { type: '满减', amount: '2元', scope: '冰饮品类', validRange: '2026-06-01 ~ 08-31', stock: 15000, draftId: null, bizStatus: '处理中' } },
      ],
    },
    {
      id: 'SUB-030',
      name: '夏日冰饮8折券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-021', name: '夏日冰饮8折券', status: '排队中', ext: { type: '折扣', amount: '8折', scope: '冰饮品类', validRange: '2026-06-01 ~ 08-31', stock: 10000, draftId: null, bizStatus: '处理中' } },
      ],
    },
    {
      id: 'SUB-031',
      name: '夏日新品立减3元券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-022', name: '夏日新品立减3元券', status: '排队中', ext: { type: '立减', amount: '3元', scope: '夏日新品', validRange: '2026-06-01 ~ 08-31', stock: 8000, draftId: null, bizStatus: '处理中' } },
      ],
    },
  ],

  // Scenario 6: OA 多张券 - 创建中 (4 coupons: 1 completed, 1 creating, 2 queued)
  'TSK-20260322-012': [
    {
      id: 'SUB-032',
      name: '早餐时段满8减1券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '4.8s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.0s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.2s' },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-023', name: '早餐时段满8减1券', status: '已完成', ext: { type: '满减', amount: '1元', scope: '早餐时段', validRange: '2026-04-01 ~ 04-30', stock: 30000, draftId: 'draft-20260322-001', bizStatus: '待确认' } },
      ],
    },
    {
      id: 'SUB-033',
      name: '早餐套餐9折券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.CREATING,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'running', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-024', name: '早餐套餐9折券', status: '创建中', ext: { type: '折扣', amount: '9折', scope: '早餐套餐', validRange: '2026-04-01 ~ 04-30', stock: 20000, draftId: null, bizStatus: '处理中' } },
      ],
    },
    {
      id: 'SUB-034',
      name: '早餐新客立减2元券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-025', name: '早餐新客立减2元券', status: '排队中', ext: { type: '立减', amount: '2元', scope: '早餐新客', validRange: '2026-04-01 ~ 04-30', stock: 15000, draftId: null, bizStatus: '处理中' } },
      ],
    },
    {
      id: 'SUB-035',
      name: '早餐满15减3券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.QUEUED,
      itemCount: 1,
      completedItemCount: 0,
      duration: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '等待业务确认', status: 'pending', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-026', name: '早餐满15减3券', status: '排队中', ext: { type: '满减', amount: '3元', scope: '早餐时段', validRange: '2026-04-01 ~ 04-30', stock: 10000, draftId: null, bizStatus: '处理中' } },
      ],
    },
  ],

  // Scenario 7: OA 多张券 - 待确认 (3 coupons, all completed, waiting for confirm)
  'TSK-20260323-013': [
    {
      id: 'SUB-036',
      name: '生日礼满50减10券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.5s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.5s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.3s' },
        { step: '等待业务确认', status: 'running', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-027', name: '生日礼满50减10券', status: '已完成', ext: { type: '满减', amount: '10元', scope: '全品类', validRange: '2026-04-01 ~ 04-30', stock: 5000, draftId: 'draft-20260323-001', bizStatus: '待确认' } },
      ],
    },
    {
      id: 'SUB-037',
      name: '生日礼7折甜品券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.8s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.8s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '1.3s' },
        { step: '等待业务确认', status: 'running', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-028', name: '生日礼7折甜品券', status: '已完成', ext: { type: '折扣', amount: '7折', scope: '甜品类目', validRange: '2026-04-01 ~ 04-30', stock: 3000, draftId: 'draft-20260323-002', bizStatus: '待确认' } },
      ],
    },
    {
      id: 'SUB-038',
      name: '生日礼立减8元券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '6.2s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '4.0s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '1.4s' },
        { step: '等待业务确认', status: 'running', duration: null },
        { step: '确认后提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-029', name: '生日礼立减8元券', status: '已完成', ext: { type: '立减', amount: '8元', scope: '生日专享', validRange: '2026-04-01 ~ 04-30', stock: 5000, draftId: 'draft-20260323-003', bizStatus: '待确认' } },
      ],
    },
  ],

  // Scenario 8: OA 多张券 - 已废弃 (3 coupons, all discarded)
  'TSK-20260324-014': [
    {
      id: 'SUB-039',
      name: '开学季满30减5券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.6s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.5s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.4s' },
        { step: '等待业务确认', status: 'done', duration: null },
        { step: '确认后提交', status: 'done', duration: '0.5s' },
        { step: '结果回传', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-030', name: '开学季满30减5券', status: '已完成', ext: { type: '满减', amount: '5元', scope: '文具品类', validRange: '2026-02-20 ~ 03-20', stock: 12000, draftId: 'draft-20260324-001', bizStatus: '已废弃' } },
      ],
    },
    {
      id: 'SUB-040',
      name: '开学季8.5折书包券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.9s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.8s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '1.4s' },
        { step: '等待业务确认', status: 'done', duration: null },
        { step: '确认后提交', status: 'done', duration: '0.4s' },
        { step: '结果回传', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-031', name: '开学季8.5折书包券', status: '已完成', ext: { type: '折扣', amount: '8.5折', scope: '书包品类', validRange: '2026-02-20 ~ 03-20', stock: 6000, draftId: 'draft-20260324-002', bizStatus: '已废弃' } },
      ],
    },
    {
      id: 'SUB-041',
      name: '开学季立减3元文具券',
      skillType: '建券',
      status: ADMIN_COUPON_STATUS.COMPLETED,
      itemCount: 1,
      completedItemCount: 1,
      duration: '5.9s',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.6s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '1.5s' },
        { step: '等待业务确认', status: 'done', duration: null },
        { step: '确认后提交', status: 'done', duration: '0.5s' },
        { step: '结果回传', status: 'done', duration: '0.3s' },
      ],
      errors: [],
      ext: {},
      items: [
        { id: 'ITEM-032', name: '开学季立减3元文具券', status: '已完成', ext: { type: '立减', amount: '3元', scope: '文具品类', validRange: '2026-02-20 ~ 03-20', stock: 10000, draftId: 'draft-20260324-003', bizStatus: '已废弃' } },
      ],
    },
  ],
}

// Mock tasks
export const tasks = [
  {
    id: 'TSK-20260308-001',
    name: '38女神节-线上活动',
    source: 'OA审批',
    oaNumber: 'OA-2026-3842',
    activity: '38女神节全国大促',
    subTaskCount: 7,
    completedCount: 7,
    totalCouponCount: 3,
    adminStatus: ADMIN_TASK_STATUS.DRAFT_READY,
    bizStatus: BIZ_TASK_STATUS.CONFIRMED,
    confirmedCount: 3,
    creator: '陈悦',
    createdAt: '2026-03-08 14:20',
  },
  {
    id: 'TSK-20260308-002',
    name: '38女神节-门店活动',
    source: 'OA审批',
    oaNumber: 'OA-2026-3842',
    activity: '38女神节全国大促',
    subTaskCount: 6,
    completedCount: 3,
    totalCouponCount: 5,
    adminStatus: ADMIN_TASK_STATUS.PROCESSING,
    bizStatus: BIZ_TASK_STATUS.PROCESSING,
    confirmedCount: 1,
    creator: '张文佳',
    createdAt: '2026-03-08 14:25',
  },
  {
    id: 'TSK-20260310-003',
    name: '春季新品发布会',
    source: 'OA审批',
    oaNumber: 'OA-2026-3901',
    activity: '春季新品发布会',
    subTaskCount: 5,
    completedCount: 5,
    totalCouponCount: 2,
    adminStatus: ADMIN_TASK_STATUS.DRAFT_READY,
    bizStatus: BIZ_TASK_STATUS.PENDING_CONFIRM,
    confirmedCount: 0,
    creator: '林巧',
    createdAt: '2026-03-10 09:15',
  },
  {
    id: 'TSK-20260312-004',
    name: '会员日折扣券',
    source: 'OA审批',
    oaNumber: 'OA-2026-4001',
    activity: '3月会员日活动',
    subTaskCount: 4,
    completedCount: 1,
    totalCouponCount: 4,
    adminStatus: ADMIN_TASK_STATUS.PARTIAL_ERROR,
    bizStatus: BIZ_TASK_STATUS.PROCESSING,
    confirmedCount: 0,
    creator: '骆颖',
    createdAt: '2026-03-12 16:30',
  },
  {
    id: 'TSK-20260315-005',
    name: '咖啡品类拉新券',
    source: '手动上传',
    oaNumber: null,
    activity: '咖啡日均提升计划',
    subTaskCount: 1,
    completedCount: 0,
    totalCouponCount: 1,
    adminStatus: ADMIN_TASK_STATUS.ERROR,
    bizStatus: BIZ_TASK_STATUS.PROCESSING,
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
    subTaskCount: 3,
    completedCount: 0,
    totalCouponCount: 0,
    adminStatus: ADMIN_TASK_STATUS.PENDING,
    bizStatus: BIZ_TASK_STATUS.PROCESSING,
    confirmedCount: 0,
    creator: '李婷',
    createdAt: '2026-03-16 10:30',
  },

  // ========== 纯建券 OA 场景 (8 scenarios) ==========

  // Scenario 1: OA 单张券 - 待创建
  {
    id: 'TSK-20260317-007',
    name: '端午节优惠券',
    source: 'OA审批',
    oaNumber: 'OA-2026-4102',
    activity: '端午节促销',
    subTaskCount: 1,
    completedCount: 0,
    totalCouponCount: 1,
    adminStatus: ADMIN_TASK_STATUS.PENDING,
    bizStatus: BIZ_TASK_STATUS.PROCESSING,
    confirmedCount: 0,
    creator: '赵明',
    createdAt: '2026-03-17 09:00',
  },

  // Scenario 2: OA 单张券 - 创建中
  {
    id: 'TSK-20260318-008',
    name: '新用户礼包',
    source: 'OA审批',
    oaNumber: 'OA-2026-4115',
    activity: '新客拉新计划',
    subTaskCount: 1,
    completedCount: 0,
    totalCouponCount: 1,
    adminStatus: ADMIN_TASK_STATUS.PROCESSING,
    bizStatus: BIZ_TASK_STATUS.PROCESSING,
    confirmedCount: 0,
    creator: '吴芳',
    createdAt: '2026-03-18 10:30',
  },

  // Scenario 3: OA 单张券 - 待确认
  {
    id: 'TSK-20260319-009',
    name: '午餐时段满减',
    source: 'OA审批',
    oaNumber: 'OA-2026-4128',
    activity: '午餐时段拉动',
    subTaskCount: 1,
    completedCount: 1,
    totalCouponCount: 1,
    adminStatus: ADMIN_TASK_STATUS.DRAFT_READY,
    bizStatus: BIZ_TASK_STATUS.PENDING_CONFIRM,
    confirmedCount: 0,
    creator: '孙磊',
    createdAt: '2026-03-19 11:15',
  },

  // Scenario 4: OA 单张券 - 已确认
  {
    id: 'TSK-20260320-010',
    name: '周末饮品折扣',
    source: 'OA审批',
    oaNumber: 'OA-2026-4135',
    activity: '周末饮品促销',
    subTaskCount: 1,
    completedCount: 1,
    totalCouponCount: 1,
    adminStatus: ADMIN_TASK_STATUS.DRAFT_READY,
    bizStatus: BIZ_TASK_STATUS.CONFIRMED,
    confirmedCount: 1,
    creator: '周雪',
    createdAt: '2026-03-20 14:00',
  },

  // Scenario 5: OA 多张券 - 待创建 (3 coupons, all QUEUED)
  {
    id: 'TSK-20260321-011',
    name: '夏日冰饮专题券',
    source: 'OA审批',
    oaNumber: 'OA-2026-4150',
    activity: '夏日冰饮推广',
    subTaskCount: 3,
    completedCount: 0,
    totalCouponCount: 3,
    adminStatus: ADMIN_TASK_STATUS.PENDING,
    bizStatus: BIZ_TASK_STATUS.PROCESSING,
    confirmedCount: 0,
    creator: '黄志强',
    createdAt: '2026-03-21 09:30',
  },

  // Scenario 6: OA 多张券 - 创建中 (4 coupons: 1 completed, 1 creating, 2 queued)
  {
    id: 'TSK-20260322-012',
    name: '早餐时段组合券',
    source: 'OA审批',
    oaNumber: 'OA-2026-4167',
    activity: '早餐时段提升计划',
    subTaskCount: 4,
    completedCount: 1,
    totalCouponCount: 4,
    adminStatus: ADMIN_TASK_STATUS.PROCESSING,
    bizStatus: BIZ_TASK_STATUS.PROCESSING,
    confirmedCount: 0,
    creator: '郑丽华',
    createdAt: '2026-03-22 08:45',
  },

  // Scenario 7: OA 多张券 - 待确认 (3 coupons, all completed)
  {
    id: 'TSK-20260323-013',
    name: '生日礼遇券包',
    source: 'OA审批',
    oaNumber: 'OA-2026-4180',
    activity: '会员生日礼遇',
    subTaskCount: 3,
    completedCount: 3,
    totalCouponCount: 3,
    adminStatus: ADMIN_TASK_STATUS.DRAFT_READY,
    bizStatus: BIZ_TASK_STATUS.PENDING_CONFIRM,
    confirmedCount: 0,
    creator: '王建国',
    createdAt: '2026-03-23 15:20',
  },

  // Scenario 8: OA 多张券 - 已废弃 (3 coupons, all discarded — 开学季已过期)
  {
    id: 'TSK-20260324-014',
    name: '开学季文具券',
    source: 'OA审批',
    oaNumber: 'OA-2026-4195',
    activity: '开学季促销活动',
    subTaskCount: 3,
    completedCount: 3,
    totalCouponCount: 3,
    adminStatus: ADMIN_TASK_STATUS.DRAFT_READY,
    bizStatus: BIZ_TASK_STATUS.DISCARDED,
    confirmedCount: 0,
    creator: '刘佳琪',
    createdAt: '2026-03-24 10:00',
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

// Helper: get coupon items for a task (from all 建券 subtasks)
export function getCouponItemsForTask(taskId) {
  const subTasks = getSubTasksForTask(taskId)
  return subTasks
    .filter(s => s.skillType === '建券')
    .flatMap(s => s.items)
}

// Stats for admin dashboard
export function getAdminStats() {
  return {
    total: tasks.length,
    processing: tasks.filter((t) => t.adminStatus === ADMIN_TASK_STATUS.PROCESSING).length,
    draftReady: tasks.filter((t) => t.adminStatus === ADMIN_TASK_STATUS.DRAFT_READY).length,
    partialError: tasks.filter((t) => t.adminStatus === ADMIN_TASK_STATUS.PARTIAL_ERROR).length,
    error: tasks.filter((t) => t.adminStatus === ADMIN_TASK_STATUS.ERROR).length,
  }
}

// Stats for biz dashboard
export function getBizStats() {
  return {
    processing: tasks.filter((t) => t.bizStatus === BIZ_TASK_STATUS.PROCESSING).length,
    pendingConfirm: tasks.filter((t) => t.bizStatus === BIZ_TASK_STATUS.PENDING_CONFIRM).length,
    confirmed: tasks.filter((t) => t.bizStatus === BIZ_TASK_STATUS.CONFIRMED).length,
  }
}

// ===== AI 助手面板 mock 数据 =====

export const AI_PARSE_MESSAGES = [
  { delay: 800,  content: '正在解析上传的文件...' },
  { delay: 2000, content: '已识别 3 张优惠券配置' },
  { delay: 3000, content: '券 1：满50减10通用券（满减券，全品类适用）' },
  { delay: 3800, content: '券 2：新品8折券（折扣券，新品类目适用）' },
  { delay: 4500, content: '券 3：新客立减5元（立减券，新客专享）' },
  { delay: 5500, content: '解析完成！共 3 张券配置已提交至 AI 任务后台，可在任务列表中查看创建进度。' },
]

// ============================================================
// OA 活动立项 — mock data
// ============================================================

export const OA_FIELD_OPTIONS = {
  activityProducts: ['奶茶', '咖啡', '奶茶+咖啡'],
  businessChannels: ['到家', '到店', '平台'],
  channelLevel1: ['小程序', '社群', '抖音快手', '团购支付', 'POS'],
  channelLevel2: ['总部-到店', '总部-到家', '区域'],
  types: ['新增', '变更'],
  storeEffort: ['≥75%', '75%>X≥70%', '<70%'],
}

export const OA_FORM_MOCK = {
  id: 'PTHDN20240900070',
  title: '茶百道到店渠道活动审核',
  applicant: '何旭',
  department: '增长产品部',
  position: '产品经理',
  applyDate: '2024-09-20',
  activityTopic: '智能营销推荐系统–算法模型自动化发券',
  platforms: ['小程序', '社群', '抖音快手'],
  activityDateStart: '2024-10-01',
  activityDateEnd: '2024-12-31',
  type: '新增',
  channelLevel1: '总部-到店',
  channelLevel2: '全国',
  storeArea: '7000',
  externalIp: false,
  companySettlement: false,
  annualBudget: false,
  totalAmount: 700000,
  costBreakdown: { material: 0, creative: 0, advertising: 0, otherMarketing: 700000 },
  tradeEstimate: {
    redemptionRate100: '100%',
    estimatedGMV: 576000000,
    financialROI: 91.63,
    redemptionRate15: '1.5%',
    estimatedGMV15: 8640000,
    financialROI15: 1.37,
  },
  adEstimate: { impressions: 0, cpmPrice: '' },
  couponType: '小程序–券码',
  couponTemplate: '【模板】茶百道赠饮优惠券申请表.xlsx',
  couponRules: '【智能营销券池】茶百道赠饮优惠券申请表.xlsx',
  storeEffort: '≥75%',
  storeCount: 7000,
  activityContent: `活动目的：茶百道智能营销算法模型建设已经在前期实验中验证成果，从10月开始将会陆续行化，对用户进行个性化发放优惠券，最大化 GMV 收益。
活动主题：智能营销销推荐系统–算法模型自动化发券
活动内容：通过时化优惠模型对个性化自动化发券，向消息管理器推荐的适配商品，
发券方案：直接发放优至上层第五天，前置提醒，智能发放预算，模型进行预算的方式重复最大化带来 GMV 的优惠券，以适合的时间（每周七天是一天）对用户发券（有 5、7、7 天）对用户进行发券，自算法模型按区域用户属性项，发券的有效期限（3 天为主，有最5、7、7天）适合的有效期限
活动饮品：根据券池管理中配置优惠券确定，以全球优体饮品通用券为主
活动渠道：优饮小程序自发
活动门店：全部门店
活动折扣：综合折扣率大于 75 折
费用承担：优惠券成本门店承担，短信成本由数字化中心承担
活动期限：
*仅小程序自动还款推荐图员，
*此活动不与其它优惠同享：
*小料、普督均不参与此活动；
*优惠券当日领取即可使用，有效期根据实际发放优惠券决定；`,
  attachments: [{ name: '智能营销推荐_...png', size: '241.91KB' }],
  signers: [
    { seq: 1, mode: '企业', name: '陈颜霞', entity: '四川爱信致远企业管理咨询有限公司', region: '甲方', contact: '', remark: '' },
  ],
  pendingFile: { name: '关于茶百道智能营销推荐系统算法模型自动化发券活动的通知.pdf', size: '760.01KB' },
  signedFile: { name: '关于茶百道智能营销推荐系统算法模型自动化发券活动的通知.pdf', size: '895.83KB' },
}

export const OA_APPROVAL_HISTORY = [
  { time: '2024-09-20 13:40', node: '起草节点', handler: '何旭', action: '提交文件', remark: '智能营销算法模型自动化发券，优惠券到手率高于 0.75，不涉及货补。模型会进行个性化短信触达，短信成本由数字化中心承担。' },
  { time: '2024-09-20 17:56', node: '直属上级', handler: '王靖', action: '提交文件', remark: '按年度项目预算与计划 调整短信费用\n耗时: 4时14分' },
  { time: '2024-09-20 18:34', node: '起草节点', handler: '何旭', action: '提交文件', remark: '按年度预算调整，预估短信费用70万，预估GMV5.76亿' },
  { time: '2024-09-23 10:27', node: '直属上级', handler: '王靖', action: '提交文件', remark: '此变更为Q4算法模型自动化营销活动立项，按年度算法预算目前剩余约70万进行申请（短信额度主要用于进一步的短信poi调优模型训练与效果推广全量使用）\n耗时: 2天15时51分25秒' },
]

export const AI_REVIEW_MESSAGES = [
  { delay: 600,  content: '正在启动 AI 审核 Agent...' },
  { delay: 1800, content: '开始审核表单内容，共需检查 8 个审核维度。' },
  { delay: 3000, content: '[1/8] 检查基础信息完整性 ✅\n申请人、活动事项、业务渠道等必填字段已完整填写。' },
  { delay: 4200, content: '[2/8] 验证活动日期合理性 ✅\n活动开始日期需提前7个工作日申请，符合要求。活动周期在合理范围内。' },
  { delay: 5400, content: '[3/8] 校验预算与费用分摊 ✅\n涉及总金额 70万元，费用分摊项合计与总金额一致，在审批权限范围内。' },
  { delay: 6600, content: '[4/8] 核查活动范围与门店覆盖 ✅\n活动覆盖 7000 家门店，与全国范围申请一致。' },
  { delay: 7800, content: '[5/8] 评估交易效果预估 ⚠️\n预估核销率 1.5% 对应的财务 ROI 为 1.37，略低于建议阈值 1.5。建议关注实际核销数据并及时调优。' },
  { delay: 9000, content: '[6/8] 校验优惠券规则配置 ✅\n优惠券类型为小程序券码，模板与规则文件已上传，配置完整。' },
  { delay: 10200, content: '[7/8] 门店活动力度合规检查 ✅\n门店活动力度 ≥75%，符合公司折扣下限要求。' },
  { delay: 11400, content: '[8/8] 合规性与附件检查 ✅\n不涉及外部 IP 合作，不涉及公司结算。通知模板与签署文件已上传。' },
  { delay: 13000, content: '━━━━━━━━━━━━━━━━━━━━\n\n📋 审核结果：通过 ✅\n\n共 8 项检查：7 项通过、1 项提示（非阻断）。\n\n⚠️ 提示项：预估财务 ROI 在低核销率场景下偏低，建议提交后持续关注算法模型优化效果。\n\n您可以点击「确认提交」完成流程发起。' },
]
