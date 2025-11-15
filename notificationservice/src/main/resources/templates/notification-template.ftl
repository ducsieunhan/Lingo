<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-g">
    <title>${title}</title>
    <style>
        /* CSS reset cơ bản cho email */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    </style>
</head>
<body style="margin: 0 !important; padding: 0 !important; background-color: #f4f4f4;">

<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center" style="background-color: #f4f4f4;">

            <table border="0" cellpadding="0" cellspacing="0" width="600" style="width: 100%; max-width: 600px;">
                <tr>
                    <td align="center" valign="top" style="padding: 40px 20px;">
                    </td>
                </tr>
            </table>

            <table border="0" cellpadding="0" cellspacing="0" width="600" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

                <tr>
                    <td align="left" style="padding: 40px 30px 20px 30px; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; color: #333333;">
                        ${title}
                    </td>
                </tr>

                <tr>
                    <td align="left" style="padding: 0 30px 40px 30px; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #555555;">

                        <p style="margin-bottom: 25px;">
                            Xin chào <strong>${email}</strong>,
                        </p>

                        <p style="margin: 0;">
                            ${message}
                        </p>

                    </td>
                </tr>

            </table>

            <table border="0" cellpadding="0" cellspacing="0" width="600" style="width: 100%; max-width: 600px;">
                <tr>
                    <td align="center" style="padding: 30px; font-family: Arial, sans-serif; font-size: 12px; line-height: 18px; color: #999999;">
                        <p style="margin: 0;">Đây là email tự động, vui lòng không trả lời.</p>
                        <p style="margin: 5px 0 0 0;">© 2025 Tên công ty của bạn. Đã đăng ký bản quyền.</p>
                    </td>
                </tr>
            </table>

        </td>
    </tr>
</table>

</body>
</html>