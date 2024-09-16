<template>
  <div class="precautions-container">
   <!-- <h2>挂号前注意事项</h2> -->
    <div class="scrollable-content">
      <ul>
        <li>
          <strong>注册与登录:</strong>
          <ul>
            <li>请完成实名认证。</li>
            <li>确保手机号码正常可用，以便接收验证码和重要通知。</li>
          </ul>
        </li>
        <li>
          <strong>选择医院与科室:</strong>
          <ul>
            <li>了解目标医院的基本信息，包括地址、交通指南、工作时间等。</li>
            <li>根据自身症状选择合适的科室。</li>
            <li>查看医生的简介、擅长领域、评价等信息。</li>
          </ul>
        </li>
        <li>
          <strong>预约挂号:</strong>
          <ul>
            <li>提前规划好就诊时间，注意医院的挂号开放时间和截止时间。</li>
            <li>选择合适的挂号类型（如普通号、专家号），并了解不同类型的挂号费用和服务差异。</li>
            <li>确认支持的支付方式（如微信支付、支付宝等），并确保账户余额充足。</li>
          </ul>
        </li>
        <li>
          <strong>准备就诊资料:</strong>
          <ul>
            <li>带上身份证或其他有效证件，以备医院核实身份。</li>
            <li>如有医保卡，请携带，并确认小程序是否支持医保结算功能。</li>
            <li>携带以往的就诊记录、化验单、影像资料等，便于医生了解病情。</li>
          </ul>
        </li>
        <li>
          <strong>注意事项:</strong>
          <ul>
            <li>了解挂号小程序的退改签政策。</li>
            <li>如有严重疾病或特殊情况，请提前告知医务人员，并遵循专业建议。</li>
            <li>使用挂号小程序时注意个人隐私保护，避免泄露敏感信息。</li>
          </ul>
        </li>
        <li>
          <strong>技术支持:</strong>
          <ul>
            <li>确保使用的设备兼容挂号小程序，并安装最新版本的应用程序。</li>
            <li>挂号过程中保持稳定的网络连接。</li>
          </ul>
        </li>
        <li>
          <strong>安全提示:</strong>
          <ul>
            <li>注意防范假冒挂号平台或诈骗信息，确保通过官方渠道进行挂号。</li>
            <li>设置复杂密码并妥善保管，定期更换密码，提高账户安全性。</li>
          </ul>
        </li>
        <li>
          <strong>特殊情况:</strong>
          <ul>
            <li>如遇紧急情况，立即拨打急救电话或前往最近的急诊室，不要仅依赖挂号小程序。</li>
            <li>若因故无法按时就诊，请尽早取消预约，以便他人使用该名额。</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 这里可以添加任何需要的逻辑或数据
</script>

<style lang="scss" scoped>
$font-color: #333;
$highlight-color: #007BFF;

.precautions-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  max-height: 500px; // 根据需要设定最大高度

  h2 {
    color: $font-color;
    margin-bottom: 15px;
  }

  .scrollable-content {
    max-height: 50vh;
    overflow-y: auto; // 添加滚动条支持
    ul {
      // list-style-type: disc;
      margin-left: 0px;
      li {
        line-height: 1.5em;
        padding-left: 0; // 将左内边距设为 0
      }
    }
    strong {
      font-size: 1.1em;
      color: $highlight-color;
      display: block;
      margin-bottom: 5px;
    }
  }
}
</style>