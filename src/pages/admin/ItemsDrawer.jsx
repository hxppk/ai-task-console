import { Drawer, Table, Tag, Space, Timeline } from 'antd'

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

export function ItemsDrawer({ subTask, onClose }) {
  if (!subTask) return null

  const shortId = subTask.id.split('-').pop()

  const columns = [
    { title: '产出物 ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: '名称', dataIndex: 'name', key: 'name', ellipsis: true },
    {
      title: '关键参数', key: 'params', ellipsis: true,
      render: (_, r) => {
        if (!r.ext) return '—'
        const pairs = Object.entries(r.ext).filter(([, v]) => typeof v === 'string' || typeof v === 'number')
        return <span style={{ fontSize: 12 }}>{pairs.map(([k, v]) => `${k}: ${v}`).join(' · ')}</span>
      },
    },
    {
      title: '状态', key: 'status', width: 80,
      render: (_, r) => <Tag color={r.status === '已完成' ? 'success' : 'processing'}>{r.status}</Tag>,
    },
    { title: '耗时', dataIndex: 'duration', key: 'duration', width: 70, render: (v) => v || '—' },
  ]

  return (
    <Drawer
      title={
        <Space>
          <span>{subTask.name}</span>
          <Tag color="blue">SUB-{shortId}</Tag>
          <Tag>{subTask.agent}</Tag>
        </Space>
      }
      open={!!subTask}
      onClose={onClose}
      width={560}
    >
      <Space size={[4, 4]} wrap style={{ marginBottom: 16 }}>
        {(subTask.skills || []).map(s => (
          <Tag key={s} color={SKILL_COLOR[s]}>{s}</Tag>
        ))}
      </Space>

      <Table dataSource={subTask.items || []} columns={columns} rowKey="id" size="small" pagination={false} />

      {(subTask.skillExecutionLog || []).length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Skill 调用链</div>
          <Timeline
            items={(subTask.skillExecutionLog || []).map((log, i) => ({
              children: (
                <span style={{ fontSize: 12 }}>
                  {log.time} 调用 <Tag color={SKILL_COLOR[log.skill]}>{log.skill}</Tag> Skill · 耗时 {log.duration} · {log.output}
                </span>
              ),
            }))}
          />
        </div>
      )}
    </Drawer>
  )
}
