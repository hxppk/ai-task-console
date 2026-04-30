import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Breadcrumb, Steps, Table, Tag, Card, Descriptions, Button, Space, Tooltip, Typography, Alert, Badge, Divider } from 'antd'
import { ArrowLeftOutlined, FolderOpenOutlined, FileTextOutlined, AppstoreOutlined } from '@ant-design/icons'
import {
  getTask,
  getSubTasksForTask,
  getCouponItemsForTask,
  collectLeafSubTasks,
  ADMIN_TASK_STATUS,
  ADMIN_TASK_STATUS_COLOR,
  ADMIN_COUPON_STATUS,
  BIZ_TASK_STATUS_COLOR,
  BIZ_COUPON_STATUS,
  BIZ_COUPON_STATUS_COLOR,
  TASK_PROGRESS_STEPS,
} from '../../mock/data'
import { ItemsDrawer } from './ItemsDrawer'
import styles from './TaskDetail.module.css'

const SKILL_COLOR = {
  建券草稿: 'green',
  选商品: 'lime',
  CDP: 'cyan',
  文案生成: 'gold',
  生图: 'orange',
  海报合成: 'volcano',
  玩法规则生成: 'purple',
  活动搭建: 'blue',
}

export default function TaskDetail({ mode = 'admin' }) {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [drawerSubTask, setDrawerSubTask] = useState(null)

  const isAdmin = mode === 'admin'
  const task = getTask(taskId)
  const subTasks = getSubTasksForTask(taskId)

  if (!task) return <div>任务不存在</div>

  const backPath = isAdmin ? '/admin/tasks' : '/biz/tasks'

  /* ─── Tree helpers ─── */
  const isGroup = (r) => r.children && r.children.length > 0

  function getLeafProgress(record) {
    const items = record.items || []
    const total = Math.max(items.length, record.itemCount || 0)
    const confirmed = items.filter(item => item.ext?.bizItemId).length
    return { total, confirmed, generated: items.length }
  }

  // Count expected leaf outputs and bizItemId confirmations.
  function countBizItems(nodes) {
    let total = 0, confirmed = 0
    function walk(ns) {
      if (!ns) return
      for (const n of ns) {
        if (n.children && n.children.length > 0) {
          walk(n.children)
        } else {
          const progress = getLeafProgress(n)
          total += progress.total
          confirmed += progress.confirmed
        }
      }
    }
    walk(nodes)
    return { total, confirmed }
  }

  // Count pending drafts (has draftId but no bizItemId)
  function countPendingDrafts(nodes) {
    let count = 0
    function walk(ns) {
      if (!ns) return
      for (const n of ns) {
        if (n.children && n.children.length > 0) {
          walk(n.children)
        } else if (n.items && n.items.length > 0) {
          for (const item of n.items) {
            if (item.ext?.draftId && !item.ext?.bizItemId) count++
          }
        }
      }
    }
    walk(nodes)
    return count
  }

  // Check if all descendants have bizItemId
  function allDescendantsConfirmed(record) {
    if (isGroup(record)) {
      return record.children.every(allDescendantsConfirmed)
    }
    const { total, confirmed, generated } = getLeafProgress(record)
    if (total === 0) return true
    return generated >= total && confirmed === total
  }

  // Get names of items missing bizItemId
  function getMissingItems(record) {
    const missing = []
    function walk(n) {
      if (n.children && n.children.length > 0) {
        n.children.forEach(walk)
      } else {
        const items = n.items || []
        items.forEach(item => {
          if (!item.ext?.bizItemId) {
            missing.push(item.ext?.draftId ? item.name : `${item.name}（待生成草稿）`)
          }
        })
        const missingGeneratedCount = Math.max((n.itemCount || 0) - items.length, 0)
        if (missingGeneratedCount > 0) {
          missing.push(`${n.name}（待生成 ${missingGeneratedCount} 个）`)
        }
      }
    }
    walk(record)
    return missing
  }

  function renderName(record) {
    if (isGroup(record)) {
      return (
        <Space className={styles.nameGroup}>
          <span className={styles.nodeGlyph}><FolderOpenOutlined /></span>
          <span className={styles.nameText}>{record.name}</span>
        </Space>
      )
    }
    if (record.level === 2) {
      return (
        <Space className={styles.nameLeaf}>
          <span className={`${styles.nodeGlyph} ${styles.glyphL2}`}><FileTextOutlined /></span>
          <span className={`${styles.nameText} ${styles.nameL2}`}>{record.name}</span>
        </Space>
      )
    }
    return (
      <Space className={styles.nameLeaf}>
        <span className={`${styles.nodeGlyph} ${styles.glyphL1}`}><AppstoreOutlined /></span>
        <span className={`${styles.nameText} ${styles.nameL1}`}>{record.name}</span>
      </Space>
    )
  }

  function rowClassName(record) {
    const cls = [styles.treeRow]
    if (isGroup(record)) cls.push(styles.groupRow)
    else cls.push(styles.leafRow)
    if (record.level === 1) cls.push(styles.level1)
    if (record.level === 2) cls.push(styles.level2)
    return cls.join(' ')
  }

  /* ─── Admin columns (tree table) ─── */
  const adminColumns = [
    {
      title: '编号', dataIndex: 'id', key: 'id', width: 100,
      render: (v, record) => {
        if (isGroup(record)) return <span style={{ color: '#bbb', fontSize: 12 }}>{v}</span>
        return <span style={{ fontSize: 12, color: '#888' }}>{v}</span>
      },
    },
    { title: '名称', key: 'name', width: 200, render: (_, r) => renderName(r) },
    {
      title: '类型', key: 'level', width: 60,
      render: (_, record) => {
        if (isGroup(record)) return <Tag color="blue" style={{ fontSize: 11, padding: '0 4px' }}>组</Tag>
        if (record.level === 2) return <Tag color="green" style={{ fontSize: 11, padding: '0 4px' }}>孙</Tag>
        return <Tag style={{ fontSize: 11, padding: '0 4px', color: '#999' }}>叶</Tag>
      },
    },
    {
      title: '执行 Agent', key: 'agent', width: 140,
      render: (_, record) => {
        if (record.agent === '—' || !record.agent) return <span style={{ color: '#999' }}>—</span>
        return <Tag>{record.agent}</Tag>
      },
    },
    {
      title: '使用 Skill', key: 'skill', width: 220,
      render: (_, record) => {
        if (!record.skills || record.skills.length === 0) return <span style={{ color: '#999' }}>—</span>
        return (
          <Space size={[4, 4]} wrap>
            {(record.skills || []).map(s => (
              <Tag key={s} color={SKILL_COLOR[s]}>{s}</Tag>
            ))}
          </Space>
        )
      },
    },
    {
      title: '产出数', key: 'itemCount', width: 80, align: 'right',
      render: (_, record) => {
        const n = record.itemCount || 0
        if (n === 0) return <span style={{ color: '#999' }}>—</span>
        return (
          <Tag
            color={n > 1 ? 'green' : undefined}
            style={{ cursor: 'pointer' }}
            onClick={() => setDrawerSubTask(record)}
          >
            ×{n}
          </Tag>
        )
      },
    },
    {
      title: '确认进度', key: 'confirmProgress', width: 160,
      render: (_, record) => {
        // Group node: count bizItemId across all descendants
        if (isGroup(record)) {
          const { total, confirmed } = countBizItems([record])
          if (total === 0) return <span style={{ color: '#999' }}>—</span>
          return <span style={{ color: confirmed === total ? '#52c41a' : '#faad14', fontWeight: confirmed === total ? 600 : undefined }}>已回传 {confirmed}/{total}</span>
        }
        // Leaf node: count bizItemId from items
        const { total, confirmed } = getLeafProgress(record)
        if (total > 0) {
          return <span style={{ color: confirmed === total ? '#52c41a' : '#faad14' }}>已回传 {confirmed}/{total}</span>
        }
        return <span style={{ color: '#999' }}>—</span>
      },
    },
    {
      title: '状态', key: 'status', width: 120,
      render: (_, record) => {
        const map = {
          [ADMIN_COUPON_STATUS.COMPLETED]: { status: 'success', text: '已完成' },
          [ADMIN_COUPON_STATUS.PENDING_CONFIRM]: { status: 'warning', text: '待确认' },
          [ADMIN_COUPON_STATUS.CREATING]: { status: 'processing', text: '生成中' },
          [ADMIN_COUPON_STATUS.FAILED]: { status: 'error', text: '失败' },
          [ADMIN_COUPON_STATUS.QUEUED]: { status: 'default', text: '排队中' },
        }
        const st = map[record.status] || map[ADMIN_COUPON_STATUS.QUEUED]
        return <Badge status={st.status} text={st.text} />
      },
    },
    {
      title: '操作', key: 'action', width: 220,
      render: (_, record) => {
        // Group node: 去确认/确认跳转 only if all descendants have bizItemId
        if (isGroup(record)) {
          const { total } = countBizItems([record])
          if (total > 0 && allDescendantsConfirmed(record)) {
            return <Button type="primary" size="small">确认跳转</Button>
          }
          const missing = getMissingItems(record)
          return (
            <Tooltip title={missing.length > 0 ? `待确认: ${missing.join('、')}` : '无产出物'}>
              <Button type="primary" size="small" disabled>确认跳转</Button>
            </Tooltip>
          )
        }
        // Leaf node: 去确认 if has draftId but no bizItemId
        if (record.items && record.items.length > 0) {
          const hasPending = record.items.some(item => item.ext?.draftId && !item.ext?.bizItemId)
          if (hasPending) {
            return <Space><Button type="link" size="small">去确认</Button><Button type="link" size="small" onClick={() => setDrawerSubTask(record)}>详情</Button></Space>
          }
          if (record.status === ADMIN_COUPON_STATUS.COMPLETED) {
            return <Button type="link" size="small" onClick={() => setDrawerSubTask(record)}>详情</Button>
          }
        }
        if (record.status === ADMIN_COUPON_STATUS.FAILED) {
          return <Space><Button type="link" size="small">重试</Button><Button type="link" size="small" onClick={() => setDrawerSubTask(record)}>详情</Button></Space>
        }
        if (record.status === ADMIN_COUPON_STATUS.CREATING || record.status === ADMIN_COUPON_STATUS.QUEUED) {
          return <span style={{ color: '#999' }}>—</span>
        }
        return null
      },
    },
    {
      title: '耗时', dataIndex: 'duration', key: 'duration', width: 80, align: 'right',
      render: (v) => v || '—',
    },
  ]

  /* ─── Biz columns ─── */
  const bizColumns = [
    { title: '券名称', dataIndex: 'name', key: 'name', ellipsis: true },
    { title: '券类型', key: 'extType', width: 80, render: (_, r) => r.ext?.type },
    { title: '面额', key: 'extAmount', width: 80, render: (_, r) => r.ext?.amount },
    { title: '适用范围', key: 'extScope', width: 100, render: (_, r) => r.ext?.scope },
    {
      title: '状态', key: 'bizStatus', width: 100,
      render: (_, r) => <Tag color={BIZ_COUPON_STATUS_COLOR[r.ext?.bizStatus]}>{r.ext?.bizStatus}</Tag>,
    },
    {
      title: '操作', key: 'action', width: 140,
      render: (_, r) => {
        const s = r.ext?.bizStatus
        if (s === BIZ_COUPON_STATUS.CONFIRMED)
          return <Space><Button type="link" size="small">查看</Button><Button type="link" size="small">编辑</Button></Space>
        if (s === BIZ_COUPON_STATUS.PENDING_CONFIRM)
          return <Button type="link" size="small">去确认</Button>
        if (s === BIZ_COUPON_STATUS.DISCARDED)
          return <Tag color="default">已废弃</Tag>
        return null
      },
    },
  ]

  /* ─── Admin mode ─── */
  if (isAdmin) {
    const { total: bizTotal, confirmed: bizConfirmed } = countBizItems(subTasks)
    const pendingDrafts = countPendingDrafts(subTasks)
    const leafCount = collectLeafSubTasks(subTasks).length

    const allConfirmed = bizTotal > 0 && bizConfirmed === bizTotal
    const alertMsg = pendingDrafts > 0
      ? `待确认草稿 ${pendingDrafts} 个，全部回传业务 ID 后可确认主任务`
      : allConfirmed
        ? '所有产出物已回传业务 ID，可确认主任务'
        : `产出物回传中：已回传 ${bizConfirmed}/${bizTotal}`

    return (
      <div className={styles.page}>
        <Breadcrumb items={[
          { title: <a onClick={() => navigate(backPath)}>任务管理</a> },
          { title: task.id },
        ]} />

        <div className={styles.header}>
          <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate(backPath)} />
          <Typography.Title level={4} style={{ margin: 0 }}>{task.id}</Typography.Title>
          <Tag color={ADMIN_TASK_STATUS_COLOR[task.adminStatus]}>{task.adminStatus}</Tag>
        </div>
        <Typography.Text type="secondary">{task.name}</Typography.Text>

        <Card size="small">
          <Descriptions column={5} size="small">
            <Descriptions.Item label="OA单号">{task.oaNumber ? <a>{task.oaNumber}</a> : '—'}</Descriptions.Item>
            <Descriptions.Item label="来源">{task.source}</Descriptions.Item>
            <Descriptions.Item label="关联活动">{task.activity}</Descriptions.Item>
            <Descriptions.Item label="发起人">{task.creator}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{task.createdAt}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card size="small" title="任务进度">
          <div style={{ maxWidth: 600 }}>
            <Steps current={1} status="process" size="small"
              items={TASK_PROGRESS_STEPS.map(title => ({ title }))}
            />
          </div>
        </Card>

        <Alert
          type={allConfirmed ? 'success' : 'warning'}
          showIcon
          message={alertMsg}
          action={pendingDrafts > 0 ? <Button size="small" type="primary">去确认草稿</Button> : allConfirmed ? <Button size="small" type="primary">确认主任务</Button> : null}
        />

        <Card
          size="small"
          title="子任务清单（树状）"
          extra={
            <Space split={<Divider type="vertical" />}>
              <span>叶子任务 {leafCount}</span>
              <span>已回传 <Tag color="success">{bizConfirmed}/{bizTotal}</Tag></span>
              <span>待确认草稿 <Tag color="warning">{pendingDrafts}</Tag></span>
            </Space>
          }
        >
          <Table
            dataSource={subTasks}
            columns={adminColumns}
            rowKey="id"
            size="middle"
            pagination={false}
            scroll={{ x: 1280 }}
            defaultExpandAllRows
            rowClassName={rowClassName}
            expandable={{ indentSize: 28, expandRowByClick: true }}
          />
        </Card>

        <ItemsDrawer subTask={drawerSubTask} onClose={() => setDrawerSubTask(null)} />
      </div>
    )
  }

  /* ─── Biz mode ─── */
  return (
    <div className={styles.page}>
      <Breadcrumb items={[
        { title: <a onClick={() => navigate(backPath)}>AI 建券</a> },
        { title: task.name },
      ]} />

      <div className={styles.header}>
        <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate(backPath)} />
        <Typography.Title level={4} style={{ margin: 0 }}>{task.name}</Typography.Title>
        <Tag color={BIZ_TASK_STATUS_COLOR[task.bizStatus]}>{task.bizStatus}</Tag>
      </div>
      <Typography.Text type="secondary">确认进度：已确认 {task.confirmedCount}/{task.totalCouponCount}</Typography.Text>

      <Card size="small" title="券清单">
        <Table
          dataSource={getCouponItemsForTask(taskId)}
          columns={bizColumns}
          rowKey="id"
          size="middle"
          pagination={false}
        />
      </Card>
    </div>
  )
}
