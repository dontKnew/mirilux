export function baseTemplate({ title, content }) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body style="
    margin:0;
    padding:0;
    background:#f16504;
    font-family:Arial, Helvetica, sans-serif;
  ">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff;border-radius:12px;overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="
                padding:24px;
                text-align:center;
              ">
                <a href="https://miriluxe.com" target="_blank">
                  <img 
                    src="https://phpmasterr.com/miriluxe.logo"
                    alt="MiriLux"
                    width="160"
                    style="display:block;margin:0 auto;"
                  />
                </a>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:10px 30px 30px 30px;color:#171717;">
                <h2 style="margin-top:0;">${title}</h2>
                ${content}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="
                padding:20px;
                text-align:center;
                font-size:12px;
                color:#777;
                background:#fafafa;
              ">
                <p style="margin:4px 0;">
                  <a href="https://miriluxe.com" target="_blank"
                    style="color:#0a356a;text-decoration:none;">
                    www.miriluxe.com
                  </a>
                </p>

                <p style="margin:4px 0;">
                  Contact:
                  <a href="mailto:support@miriluxe.com"
                    style="color:#0a356a;text-decoration:none;">
                    support@miriluxe.com
                  </a>
                </p>

                <p style="margin:8px 0;">
                  © ${new Date().getFullYear()} MiriLux. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}
