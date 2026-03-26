export const listHeroTabs = [
  { label: '主页总览', to: '/drafts' },
  { label: 'Skill 列表', to: '/skills' },
  { label: '草稿列表', to: '/drafts' },
  { label: '任务列表', to: '/tasks' },
  { label: '文件列表', to: '/files' },
]

export const executionHeroTabs = [
  { label: '草稿列表', to: '/drafts' },
  { label: '草稿执行页', to: '/drafts/execution' },
  { label: '文件列表', to: '/files' },
]

export const listPages = {
  drafts: {
    key: 'drafts',
    frame: {
      orb: '中',
      title: '中心 Agent 引擎',
      subtitle: '前端交互原型 · 左 Chat + 右管理后台',
      topBadge: '总览',
      topMeta: 'MVP: 业务助手',
    },
    chat: {
      title: 'Chat',
      subtitle: '需求入口 / 任务触发',
      chip: '飞书已接入',
      composerPlaceholder: '继续描述你的业务需求',
      messages: [
        {
          type: 'bubble',
          tone: 'soft',
          time: '10:24',
          text: '帮我推进本周优惠券草稿，先看看待确认项。',
        },
        {
          type: 'bubble',
          tone: 'light',
          time: '10:25',
          text:
            '已同步生成一份优惠券草稿，关联建券 Skill，并整理出待确认字段。你可以直接在右侧查看草稿、任务和文件状态。',
          tags: [
            { label: '草稿待确认', tone: 'amber' },
            { label: '查看草稿', tone: 'green' },
          ],
        },
        {
          type: 'draft-card',
          title: 'coupon-draft-20260311',
          skill: '建券 Skill',
          time: '今天 10:25',
          status: { label: '待确认', tone: 'amber' },
          actionLabel: '查看草稿',
          to: '/drafts/execution',
        },
        {
          type: 'bubble',
          tone: 'dark',
          time: '10:26',
          align: 'right',
          text: '把最近生成的草稿、运行中的任务和相关文件整理给我。',
        },
      ],
      notes: [
        'Chat 负责接收需求、追问和状态通知；具体草稿、任务、文件都在右侧管理后台联动展示。',
      ],
    },
    hero: {
      badge: '管理后台',
      context: '默认页：草稿列表',
      title: '右侧以列表为主，不是一排大卡片',
      description:
        '主页可以保留摘要卡片，但进入工作态后，Skill、草稿、任务、文件都应该以列表和详情联动来承载。当前原型默认打开草稿管理页。',
      metrics: [
        {
          label: '待确认草稿',
          value: '07',
          note: '默认筛完已定位到待确认',
          tone: 'light',
        },
        {
          label: '执行中',
          value: '03',
          note: '2 个需要人工补充',
          tone: 'dark',
        },
      ],
    },
    workspace: {
      title: '草稿列表',
      description: '按状态、时间和 Skill 过滤，默认选中最近一条待确认草稿。',
      searchPlaceholder: '搜索草稿名 / Skill',
      primaryAction: '新建草稿',
      primaryColumnLabel: '草稿名称',
      filters: [
        { label: '待确认 07', tone: 'amber' },
        { label: '执行中 03', tone: 'neutral' },
        { label: '已完成 12', tone: 'neutral' },
        { label: '异常 02', tone: 'neutral' },
        { label: '按时间倒序', tone: 'neutral' },
      ],
      columns: [
        { label: '关联 Skill', width: '1.1fr' },
        { label: '更新时间', width: '0.95fr' },
        { label: '状态', width: '0.85fr' },
        { label: '操作', width: '0.82fr' },
      ],
      rows: [
        {
          id: 'coupon-draft-20260311',
          title: 'coupon-draft-20260311',
          description: '缺少预算上限，已在右侧详情中标记为待补充字段',
          cells: [
            '建券 Skill',
            '10:25',
            { label: '待确认', tone: 'amber' },
            { label: '查看', tone: 'dark-action', to: '/drafts/execution' },
          ],
          detail: {
            title: 'coupon-draft-20260311',
            status: { label: '待确认', tone: 'amber' },
            description: '当前选中草稿的详情、待补项、关联文件与执行入口。',
            metrics: [
              { label: '关联 Skill', value: '建券 Skill v1.8' },
              { label: '生成时间', value: '今天 10:25' },
            ],
            sections: [
              {
                title: '待补字段',
                items: [
                  {
                    title: '预算上限',
                    subtitle: '点击后跳到草稿执行页对应字段',
                    badge: { label: '缺失', tone: 'red' },
                  },
                  {
                    title: '投放时段',
                    subtitle: '已识别为默认全天，可人工修改',
                    badge: { label: '可用', tone: 'green' },
                  },
                ],
              },
              {
                title: '关联文件',
                items: [
                  {
                    title: '预算说明.xlsx',
                    subtitle: '1.8 MB · 10:12 上传',
                    badge: { label: '预览', tone: 'ghost' },
                  },
                  {
                    title: '定向人群.csv',
                    subtitle: '423 KB · 09:56 上传',
                    badge: { label: '删除', tone: 'ghost' },
                  },
                ],
              },
            ],
            actions: [{ label: '查看草稿执行页', tone: 'primary', to: '/drafts/execution' }],
          },
        },
        {
          id: 'activity-brief-20260311',
          title: 'activity-brief-20260311',
          description: '结果编号已回写，等待会话侧同步通知归档',
          cells: [
            '活动摘要 Skill',
            '09:42',
            { label: '已完成', tone: 'green' },
            { label: '打开', tone: 'ghost' },
          ],
          detail: {
            title: 'activity-brief-20260311',
            status: { label: '已完成', tone: 'green' },
            description: '活动摘要草稿已可交付，等待消息侧回写归档提示。',
            metrics: [
              { label: '关联 Skill', value: '活动摘要 Skill v2.1' },
              { label: '生成时间', value: '今天 09:42' },
            ],
            sections: [
              {
                title: '当前状态',
                items: [
                  {
                    title: '结果编号已回写',
                    subtitle: '等待会话侧同步完成归档',
                    badge: { label: '已完成', tone: 'green' },
                  },
                ],
              },
            ],
            actions: [{ label: '查看交付摘要', tone: 'secondary' }],
          },
        },
        {
          id: 'approval-sync-20260311',
          title: 'approval-sync-20260311',
          description: '正在同步飞书审批评论，需要等下一轮拉取完成',
          cells: [
            '审批同步 Skill',
            '09:18',
            { label: '执行中', tone: 'purple' },
            { label: '跟进', tone: 'ghost' },
          ],
          detail: {
            title: 'approval-sync-20260311',
            status: { label: '执行中', tone: 'purple' },
            description: '审批评论仍在同步中，右侧继续观察执行结果即可。',
            metrics: [
              { label: '关联 Skill', value: '审批同步 Skill v1.3' },
              { label: '生成时间', value: '今天 09:18' },
            ],
            sections: [
              {
                title: '执行观察',
                items: [
                  {
                    title: '下一轮拉取待完成',
                    subtitle: '预计 10 分钟内更新状态',
                    badge: { label: '监控中', tone: 'purple' },
                  },
                ],
              },
            ],
            actions: [{ label: '查看关联任务', tone: 'secondary', to: '/tasks' }],
          },
        },
        {
          id: 'member-tag-update-20260310',
          title: 'member-tag-update-20260310',
          description: '人群包文件缺失，等待补传后重新生成',
          cells: [
            '标签同步 Skill',
            '昨天 18:40',
            { label: '异常', tone: 'red' },
            { label: '处理', tone: 'ghost' },
          ],
          detail: {
            title: 'member-tag-update-20260310',
            status: { label: '异常', tone: 'red' },
            description: '缺少人群包文件，补传后即可重试生成。',
            metrics: [
              { label: '关联 Skill', value: '标签同步 Skill v0.9' },
              { label: '生成时间', value: '昨天 18:40' },
            ],
            sections: [
              {
                title: '异常说明',
                items: [
                  {
                    title: '缺少上传文件',
                    subtitle: '需要重新补传人群包 CSV',
                    badge: { label: '待处理', tone: 'amber' },
                  },
                ],
              },
            ],
            actions: [{ label: '去文件列表处理', tone: 'secondary', to: '/files' }],
          },
        },
        {
          id: 'daily-report-20260310',
          title: 'daily-report-20260310',
          description: '日报草稿已完成，等待下一个周期自动生成',
          cells: [
            '日报 Skill',
            '昨天 09:30',
            { label: '已完成', tone: 'green' },
            { label: '查看', tone: 'ghost' },
          ],
          detail: {
            title: 'daily-report-20260310',
            status: { label: '已完成', tone: 'green' },
            description: '日报流程稳定，当前无需额外人工介入。',
            metrics: [
              { label: '关联 Skill', value: '日报 Skill v1.2' },
              { label: '生成时间', value: '昨天 09:30' },
            ],
            sections: [
              {
                title: '自动化状态',
                items: [
                  {
                    title: '下个周期自动生成',
                    subtitle: '明天 09:30 将继续产出新日报草稿',
                    badge: { label: '正常', tone: 'green' },
                  },
                ],
              },
            ],
            actions: [{ label: '查看任务计划', tone: 'secondary', to: '/tasks' }],
          },
        },
        {
          id: 'coupon-refresh-20260309',
          title: 'coupon-refresh-20260309',
          description: '已重新生成草稿，新版本等待人工确认后提交',
          cells: [
            '建券 Skill',
            '03-09 14:12',
            { label: '待确认', tone: 'amber' },
            { label: '查看', tone: 'ghost' },
          ],
          detail: {
            title: 'coupon-refresh-20260309',
            status: { label: '待确认', tone: 'amber' },
            description: '新版本券草稿已生成，等待人工确认后再提交执行。',
            metrics: [
              { label: '关联 Skill', value: '建券 Skill v1.8' },
              { label: '生成时间', value: '03-09 14:12' },
            ],
            sections: [
              {
                title: '待确认项',
                items: [
                  {
                    title: '折扣文案需人工核对',
                    subtitle: '建议与业务群确认后提交',
                    badge: { label: '待确认', tone: 'amber' },
                  },
                ],
              },
            ],
            actions: [{ label: '打开执行页', tone: 'secondary', to: '/drafts/execution' }],
          },
        },
      ],
    },
  },
  skills: {
    key: 'skills',
    frame: {
      orb: '技',
      title: 'Skill 列表',
      subtitle: '工作态原型 · 左 Chat + 右管理后台',
      topBadge: 'Skill 列表',
      topMeta: '18 个已注册',
    },
    chat: {
      title: 'Chat',
      subtitle: '围绕 Skill 的追问与状态同步',
      chip: '上下文保留',
      composerPlaceholder: '询问新的 Skill 版本问题',
      messages: [
        {
          type: 'bubble',
          tone: 'soft',
          time: '10:41',
          text: '建券 Skill 现在是可用的吗？我想看版本和最近关联的草稿。',
        },
        {
          type: 'bubble',
          tone: 'light',
          time: '10:42',
          text:
            '已切到 Skill 列表，默认选中建券 Skill。右侧会显示版本、健康状态和关联草稿。',
          tags: [
            { label: '建券 Skill', tone: 'amber' },
            { label: '状态正常', tone: 'green' },
          ],
        },
        {
          type: 'bubble',
          tone: 'dark',
          time: '10:43',
          align: 'right',
          text: '把版本变更和异常项也整理出来，我想知道影响哪些草稿。',
        },
      ],
      notes: ['Chat 持续保留针对 Skill 的提问与通知，配置维护本身仍在右侧列表和详情里完成。'],
    },
    hero: {
      badge: '管理后台',
      context: '默认页：Skill 列表',
      title: 'Skill 也应该先看列表，再进入单项详情',
      description:
        '工作页默认展示搜索、筛选、状态和版本信息。点击某个 Skill 后，再在右侧查看详细说明、版本历史、关联草稿和健康状态。',
      metrics: [
        {
          label: '在线 Skill',
          value: '18',
          note: '14 个处于正常可调用状态',
          tone: 'light',
        },
        {
          label: '需关注',
          value: '02',
          note: '版本升级后待回检查看',
          tone: 'dark',
        },
      ],
    },
    workspace: {
      title: 'Skill 列表',
      description: '按分类、版本和状态过滤，默认选中最近调用最多的建券 Skill。',
      searchPlaceholder: '搜索 Skill / 场景',
      primaryAction: '新建 Skill',
      primaryColumnLabel: 'Skill 名称',
      filters: [
        { label: '营销类 06', tone: 'amber' },
        { label: '知识类 04', tone: 'neutral' },
        { label: '正常 14', tone: 'neutral' },
        { label: '待检查 02', tone: 'neutral' },
        { label: '按调用量排序', tone: 'neutral' },
      ],
      columns: [
        { label: '版本', width: '0.72fr' },
        { label: '状态', width: '0.88fr' },
        { label: '最近更新', width: '1fr' },
        { label: '操作', width: '0.82fr' },
      ],
      rows: [
        {
          id: 'coupon-skill',
          title: '建券 Skill',
          description: '负责生成券草稿、映射字段并联动草稿执行页',
          cells: [
            'v1.8',
            { label: '正常', tone: 'green' },
            '今天 10:12',
            { label: '查看', tone: 'dark-action' },
          ],
          detail: {
            title: '建券 Skill',
            status: { label: '正常', tone: 'green' },
            description: '负责将需求转成建券草稿，并把草稿执行页需要的字段结构整理出来。',
            metrics: [
              { label: '当前版本', value: 'v1.8' },
              { label: '最近更新', value: '今天 10:12' },
            ],
            sections: [
              {
                title: '健康状态',
                items: [
                  {
                    title: '最近巡检',
                    subtitle: '页面入口正常，关键字段可识别',
                    badge: { label: '通过', tone: 'green' },
                  },
                  {
                    title: '最近异常',
                    subtitle: '3 月 10 日一次字段变更，已在 v1.8 修复',
                    badge: { label: '已处理', tone: 'amber' },
                  },
                ],
              },
              {
                title: '关联草稿',
                items: [
                  {
                    title: 'coupon-draft-20260311',
                    subtitle: '今天 10:25 生成',
                    badge: { label: '待确认', tone: 'amber' },
                  },
                  {
                    title: 'coupon-refresh-20260309',
                    subtitle: '03-09 14:12 生成',
                    badge: { label: '待确认', tone: 'amber' },
                  },
                ],
              },
            ],
            actions: [
              { label: '查看关联草稿', tone: 'primary', to: '/drafts' },
              { label: '查看版本记录', tone: 'secondary' },
            ],
          },
        },
        {
          id: 'approval-skill',
          title: '审批同步 Skill',
          description: '同步审批评论，生成提醒和会话通知',
          cells: [
            'v1.3',
            { label: '观察中', tone: 'purple' },
            '今天 09:46',
            { label: '查看', tone: 'ghost' },
          ],
          detail: {
            title: '审批同步 Skill',
            status: { label: '观察中', tone: 'purple' },
            description: '当前版本稳定，但需要持续观察审批评论的拉取完整性。',
            metrics: [
              { label: '当前版本', value: 'v1.3' },
              { label: '最近更新', value: '今天 09:46' },
            ],
            sections: [
              {
                title: '健康状态',
                items: [
                  {
                    title: '重复评论过滤',
                    subtitle: '最新版本已加强去重逻辑',
                    badge: { label: '观察中', tone: 'purple' },
                  },
                ],
              },
            ],
            actions: [{ label: '查看关联任务', tone: 'secondary', to: '/tasks' }],
          },
        },
        {
          id: 'brief-skill',
          title: '活动摘要 Skill',
          description: '把长会话和附件整理成可交付摘要',
          cells: [
            'v2.1',
            { label: '正常', tone: 'green' },
            '昨天 18:20',
            { label: '查看', tone: 'ghost' },
          ],
          detail: {
            title: '活动摘要 Skill',
            status: { label: '正常', tone: 'green' },
            description: '活动摘要流程稳定，可继续产出对外交付材料。',
            metrics: [
              { label: '当前版本', value: 'v2.1' },
              { label: '最近更新', value: '昨天 18:20' },
            ],
            sections: [
              {
                title: '健康状态',
                items: [
                  {
                    title: '结果生成正常',
                    subtitle: '附件抽取和摘要拼装已通过巡检',
                    badge: { label: '通过', tone: 'green' },
                  },
                ],
              },
            ],
            actions: [{ label: '查看关联草稿', tone: 'secondary', to: '/drafts' }],
          },
        },
        {
          id: 'tag-skill',
          title: '标签同步 Skill',
          description: '根据文件和草稿结果回写用户分群标签',
          cells: [
            'v0.9',
            { label: '待检查', tone: 'red' },
            '昨天 17:05',
            { label: '处理', tone: 'ghost' },
          ],
          detail: {
            title: '标签同步 Skill',
            status: { label: '待检查', tone: 'red' },
            description: '近期文件引用不稳定，需要检查输入文件是否齐全。',
            metrics: [
              { label: '当前版本', value: 'v0.9' },
              { label: '最近更新', value: '昨天 17:05' },
            ],
            sections: [
              {
                title: '健康状态',
                items: [
                  {
                    title: '输入文件缺失',
                    subtitle: '等待业务补传后重新验证',
                    badge: { label: '待处理', tone: 'amber' },
                  },
                ],
              },
            ],
            actions: [{ label: '去文件列表处理', tone: 'secondary', to: '/files' }],
          },
        },
        {
          id: 'daily-skill',
          title: '日报 Skill',
          description: '按计划整理会话内容并生成日报草稿',
          cells: [
            'v1.2',
            { label: '正常', tone: 'green' },
            '03-10 09:30',
            { label: '查看', tone: 'ghost' },
          ],
          detail: {
            title: '日报 Skill',
            status: { label: '正常', tone: 'green' },
            description: '定时汇总会话内容，稳定生成日报草稿。',
            metrics: [
              { label: '当前版本', value: 'v1.2' },
              { label: '最近更新', value: '03-10 09:30' },
            ],
            sections: [
              {
                title: '健康状态',
                items: [
                  {
                    title: '日更任务稳定',
                    subtitle: '最近 7 天均成功产出日报',
                    badge: { label: '通过', tone: 'green' },
                  },
                ],
              },
            ],
            actions: [{ label: '查看任务计划', tone: 'secondary', to: '/tasks' }],
          },
        },
      ],
    },
  },
  tasks: {
    key: 'tasks',
    frame: {
      orb: '任',
      title: '任务列表',
      subtitle: '工作态原型 · 左 Chat + 右管理后台',
      topBadge: '任务列表',
      topMeta: '06 个启用中',
    },
    chat: {
      title: 'Chat',
      subtitle: '围绕任务启停与执行通知',
      chip: '状态同步',
      composerPlaceholder: '继续追问任务执行状态',
      messages: [
        {
          type: 'bubble',
          tone: 'soft',
          time: '11:06',
          text: '把运行中的任务按优先级排给我看，我想先暂停一个。',
        },
        {
          type: 'bubble',
          tone: 'light',
          time: '11:07',
          text:
            '已切到任务列表，默认选中同步审批结论到飞书话题。右侧会显示描述、频率、最近日志和启停操作。',
          tags: [
            { label: '运行中', tone: 'amber' },
            { label: '可暂停', tone: 'green' },
          ],
        },
        {
          type: 'bubble',
          tone: 'dark',
          time: '11:08',
          align: 'right',
          text: '顺便把最近失败或待确认的任务也筛出来。',
        },
      ],
      notes: ['任务的启停、频率和最近日志都在右侧处理，Chat 只负责提醒和接收结果通知。'],
    },
    hero: {
      badge: '管理后台',
      context: '默认页：任务列表',
      title: '任务也应该先看列表，再决定启停和跟进',
      description:
        '工作页默认展示任务名称、频率、最近执行时间和状态。点击某个任务后，再在右侧查看描述、日志和手动操作。',
      metrics: [
        {
          label: '启用中',
          value: '06',
          note: '3 个与飞书提醒联动',
          tone: 'light',
        },
        {
          label: '待处理',
          value: '02',
          note: '1 个等待人工确认',
          tone: 'dark',
        },
      ],
    },
    workspace: {
      title: '任务列表',
      description: '按频率、状态和更新时间过滤，默认选中最近要执行的任务。',
      searchPlaceholder: '搜索任务名',
      primaryAction: '新建任务',
      primaryColumnLabel: '任务名称',
      filters: [
        { label: '运行中 03', tone: 'amber' },
        { label: '待确认 01', tone: 'neutral' },
        { label: '暂停 02', tone: 'neutral' },
        { label: '按下次触发排序', tone: 'neutral' },
      ],
      columns: [
        { label: '频率', width: '0.95fr' },
        { label: '最近执行', width: '1fr' },
        { label: '状态', width: '0.85fr' },
        { label: '操作', width: '0.82fr' },
      ],
      rows: [
        {
          id: 'approval-topic-task',
          title: '同步审批结论到飞书话题',
          description: '把审批结果同步到会话话题，推送确认卡片',
          cells: [
            '每 30 分钟',
            '今天 10:30',
            { label: '运行中', tone: 'purple' },
            { label: '查看', tone: 'dark-action' },
          ],
          detail: {
            title: '同步审批结论到飞书话题',
            status: { label: '运行中', tone: 'purple' },
            description: '持续监听审批结果，把结论同步成会话通知和飞书卡片。',
            metrics: [
              { label: '频率', value: '每 30 分钟' },
              { label: '下次触发', value: '今天 11:30' },
            ],
            sections: [
              {
                title: '最近日志',
                items: [
                  {
                    title: '10:30',
                    subtitle: '成功拉取 3 条审批结果，同步 2 条会话通知。',
                  },
                  {
                    title: '10:00',
                    subtitle: '发现 1 条重复结果，已跳过重复通知。',
                  },
                ],
              },
              {
                title: '关联对象',
                items: [
                  {
                    title: '审批同步 Skill',
                    subtitle: '当前版本 v1.3',
                    badge: { label: '查看', tone: 'ghost' },
                  },
                  {
                    title: 'approval-sync-20260311',
                    subtitle: '最近一次执行草稿',
                    badge: { label: '查看草稿', tone: 'amber' },
                  },
                ],
              },
            ],
            actions: [
              { label: '暂停任务', tone: 'primary' },
              { label: '立即执行一次', tone: 'secondary' },
            ],
          },
        },
        {
          id: 'approval-summary-task',
          title: '提取审批摘要并存入知识库',
          description: '从长消息和附件提取摘要，等待人工确认后写入',
          cells: [
            '每天 19:00',
            '昨天 19:00',
            { label: '待确认', tone: 'amber' },
            { label: '查看', tone: 'ghost' },
          ],
          detail: {
            title: '提取审批摘要并存入知识库',
            status: { label: '待确认', tone: 'amber' },
            description: '摘要内容已拉取，仍需人工确认后入库。',
            metrics: [
              { label: '频率', value: '每天 19:00' },
              { label: '下次触发', value: '今晚 19:00' },
            ],
            sections: [
              {
                title: '最近日志',
                items: [
                  {
                    title: '昨天 19:00',
                    subtitle: '摘要已提取，等待人工点击确认写入知识库。',
                  },
                ],
              },
            ],
            actions: [{ label: '查看知识库', tone: 'secondary', to: '/skills' }],
          },
        },
        {
          id: 'delivery-task',
          title: '推送交付清单给业务群',
          description: '把归档链接和负责人同步到业务群聊',
          cells: [
            '手动触发',
            '今天 09:58',
            { label: '已完成', tone: 'green' },
            { label: '打开', tone: 'ghost' },
          ],
          detail: {
            title: '推送交付清单给业务群',
            status: { label: '已完成', tone: 'green' },
            description: '今天的推送已发送，后续仍可手动再次执行。',
            metrics: [
              { label: '频率', value: '手动触发' },
              { label: '下次触发', value: '等待人工执行' },
            ],
            sections: [
              {
                title: '最近日志',
                items: [
                  {
                    title: '09:58',
                    subtitle: '已把交付清单和负责人链接同步到业务群。',
                  },
                ],
              },
            ],
            actions: [{ label: '再次执行', tone: 'secondary' }],
          },
        },
        {
          id: 'daily-summary-task',
          title: '会话日报生成',
          description: '按计划整理当天会话摘要，生成日报草稿',
          cells: [
            '每天 09:30',
            '今天 09:30',
            { label: '暂停', tone: 'neutral' },
            { label: '恢复', tone: 'ghost' },
          ],
          detail: {
            title: '会话日报生成',
            status: { label: '暂停', tone: 'neutral' },
            description: '任务已暂停，可在右侧恢复后继续自动生成日报。',
            metrics: [
              { label: '频率', value: '每天 09:30' },
              { label: '下次触发', value: '恢复后重新计算' },
            ],
            sections: [
              {
                title: '最近日志',
                items: [
                  {
                    title: '今天 09:30',
                    subtitle: '任务暂停，未继续生成新的日报草稿。',
                  },
                ],
              },
            ],
            actions: [{ label: '恢复任务', tone: 'primary' }],
          },
        },
      ],
    },
  },
  files: {
    key: 'files',
    frame: {
      orb: '文',
      title: '文件列表',
      subtitle: '工作态原型 · 左 Chat + 右管理后台',
      topBadge: '文件列表',
      topMeta: '24 个文件',
    },
    chat: {
      title: 'Chat',
      subtitle: '围绕附件上传与引用',
      chip: '文件联动',
      composerPlaceholder: '继续追问文件使用情况',
      messages: [
        {
          type: 'bubble',
          tone: 'soft',
          time: '11:33',
          text: '把这个草稿相关的文件都整理出来，我要预览预算表，再删掉旧的人群包。',
        },
        {
          type: 'bubble',
          tone: 'light',
          time: '11:34',
          text:
            '已切到文件列表，默认选中预算说明.xlsx。右侧会显示预览、元信息以及它被哪些草稿引用。',
          tags: [
            { label: '预算说明.xlsx', tone: 'amber' },
            { label: '可预览', tone: 'green' },
          ],
        },
        {
          type: 'bubble',
          tone: 'dark',
          time: '11:35',
          align: 'right',
          text: '把不再引用的文件也标出来，后面我统一清理。',
        },
      ],
      notes: ['文件的上传、预览、下载和删除都在右侧完成，结果会同步成 Chat 状态通知。'],
    },
    hero: {
      badge: '管理后台',
      context: '默认页：文件列表',
      title: '文件也应该先看列表，再决定预览和清理',
      description:
        '工作页默认展示文件名称、类型、大小、上传时间和引用状态。点击某个文件后，再在右侧查看预览、草稿引用和清理动作。',
      metrics: [
        {
          label: '本周新增',
          value: '09',
          note: '其中 4 个与草稿直接关联',
          tone: 'light',
        },
        {
          label: '待清理',
          value: '03',
          note: '未被引用超过 7 天',
          tone: 'dark',
        },
      ],
    },
    workspace: {
      title: '文件列表',
      description: '按类型、引用状态和上传时间过滤，默认选中预算说明表。',
      searchPlaceholder: '搜索文件名',
      primaryAction: '上传文件',
      primaryColumnLabel: '文件名称',
      filters: [
        { label: 'Excel 08', tone: 'amber' },
        { label: 'CSV 06', tone: 'neutral' },
        { label: '已引用 17', tone: 'neutral' },
        { label: '待清理 03', tone: 'neutral' },
        { label: '按上传时间排序', tone: 'neutral' },
      ],
      columns: [
        { label: '类型', width: '0.72fr' },
        { label: '大小', width: '0.74fr' },
        { label: '上传时间', width: '1fr' },
        { label: '引用状态', width: '0.9fr' },
        { label: '操作', width: '0.82fr' },
      ],
      rows: [
        {
          id: 'budget-sheet',
          title: '预算说明.xlsx',
          description: '被当前优惠券草稿引用，适合在右侧预览',
          cells: [
            'Excel',
            '1.8 MB',
            '今天 10:12',
            { label: '已引用', tone: 'green' },
            { label: '查看', tone: 'dark-action' },
          ],
          detail: {
            title: '预算说明.xlsx',
            status: { label: '已引用', tone: 'green' },
            description: '当前选中文件的预览、元信息、引用草稿和清理动作。',
            metrics: [
              { label: '类型', value: 'Excel' },
              { label: '大小', value: '1.8 MB' },
            ],
            sections: [
              {
                title: '快速预览',
                items: [
                  {
                    title: '预算上限',
                    subtitle: '列 B',
                  },
                  {
                    title: '预算下限',
                    subtitle: '列 C',
                  },
                  {
                    title: '活动备注',
                    subtitle: '列 F',
                  },
                ],
              },
              {
                title: '引用草稿',
                items: [
                  {
                    title: 'coupon-draft-20260311',
                    subtitle: '今天 10:25 生成',
                    badge: { label: '待确认', tone: 'amber' },
                  },
                  {
                    title: 'coupon-refresh-20260309',
                    subtitle: '03-09 14:12 生成',
                    badge: { label: '待确认', tone: 'amber' },
                  },
                ],
              },
            ],
            actions: [
              { label: '预览文件', tone: 'primary' },
              { label: '下载文件', tone: 'secondary' },
              { label: '标记待清理', tone: 'secondary' },
            ],
          },
        },
        {
          id: 'audience-csv',
          title: '定向人群.csv',
          description: '用于人群筛选，当前被 2 份草稿引用',
          cells: [
            'CSV',
            '423 KB',
            '今天 09:56',
            { label: '已引用', tone: 'green' },
            { label: '查看', tone: 'ghost' },
          ],
          detail: {
            title: '定向人群.csv',
            status: { label: '已引用', tone: 'green' },
            description: '人群包文件被多份草稿复用，当前不建议清理。',
            metrics: [
              { label: '类型', value: 'CSV' },
              { label: '大小', value: '423 KB' },
            ],
            sections: [
              {
                title: '引用草稿',
                items: [
                  {
                    title: 'coupon-draft-20260311',
                    subtitle: '今天 10:25 生成',
                    badge: { label: '待确认', tone: 'amber' },
                  },
                  {
                    title: 'activity-brief-20260311',
                    subtitle: '今天 09:42 生成',
                    badge: { label: '已完成', tone: 'green' },
                  },
                ],
              },
            ],
            actions: [{ label: '下载文件', tone: 'secondary' }],
          },
        },
        {
          id: 'approval-png',
          title: '旧版审批截图.png',
          description: '最近 7 天未被引用，建议归档或删除',
          cells: [
            'PNG',
            '1.2 MB',
            '03-08 14:22',
            { label: '待清理', tone: 'red' },
            { label: '处理', tone: 'ghost' },
          ],
          detail: {
            title: '旧版审批截图.png',
            status: { label: '待清理', tone: 'red' },
            description: '该截图近期未被引用，可直接标记归档或删除。',
            metrics: [
              { label: '类型', value: 'PNG' },
              { label: '大小', value: '1.2 MB' },
            ],
            sections: [
              {
                title: '清理建议',
                items: [
                  {
                    title: '7 天未被引用',
                    subtitle: '可归档到冷存储或直接删除',
                    badge: { label: '建议处理', tone: 'amber' },
                  },
                ],
              },
            ],
            actions: [{ label: '标记待清理', tone: 'primary' }],
          },
        },
        {
          id: 'brief-template',
          title: '活动简报模板.docx',
          description: '被活动摘要 Skill 调用，用作交付物模板',
          cells: [
            'DOCX',
            '286 KB',
            '03-07 11:10',
            { label: '已引用', tone: 'green' },
            { label: '查看', tone: 'ghost' },
          ],
          detail: {
            title: '活动简报模板.docx',
            status: { label: '已引用', tone: 'green' },
            description: '该模板由活动摘要 Skill 自动引用，用于生成交付文档。',
            metrics: [
              { label: '类型', value: 'DOCX' },
              { label: '大小', value: '286 KB' },
            ],
            sections: [
              {
                title: '引用来源',
                items: [
                  {
                    title: '活动摘要 Skill',
                    subtitle: '当前版本 v2.1',
                    badge: { label: '查看', tone: 'ghost' },
                  },
                ],
              },
            ],
            actions: [{ label: '下载模板', tone: 'secondary' }],
          },
        },
      ],
    },
  },
}

