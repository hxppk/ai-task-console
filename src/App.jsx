import './App.css'

const sidebarGroups = [
  {
    label: '工作区',
    items: [
      { icon: 'draft', label: '草稿管理', active: true },
      { icon: 'skill', label: 'Skill 管理' },
    ],
  },
  {
    label: '运维',
    items: [
      { icon: 'task', label: '任务管理' },
      { icon: 'file', label: '文件管理' },
    ],
  },
  {
    label: '设置',
    items: [{ icon: 'settings', label: '配置' }],
  },
]

const timelineSteps = [
  {
    status: 'done',
    title: '用户发起需求',
    meta: '19:30',
    detail: '“帮我建一张满30减5的代金券”',
  },
  {
    status: 'done',
    title: 'Agent 解析需求，调用 Skill「代金券创建」',
    meta: '0.3s',
  },
  {
    status: 'done',
    title: '草稿生成完成',
    meta: '1.2s',
    detail: '回填字段 10 项',
  },
  {
    status: 'current',
    title: '等待用户确认',
    meta: '当前状态',
  },
  {
    status: 'pending',
    title: '跳转业务系统，执行表单回填',
  },
  {
    status: 'pending',
    title: '校验回填结果',
  },
  {
    status: 'pending',
    title: '用户确认提交',
  },
  {
    status: 'pending',
    title: '提交结果同步',
  },
]

const overlayIssues = [
  {
    field: '有效期结束时间',
    message: '业务系统要求精确到 23:59:59',
  },
  {
    field: '券名称',
    message: '建议补充“小程序专享”以便前台识别',
  },
]

const overlayLogs = [
  { status: 'done', label: '草稿生成完成', meta: '1.2s' },
  { status: 'current', label: '等待用户确认' },
  { status: 'pending', label: '执行表单回填' },
]

