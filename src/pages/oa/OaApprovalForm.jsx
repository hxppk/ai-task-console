import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Breadcrumb, Button, Space, Tabs, Table, Tag, Switch, Input,
  Select, DatePicker, Radio, Checkbox, message,
} from 'antd'
import {
  FormOutlined, SendOutlined, PrinterOutlined, StarOutlined,
  FileTextOutlined, PaperClipOutlined,
} from '@ant-design/icons'
import AiReviewModal from '../../components/ai/AiReviewModal'
import { OA_FORM_MOCK, OA_APPROVAL_HISTORY, OA_FIELD_OPTIONS } from '../../mock/data'
import styles from './OaApprovalForm.module.css'

// ---- View mode: completed form ----
function ViewForm() {
  const d = OA_FORM_MOCK
  return (
    <>
      <div className={styles.formNumber}>表单编号　{d.id}</div>
      <div className={styles.warningNote}>
        注：社群及会员到店活动申请须至少提前7个工作日发起；抖音渠道活动至少提前10个工作日发起流程申请。
      </div>

      <table className={styles.oaTable}>
        <tbody>
          <tr>
            <td className={styles.labelCell}>申请人</td>
            <td className={styles.valueCell}>{d.applicant}</td>
            <td className={styles.labelCell}>部门</td>
            <td className={styles.valueCell}>{d.department}</td>
            <td className={styles.labelCell}>岗位</td>
            <td className={styles.valueCell}>{d.position}</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>活动事项</td>
            <td className={styles.valueCell} colSpan={3}>{d.activityTopic}</td>
            <td className={styles.labelCell}>申请日期</td>
            <td className={styles.valueCell}>{d.applyDate}</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>涉及平台</td>
            <td className={styles.valueCell} colSpan={5}>
              <div className={styles.platformRow}>
                {d.platforms.map((p) => (
                  <Tag key={p} color="blue">{p}</Tag>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.labelCell}>申请活动日期</td>
            <td className={styles.valueCell} colSpan={2}>
              开始日期：{d.activityDateStart}
            </td>
            <td className={styles.valueCell} colSpan={3}>
              结束日期：{d.activityDateEnd}
            </td>
          </tr>
          <tr>
            <td className={styles.labelCell}>类型</td>
            <td className={styles.valueCell} colSpan={5}>
              <Radio.Group value={d.type} disabled>
                <Radio value="新增">新增</Radio>
                <Radio value="变更">变更</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td className={styles.labelCell}>区域一级</td>
            <td className={styles.valueCell}>{d.channelLevel1}</td>
            <td className={styles.labelCell}>区域二级</td>
            <td className={styles.valueCell} colSpan={3}>{d.channelLevel2}</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>涉及门店/区域</td>
            <td className={styles.valueCell} colSpan={5}>{d.storeArea}</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>是否与外部IP合作</td>
            <td className={styles.valueCell} colSpan={5}>
              <Radio.Group value={d.externalIp} disabled>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td className={styles.labelCell}>是否涉及与公司结算</td>
            <td className={styles.valueCell} colSpan={5}>
              <Radio.Group value={d.companySettlement} disabled>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td className={styles.labelCell}>是否为年度预算</td>
            <td className={styles.valueCell} colSpan={5}>
              <Radio.Group value={d.annualBudget} disabled>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td className={styles.labelCell}>涉及总金额</td>
            <td className={styles.valueCell} colSpan={5}>{d.totalAmount.toLocaleString()}</td>
          </tr>

          {/* 分摊费用 */}
          <tr>
            <td className={styles.labelCell}>分摊费用</td>
            <td colSpan={5} style={{ padding: 0 }}>
              <table className={styles.innerTable}>
                <thead>
                  <tr>
                    <th>j.物料金额</th>
                    <th>k.素材金额</th>
                    <th>l.广告金额</th>
                    <th>m.其他营销支持费用</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{d.costBreakdown.material.toFixed(2)}</td>
                    <td>{d.costBreakdown.creative.toFixed(2)}</td>
                    <td>{d.costBreakdown.advertising.toFixed(2)}</td>
                    <td>{d.costBreakdown.otherMarketing.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* 交易效果预估 */}
          <tr>
            <td className={styles.labelCell}>交易效果预估</td>
            <td colSpan={5} style={{ padding: 0 }}>
              <table className={styles.innerTable}>
                <thead>
                  <tr>
                    <th>a.预估核销率</th>
                    <th>b.预估GMV</th>
                    <th>c.预估财务ROI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{d.tradeEstimate.redemptionRate100}</td>
                    <td>{d.tradeEstimate.estimatedGMV.toLocaleString()}</td>
                    <td>{d.tradeEstimate.financialROI}</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th>d.预估核销率</th>
                    <th>e.预估GMV</th>
                    <th>f.预估财务ROI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{d.tradeEstimate.redemptionRate15}</td>
                    <td>{d.tradeEstimate.estimatedGMV15.toLocaleString()}</td>
                    <td>{d.tradeEstimate.financialROI15}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* 广告效果预估 */}
          <tr>
            <td className={styles.labelCell}>广告效果预估</td>
            <td colSpan={5} style={{ padding: 0 }}>
              <table className={styles.innerTable}>
                <thead>
                  <tr>
                    <th>g.预估曝光量</th>
                    <th>h.预估CPM单价（千次成本）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{d.adEstimate.impressions}</td>
                    <td>{d.adEstimate.cpmPrice || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td className={styles.labelCell}>优惠券类型</td>
            <td className={styles.valueCell} colSpan={5}>{d.couponType}</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>优惠券模板</td>
            <td className={styles.valueCell} colSpan={5}>
              <span className={styles.fileLink}><FileTextOutlined /> {d.couponTemplate}</span>
            </td>
          </tr>
          <tr>
            <td className={styles.labelCell}>优惠券规则</td>
            <td className={styles.valueCell} colSpan={5}>
              <span className={styles.fileLink}><FileTextOutlined /> {d.couponRules}</span>
            </td>
          </tr>
          <tr>
            <td className={styles.labelCell}>门店活动力度</td>
            <td className={styles.valueCell} colSpan={5}>
              <Radio.Group value={d.storeEffort} disabled>
                {OA_FIELD_OPTIONS.storeEffort.map((opt) => (
                  <Radio key={opt} value={opt}>{opt}</Radio>
                ))}
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td className={styles.labelCell}>活动门店数量</td>
            <td className={styles.valueCell} colSpan={5}>{d.storeCount}　家</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>活动内容</td>
            <td className={styles.valueCell} colSpan={5}>
              <div className={styles.activityContent}>{d.activityContent}</div>
            </td>
          </tr>
          <tr>
            <td className={styles.labelCell}>附件</td>
            <td className={styles.valueCell} colSpan={5}>
              {d.attachments.map((f, i) => (
                <div key={i} className={styles.fileInfo}>
                  <PaperClipOutlined />
                  <span className={styles.fileLink}>{f.name}</span>
                  <span className={styles.fileSize}>{f.size}</span>
                </div>
              ))}
            </td>
          </tr>

          {/* 签署方信息 */}
          <tr>
            <td colSpan={6} className={styles.sectionHeader}>签署方信息</td>
          </tr>
        </tbody>
      </table>

      <table className={styles.signerTable} style={{ marginTop: -1 }}>
        <thead>
          <tr>
            <th>序号</th>
            <th>签署模式</th>
            <th>签署人名称</th>
            <th>所属主体</th>
            <th>签署地区</th>
            <th>联系电话</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          {d.signers.map((s) => (
            <tr key={s.seq}>
              <td>{s.seq}</td>
              <td>{s.mode}</td>
              <td>{s.name}</td>
              <td>{s.entity}</td>
              <td>{s.region}</td>
              <td>{s.contact || '-'}</td>
              <td>{s.remark || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className={styles.oaTable} style={{ marginTop: -1 }}>
        <tbody>
          <tr>
            <td className={styles.labelCell}>待签署文件</td>
            <td className={styles.valueCell}>
              <div className={styles.fileInfo}>
                <FileTextOutlined style={{ color: '#ff4d4f' }} />
                <span className={styles.fileLink}>{d.pendingFile.name}</span>
                <span className={styles.fileSize}>{d.pendingFile.size}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.labelCell}>已签署文件</td>
            <td className={styles.valueCell}>
              <div className={styles.fileInfo}>
                <FileTextOutlined style={{ color: '#52c41a' }} />
                <span className={styles.fileLink}>{d.signedFile.name}</span>
                <span className={styles.fileSize}>{d.signedFile.size}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

// ---- Create mode: editable form ----
function CreateForm({ formState, setFormState }) {
  const update = (field, value) => setFormState((prev) => ({ ...prev, [field]: value }))

  return (
    <>
      <div className={styles.warningNote}>
        注：社群及会员到店活动至少提前7个工作日发起；抖音渠道活动至少提前10个工作日发起；<br />
        外卖活动申请至少提前5个工作日发起，若涉及相关活动素材须同步按照标准提交附件；区域外卖活动审核通过后由到家业务部统一配置；活动时间不可跨月申请。
      </div>

      <table className={styles.oaTable}>
        <tbody>
          <tr>
            <td className={styles.labelCell}>申请人</td>
            <td className={styles.valueCell}>何旭</td>
            <td className={styles.labelCell}>部门</td>
            <td className={styles.valueCell}>增长产品部</td>
            <td className={styles.labelCell}>岗位</td>
            <td className={styles.valueCell}>产品经理岗</td>
          </tr>
          <tr>
            <td className={`${styles.labelCell} ${styles.required}`}>活动事项</td>
            <td className={styles.valueCell} colSpan={3}>
              <Input
                placeholder="请输入活动事项"
                value={formState.activityTopic}
                onChange={(e) => update('activityTopic', e.target.value)}
              />
            </td>
            <td className={styles.labelCell}>申请日期</td>
            <td className={styles.valueCell}>2026-04-01</td>
          </tr>
          <tr>
            <td className={`${styles.labelCell} ${styles.required}`}>活动产品</td>
            <td className={styles.valueCell} colSpan={5}>
              <Radio.Group
                value={formState.activityProduct}
                onChange={(e) => update('activityProduct', e.target.value)}
              >
                {OA_FIELD_OPTIONS.activityProducts.map((p) => (
                  <Radio key={p} value={p}>{p}</Radio>
                ))}
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td className={`${styles.labelCell} ${styles.required}`}>业务渠道</td>
            <td className={styles.valueCell} colSpan={5}>
              <Checkbox.Group
                value={formState.businessChannels}
                onChange={(val) => update('businessChannels', val)}
                options={OA_FIELD_OPTIONS.businessChannels}
              />
              <table className={styles.innerTable} style={{ marginTop: 8 }}>
                <thead>
                  <tr>
                    <th>渠道一级</th>
                    <th>渠道二级</th>
                    <th>渠道三级</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Select
                        placeholder="请选择"
                        value={formState.channelLevel1}
                        onChange={(v) => update('channelLevel1', v)}
                        options={OA_FIELD_OPTIONS.channelLevel1.map((c) => ({ value: c, label: c }))}
                        style={{ width: '100%' }}
                        size="small"
                      />
                    </td>
                    <td>
                      <Select
                        placeholder="请选择"
                        value={formState.channelLevel2}
                        onChange={(v) => update('channelLevel2', v)}
                        options={OA_FIELD_OPTIONS.channelLevel2.map((c) => ({ value: c, label: c }))}
                        style={{ width: '100%' }}
                        size="small"
                      />
                    </td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className={`${styles.labelCell} ${styles.required}`}>申请活动日期</td>
            <td className={styles.valueCell} colSpan={5}>
              <Space>
                <span>开始日期：</span>
                <DatePicker
                  value={formState.activityDateStart}
                  onChange={(v) => update('activityDateStart', v)}
                />
                <span>结束日期：</span>
                <DatePicker
                  value={formState.activityDateEnd}
                  onChange={(v) => update('activityDateEnd', v)}
                />
              </Space>
            </td>
          </tr>
          <tr>
            <td className={`${styles.labelCell} ${styles.required}`}>类型</td>
            <td className={styles.valueCell} colSpan={5}>
              <Radio.Group
                value={formState.type}
                onChange={(e) => update('type', e.target.value)}
              >
                {OA_FIELD_OPTIONS.types.map((t) => (
                  <Radio key={t} value={t}>{t}</Radio>
                ))}
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td className={`${styles.labelCell} ${styles.required}`}>活动范围</td>
            <td className={styles.valueCell} colSpan={5}>
              <Select
                placeholder="==请选择=="
                value={formState.activityScope}
                onChange={(v) => update('activityScope', v)}
                options={[
                  { value: '全国', label: '全国' },
                  { value: '区域', label: '区域' },
                  { value: '城市', label: '城市' },
                ]}
                style={{ width: 200, marginBottom: 8 }}
              />
              <table className={styles.innerTable}>
                <thead>
                  <tr>
                    <th style={{ width: 50 }}>序号</th>
                    <th>活动三级</th>
                    <th>是否应用于全营运中心</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Checkbox /> 1</td>
                    <td>
                      <Space>
                        <Input size="small" style={{ width: 200 }} placeholder="请选择" />
                        <a style={{ color: '#1677ff', fontSize: 13 }}>选择</a>
                        <a style={{ color: '#1677ff', fontSize: 13 }}>清空</a>
                      </Space>
                    </td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className={`${styles.labelCell} ${styles.required}`}>涉及门店/区域</td>
            <td className={styles.valueCell} colSpan={5}>
              <Input
                placeholder="请输入涉及门店/区域"
                value={formState.storeArea}
                onChange={(e) => update('storeArea', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className={`${styles.labelCell} ${styles.required}`}>是否与外部IP合作</td>
            <td className={styles.valueCell} colSpan={5}>
              <Radio.Group
                value={formState.externalIp}
                onChange={(e) => update('externalIp', e.target.value)}
              >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td className={`${styles.labelCell} ${styles.required}`}>是否涉及与公司结算</td>
            <td className={styles.valueCell} colSpan={5}>
              <Radio.Group
                value={formState.companySettlement}
                onChange={(e) => update('companySettlement', e.target.value)}
              >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </td>
          </tr>

          {/* 分摊费用 */}
          <tr>
            <td className={styles.labelCell}>分摊费用</td>
            <td className={styles.valueCell} colSpan={5}>-</td>
          </tr>
          <tr>
            <td className={`${styles.labelCell} ${styles.required}`}>是否涉及配置</td>
            <td className={styles.valueCell} colSpan={5}>
              <Radio.Group
                value={formState.hasConfig}
                onChange={(e) => update('hasConfig', e.target.value)}
              >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td className={`${styles.labelCell} ${styles.required}`}>门店活动力度</td>
            <td className={styles.valueCell} colSpan={5}>
              <Radio.Group
                value={formState.storeEffort}
                onChange={(e) => update('storeEffort', e.target.value)}
              >
                {OA_FIELD_OPTIONS.storeEffort.map((opt) => (
                  <Radio key={opt} value={opt}>{opt}</Radio>
                ))}
              </Radio.Group>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

// ---- Approval history (bottom tab for view mode) ----
const approvalColumns = [
  { title: '时间', dataIndex: 'time', key: 'time', width: 180 },
  { title: '节点名称', dataIndex: 'node', key: 'node', width: 120 },
  { title: '操作者', dataIndex: 'handler', key: 'handler', width: 100 },
  { title: '操作', dataIndex: 'action', key: 'action', width: 100 },
  {
    title: '处理意见',
    dataIndex: 'remark',
    key: 'remark',
    render: (text) => <span style={{ whiteSpace: 'pre-wrap' }}>{text || '-'}</span>,
  },
]

// ---- Main component ----
export default function OaApprovalForm({ mode = 'create' }) {
  const navigate = useNavigate()
  const isView = mode === 'view'

  const [showAiReview, setShowAiReview] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')

  // Create mode form state
  const [formState, setFormState] = useState({
    activityTopic: '',
    activityProduct: undefined,
    businessChannels: [],
    channelLevel1: undefined,
    channelLevel2: undefined,
    activityDateStart: null,
    activityDateEnd: null,
    type: undefined,
    activityScope: undefined,
    storeArea: '',
    externalIp: undefined,
    companySettlement: undefined,
    hasConfig: undefined,
    storeEffort: undefined,
  })

  const handleSubmit = () => {
    setShowAiReview(true)
  }

  const handleConfirmSubmit = () => {
    setShowAiReview(false)
    message.success('流程已提交，正在跳转至已提交表单...')
    setTimeout(() => navigate('/oa/approval/PTHDN20240900070'), 1200)
  }

  const breadcrumbItems = isView
    ? [
        { title: '首页' },
        { title: '流程管理' },
        { title: '百茶百道集团' },
        { title: '销售业务–营运管理' },
        { title: '茶百道到店渠道活动审核' },
      ]
    : [
        { title: '首页' },
        { title: '流程管理' },
        { title: '百茶百道集团' },
        { title: '销售业务–营运管理' },
        { title: '本地生活活动立项申请' },
      ]

  const bottomTabItems = isView
    ? [
        { key: 'basic', label: '基本信息' },
        {
          key: 'workflow',
          label: '流程处理',
          children: (
            <div style={{ padding: '16px 0' }}>
              <Tabs
                size="small"
                items={[
                  { key: 'manager', label: '流程经理' },
                  { key: 'status', label: '流程状态' },
                  { key: 'diagram', label: '流程图' },
                  { key: 'table', label: '流程表格' },
                  { key: 'log', label: '流程日志' },
                ]}
                defaultActiveKey="manager"
              />
              <div style={{ marginTop: 8, marginBottom: 8 }}>
                <Checkbox defaultChecked>显示审批记录</Checkbox>
                <Radio.Group defaultValue="all" size="small" style={{ marginLeft: 16 }}>
                  <Radio.Button value="all">全部</Radio.Button>
                  <Radio.Button value="org">本机构</Radio.Button>
                  <Radio.Button value="dept">本部门</Radio.Button>
                </Radio.Group>
              </div>
              <Table
                dataSource={OA_APPROVAL_HISTORY}
                columns={approvalColumns}
                rowKey="time"
                size="small"
                pagination={false}
              />
            </div>
          ),
        },
        { key: 'stats', label: '访问统计' },
        { key: 'forward', label: '传阅记录(0)' },
        { key: 'feedback', label: '反馈记录' },
        { key: 'history', label: '历史记录' },
      ]
    : [
        { key: 'basic', label: '基本信息' },
        { key: 'workflow', label: '流程处理' },
        { key: 'permissions', label: '权限' },
      ]

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <Breadcrumb items={breadcrumbItems} />
        <Space>
          {isView ? (
            <>
              <Button icon={<SendOutlined />}>传阅</Button>
              <Button>实施反馈</Button>
              <Button>指定反馈人</Button>
              <Button icon={<PrinterOutlined />}>打印</Button>
              <Button icon={<StarOutlined />}>收藏</Button>
            </>
          ) : (
            <>
              <Button>暂存</Button>
              <Button type="primary" onClick={handleSubmit}>提交</Button>
              <Button>关联配置</Button>
              <Button onClick={() => navigate(-1)}>关闭</Button>
            </>
          )}
        </Space>
      </div>

      {/* Form card */}
      <div className={styles.formCard}>
        {/* Section title */}
        <div className={styles.sectionTitle}>
          <FormOutlined /> 审批内容
        </div>

        {/* Subject row */}
        <div className={styles.subjectRow}>
          <div>
            <span className={styles.subjectLabel}>主题　</span>
            <span className={styles.subjectValue}>
              {isView
                ? `${OA_FORM_MOCK.title}`
                : '提交时自动生成'}
            </span>
          </div>
          <Space>
            <Switch defaultChecked size="small" /> 允许传阅
          </Space>
        </div>

        {/* Form title */}
        <div className={styles.formTitle}>
          {isView ? '茶百道到店渠道活动审核' : '本地生活活动立项申请'}
        </div>

        {/* Form content */}
        <div style={{ padding: '0 24px 24px' }}>
          {isView
            ? <ViewForm />
            : <CreateForm formState={formState} setFormState={setFormState} />
          }
        </div>
      </div>

      {/* View mode: approval section header */}
      {isView && (
        <div className={styles.approvalCard} style={{ padding: '16px 24px' }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: '#1677ff', marginBottom: 4 }}>
            📋 流程处理
          </div>
        </div>
      )}

      {/* Bottom tabs */}
      <div className={styles.bottomTabs}>
        <div className={styles.bottomTabsInner}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={bottomTabItems}
          />
        </div>
      </div>

      {/* AI Review Modal */}
      {!isView && (
        <AiReviewModal
          open={showAiReview}
          onClose={() => setShowAiReview(false)}
          onConfirmSubmit={handleConfirmSubmit}
        />
      )}
    </div>
  )
}