export const executionPage = {
  frame: {
    orb: '执',
    title: '草稿执行页',
    subtitle: '工作态原型 · 左 Chat + 右业务执行区',
    topBadge: '草稿执行页',
    topMeta: '当前草稿：待确认',
  },
  chat: {
    title: 'Chat',
    subtitle: '围绕草稿补充与提交通知',
    chip: '草稿联动',
    composerPlaceholder: '继续补充草稿要求',
    messages: [
      {
        type: 'bubble',
        tone: 'soft',
        time: '11:18',
        text: '打开刚才那份优惠券草稿，我要先补齐缺失字段再提交。',
      },
      {
        type: 'bubble',
        tone: 'light',
        time: '11:19',
        text:
          '已打开草稿执行页，检测到“预算上限”还未填写。右侧浮层已经定位到待补字段。',
        tags: [
          { label: '待补 1 项', tone: 'amber' },
          { label: '执行页已定位', tone: 'purple' },
        ],
      },
    ],
    notes: ['Chat 保留需求、草稿卡片和提交结果通知；实际补填与提交都在右侧执行页完成。'],
  },
  hero: {
    badge: '业务执行区',
    context: '当前草稿：coupon-draft-20260311',
    title: '真实业务页面在底层，AI 浮层负责补充与提交',
    description:
      '用户在真实表单里修改字段，浮层实时更新状态、进度和待补项。提交结果会作为状态消息同步回左侧 Chat。',
  },
  workspace: {
    title: '优惠券业务页面',
    description: '业务表单是页面抽象，AI 浮层悬在上面，点击问题会定位到具体字段。',
  },
}