function App() {
  return (
    <div className="agent-page">
      <div className="agent-frame">
        <Sidebar />

        <main className="console-panel">
          <ConsoleHeader />
          <DraftCard />

          <div className="section-label">
            <span className="section-label-bar" />
            <span>执行链路</span>
          </div>

          <Timeline />
        </main>
      </div>

      <MonitorOverlay />
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">营</div>
        <div className="sidebar-brand-name">营销 Agent</div>
      </div>

      <div className="sidebar-groups">
        {sidebarGroups.map((group) => (
          <div className="sidebar-group" key={group.label}>
            <div className="sidebar-group-label">{group.label}</div>

            <div className="sidebar-items">
              {group.items.map((item) => (
                <button
                  className={`sidebar-item ${item.active ? 'sidebar-item-active' : ''}`}
                  key={item.label}
                  type="button"
                >
                  <span className="sidebar-item-icon">
                    <Icon name={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-footer-avatar">A</div>
        <div className="sidebar-footer-copy">Admin Workspace</div>
      </div>
    </aside>
  )
}

function ConsoleHeader() {
  return (
    <section className="console-header">
      <div className="console-header-main">
        <div className="console-header-icon">
          <svg fill="none" viewBox="0 0 28 28">
            <path d="M14 4L22 22H6L14 4Z" fill="currentColor" />
          </svg>
        </div>

        <div className="console-header-copy">
          <div className="console-header-row">
            <h1>满30减5-小程序专享</h1>
            <span className="status-pill status-pill-blue">执行中</span>
          </div>
          <p>
            Target: <span>优惠券系统 · 生产环境</span>
          </p>
        </div>
      </div>

      <div className="console-header-actions">
        <IconButton icon="edit" label="编辑" />
        <IconButton icon="refresh" label="刷新" />
        <IconButton icon="power" label="电源" />
        <IconButton icon="trash" label="删除" />
      </div>
    </section>
  )
}

function DraftCard() {
  return (
    <section className="draft-card">
      <div className="draft-card-main">
        <div className="draft-card-icon">
          <Icon name="file" />
        </div>

        <div className="draft-card-copy">
          <div className="draft-card-row">
            <h2>满30减5</h2>
            <span className="status-pill status-pill-amber">待确认</span>
          </div>
          <p>关联 Skill：代金券创建</p>
        </div>
      </div>

      <button className="ghost-button" type="button">
        查看草稿
      </button>
    </section>
  )
}

function Timeline() {
  return (
    <section className="timeline-panel">
      {timelineSteps.map((step) => (
        <div className="timeline-step" key={step.title}>
          <div className="timeline-step-row">
            <div className="timeline-step-main">
              <span className={`timeline-marker timeline-marker-${step.status}`}>
                {step.status === 'done' ? '✓' : step.status === 'current' ? '⏳' : '○'}
              </span>
              <span className={`timeline-title timeline-title-${step.status}`}>{step.title}</span>
            </div>

            {step.meta ? (
              <span className={`timeline-meta timeline-meta-${step.status}`}>{step.meta}</span>
            ) : null}
          </div>

          {step.detail ? <div className="timeline-detail">{step.detail}</div> : null}
        </div>
      ))}
    </section>
  )
}

function MonitorOverlay() {
  return (
    <aside className="monitor-overlay">
      <div className="monitor-status">
        <div className="monitor-status-main">
          <span className="monitor-status-bar" />
          <div className="monitor-status-copy">
            <div className="monitor-status-label">待确认</div>
            <div className="monitor-status-text">草稿已生成，等待确认</div>
          </div>
        </div>

        <button className="collapse-button" type="button">
          <svg fill="none" viewBox="0 0 14 14">
            <path
              d="M4.2 5.3L7 8.1L9.8 5.3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
            />
          </svg>
        </button>
      </div>

      <div className="monitor-block">
        <div className="monitor-caption">回填进度</div>
        <div className="monitor-progress-label">10/10 字段已回填</div>
        <div className="monitor-progress-track">
          <div className="monitor-progress-fill" />
        </div>
      </div>

      <div className="monitor-block">
        <div className="monitor-error-count">2 项异常</div>

        <div className="monitor-errors">
          {overlayIssues.map((issue) => (
            <button className="monitor-error-item" key={issue.field} type="button">
              <div className="monitor-error-copy">
                <div className="monitor-error-title">{issue.field}</div>
                <div className="monitor-error-text">{issue.message}</div>
              </div>
              <span className="monitor-error-chevron">›</span>
            </button>
          ))}
        </div>
      </div>

      <div className="monitor-block">
        <div className="monitor-caption">实时日志</div>

        <div className="monitor-log-list">
          {overlayLogs.map((log) => (
            <div className="monitor-log-row" key={log.label}>
              <div className="monitor-log-main">
                <span className={`monitor-log-marker monitor-log-marker-${log.status}`}>
                  {log.status === 'done' ? '✓' : log.status === 'current' ? '⏳' : '○'}
                </span>
                <span className={`monitor-log-text monitor-log-text-${log.status}`}>{log.label}</span>
              </div>

              {log.meta ? <span className="monitor-log-meta">{log.meta}</span> : null}
            </div>
          ))}
        </div>
      </div>

      <button className="primary-button" type="button">
        开始回填
      </button>
    </aside>
  )
}

function IconButton({ icon, label }) {
  return (
    <button className="icon-button" type="button">
      <span className="sr-only">{label}</span>
      <Icon name={icon} />
    </button>
  )
}

function Icon({ name }) {
  switch (name) {
    case 'draft':
      return (
        <svg fill="none" viewBox="0 0 16 16">
          <rect height="10" rx="1.8" stroke="currentColor" strokeWidth="1.4" width="10" x="3" y="3" />
          <path d="M5.5 6.5H10.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
          <path d="M5.5 9H9.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
        </svg>
      )
    case 'skill':
      return (
        <svg fill="none" viewBox="0 0 16 16">
          <path
            d="M8 2.8L10 5.7L13.2 6.1L10.9 8.3L11.5 11.4L8 9.8L4.5 11.4L5.1 8.3L2.8 6.1L6 5.7L8 2.8Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </svg>
      )
    case 'task':
      return (
        <svg fill="none" viewBox="0 0 16 16">
          <rect height="9" rx="1.6" stroke="currentColor" strokeWidth="1.4" width="10" x="3" y="4" />
          <path d="M5.5 2.8V5.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
          <path d="M10.5 2.8V5.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
        </svg>
      )
    case 'file':
      return (
        <svg fill="none" viewBox="0 0 16 16">
          <path d="M4 2.8H9.2L12 5.6V13.2H4V2.8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
          <path d="M9 2.8V5.8H12" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
        </svg>
      )
    case 'settings':
      return (
        <svg fill="none" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 2.3V4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
          <path d="M8 12V13.7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
          <path d="M13.7 8H12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
          <path d="M4 8H2.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
        </svg>
      )
    case 'edit':
      return (
        <svg fill="none" viewBox="0 0 18 18">
          <path d="M4 13.5L13.2 4.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M11.8 4.2H13.8V6.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M4 13.8L7.2 13.4L4.4 10.6L4 13.8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      )
    case 'refresh':
      return (
        <svg fill="none" viewBox="0 0 18 18">
          <path d="M14.5 9A5.5 5.5 0 1 1 12.9 5.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M13 3.7H15V5.7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      )
    case 'power':
      return (
        <svg fill="none" viewBox="0 0 18 18">
          <path d="M9 3.8V9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M5.3 5.3A5.2 5.2 0 1 0 12.7 5.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        </svg>
      )
    case 'trash':
      return (
        <svg fill="none" viewBox="0 0 18 18">
          <path d="M5.5 6V14H12.5V6" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M4 6H14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M7 6V4.5H11V6" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      )
    default:
      return null
  }
}

export default App
