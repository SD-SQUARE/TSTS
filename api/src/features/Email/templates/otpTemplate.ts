const otpHtmlTemplate = ({ otp, minutes }) => {
  return `
  <div style="font-family:Arial,sans-serif;max-width:520px">
    <h2 style="margin:0 0 8px">Your verification code</h2>
    <p style="margin:0 0 12px">Use this code to continue:</p>
    <div style="font-size:28px;letter-spacing:6px;font-weight:700;margin:10px 0 16px">
      ${otp}
    </div>
    <p style="color:#666;margin:0 0 4px">This code expires in ${minutes} minutes.</p>
    <p style="color:#666;margin:0">If you didn’t request this, ignore this email.</p>
    <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
    <p style="color:#999;font-size:12px">© ${new Date().getFullYear()} ticket support system - Helwan University</p>
  </div>`;
};

export { otpHtmlTemplate };
