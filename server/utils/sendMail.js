import nodemailer from 'nodemailer';

// Send Mail using nodemailer
export const sendMail = async (data) => {
  // <!-- create transport -->
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.Email_Port,
    // secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.APP_PASS
    }
  });

  // <!-- send mail -->
  await transporter.sendMail({
    from: `"DevSocial" <${process.env.USER_EMAIL}>`,
    to: data.to,
    subject: data.sub,
    html: `
  <!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!--[if mso]>
            <xml>
                <o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG /></o:OfficeDocumentSettings>
            </xml>
        <![endif]-->
        <style>
            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                padding: 0;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }

            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }

            p {
                line-height: inherit;
            }

            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }

            .image_block img + div {
                display: none;
            }

            @media (max-width: 510px) {
                .desktop_hide table.icons-inner,
                .social_block.desktop_hide .social-table {
                    display: inline-block !important;
                }

                .icons-inner {
                    text-align: center;
                }

                .icons-inner td {
                    margin: 0 auto;
                }

                .image_block img.fullWidth {
                    max-width: 100% !important;
                }

                .mobile_hide {
                    display: none;
                }

                .row-content {
                    width: 100% !important;
                }

                .stack .column {
                    width: 100%;
                    display: block;
                }

                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }

                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }
            }
        </style>
    </head>

    <body style="margin: 0; background-color: #030512; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #030512;">
            <tbody>
                <tr>
                    <td>
                        <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table
                                            class="row-content stack"
                                            align="center"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #030512; background-position: center top; color: #000; width: 490px; margin: 0 auto;"
                                            width="490"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td
                                                        class="column column-1"
                                                        width="100%"
                                                        style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                    >
                                                        <div class="spacer_block block-1" style="height: 30px; line-height: 30px; font-size: 1px;">&#8202;</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table
                                            class="row-content stack"
                                            align="center"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #030512; color: #000; width: 490px; margin: 0 auto;"
                                            width="490"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td
                                                        class="column column-1"
                                                        width="100%"
                                                        style="
                                                            font-weight: 400;
                                                            text-align: left;
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            padding-bottom: 5px;
                                                            padding-top: 5px;
                                                            vertical-align: top;
                                                            border-top: 0px;
                                                            border-right: 0px;
                                                            border-bottom: 0px;
                                                            border-left: 0px;
                                                        "
                                                    >
                                                        <div class="spacer_block block-1" style="height: 40px; line-height: 40px; font-size: 1px;">&#8202;</div>
                                                        <!--[if mso]>
                                                            <style>
                                                                #list-r1c0m1 ul {
                                                                    margin: 0 !important;
                                                                    padding: 0 !important;
                                                                }
                                                                #list-r1c0m1 ul li {
                                                                    mso-special-format: bullet;
                                                                }
                                                                #list-r1c0m1 .levelOne li {
                                                                    margin-top: 0 !important;
                                                                }
                                                                #list-r1c0m1 .levelOne {
                                                                    margin-left: -20px !important;
                                                                }
                                                            </style>
                                                        <![endif]-->
                                                        <table
                                                            class="list_block block-2"
                                                            id="list-r1c0m1"
                                                            width="100%"
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                        >
                                                            <tr>
                                                                <td class="pad" style="padding-bottom: 10px; padding-left: 10px; padding-right: 15px; padding-top: 10px;">
                                                                    <div class="levelOne" style="margin-left: 0;">
                                                                        <ul
                                                                            class="leftList"
                                                                            start="1"
                                                                            style="
                                                                                margin-top: 0;
                                                                                margin-bottom: 0;
                                                                                padding: 0;
                                                                                padding-left: 20px;
                                                                                font-weight: 400;
                                                                                text-align: left;
                                                                                color: #101112;
                                                                                direction: ltr;
                                                                                font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;
                                                                                font-size: 16px;
                                                                                letter-spacing: 0;
                                                                                line-height: 120%;
                                                                                mso-line-height-alt: 19.2px;
                                                                                list-style-type: disc;
                                                                            "
                                                                        >
                                                                            <li style="margin-bottom: 0; text-align: left;"><span style="color: #ffffff;">Hi ${data?.name},</span></li>
                                                                            <li style="margin-bottom: 0; text-align: left;">&nbsp;</li>
                                                                            <li style="margin-bottom: 0; text-align: left;">
                                                                                <span style="color: #ffffff;"><span style="color: #ffffff;">${data?.msg}</span></span><span style="color: #ffffff;"><span style="color: #ffffff;"></span></span>
                                                                            </li>
                                                                          
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="button_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div class="alignment" align="center">
                                                                        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:117px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#7747FF"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
                                                                        <div
                                                                            style="
                                                                                text-decoration: none;
                                                                                display: inline-block;
                                                                                color: #ffffff;
                                                                                background-color: #7747ff;
                                                                                border-radius: 4px;
                                                                                width: auto;
                                                                                border-top: 0px solid transparent;
                                                                                font-weight: 400;
                                                                                border-right: 0px solid transparent;
                                                                                border-bottom: 0px solid transparent;
                                                                                border-left: 0px solid transparent;
                                                                                padding-top: 5px;
                                                                                padding-bottom: 5px;
                                                                                font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;
                                                                                font-size: 16px;
                                                                                text-align: center;
                                                                                mso-border-alt: none;
                                                                                word-break: keep-all;
                                                                            "
                                                                        >
                                                                            <a href=${data.link} style="padding-left: 20px;color: white; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
                                                                                <span style="word-break: break-word; color:white; line-height: 32px;">Verify Now</span>
                                                                            </a>
                                                                        </div>
                                                                        <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="heading_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <h3
                                                                        style="
                                                                            margin: 0;
                                                                            color: #7747ff;
                                                                            direction: ltr;
                                                                            font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;
                                                                            font-size: 24px;
                                                                            font-weight: 700;
                                                                            letter-spacing: normal;
                                                                            line-height: 120%;
                                                                            text-align: left;
                                                                            margin-top: 0;
                                                                            margin-bottom: 0;
                                                                        "
                                                                    >
                                                                        <span class="tinyMce-placeholder"></span>
                                                                    </h3>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="image_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="width: 100%; padding-right: 0px; padding-left: 0px;">
                                                                    <div class="alignment" align="center" style="line-height: 10px;">
                                                                        <img
                                                                            class="fullWidth"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1461/vgd_divider2.png"
                                                                            style="display: block; height: auto; border: 0; max-width: 367.5px; width: 100%;"
                                                                            width="367.5"
                                                                            alt="Alternate text"
                                                                            title="Alternate text"
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="heading_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <h3
                                                                        style="
                                                                            margin: 0;
                                                                            color: #7747ff;
                                                                            direction: ltr;
                                                                            font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;
                                                                            font-size: 24px;
                                                                            font-weight: 700;
                                                                            letter-spacing: normal;
                                                                            line-height: 120%;
                                                                            text-align: left;
                                                                            margin-top: 0;
                                                                            margin-bottom: 0;
                                                                        "
                                                                    >
                                                                        <span class="tinyMce-placeholder"></span>
                                                                    </h3>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="image_block block-7" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div class="alignment" align="center" style="line-height: 10px;">
                                                                        <img
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1461/vgd_followus.png"
                                                                            style="display: block; height: auto; border: 0; max-width: 98px; width: 100%;"
                                                                            width="98"
                                                                            alt="Alternate text"
                                                                            title="Alternate text"
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="divider_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div class="alignment" align="center">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span>&#8202;</span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-9" style="height: 25px; line-height: 25px; font-size: 1px;">&#8202;</div>
                                                        <table class="social_block block-10" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="text-align: center; padding-right: 0px; padding-left: 0px;">
                                                                    <div class="alignment" align="center">
                                                                        <table
                                                                            class="social-table"
                                                                            width="168px"
                                                                            border="0"
                                                                            cellpadding="0"
                                                                            cellspacing="0"
                                                                            role="presentation"
                                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;"
                                                                        >
                                                                            <tr>
                                                                                <td style="padding: 0 5px 0 5px;">
                                                                                    <a href="https://www.facebook.com/sunhailshajib1/" target="_blank">
                                                                                        <img
                                                                                            src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/facebook@2x.png"
                                                                                            width="32"
                                                                                            height="32"
                                                                                            alt="Facebook"
                                                                                            title="Facebook"
                                                                                            style="display: block; height: auto; border: 0;"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                <td style="padding: 0 5px 0 5px;">
                                                                                    <a href="https://www.linkedin.com/in/developer-shajib/" target="_blank">
                                                                                        <img
                                                                                            src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/linkedin@2x.png"
                                                                                            width="32"
                                                                                            height="32"
                                                                                            alt="LinkedIn"
                                                                                            title="LinkedIn"
                                                                                            style="display: block; height: auto; border: 0;"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                <td style="padding: 0 5px 0 5px;">
                                                                                    <a href="https://developershajib.vercel.app/" target="_blank">
                                                                                        <img
                                                                                            src="https://app-rsrc.getbee.io/public/resources/placeholders/custom-icon-placeholder.png"
                                                                                            width="32"
                                                                                            height="32"
                                                                                            alt="developershajib-portfolio"
                                                                                            title="Portfolio"
                                                                                            style="display: block; height: auto; border: 0;"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                <td style="padding: 0 5px 0 5px;">
                                                                                    <a href="mailto:sunhailshajib1@gmail.com" target="_blank">
                                                                                        <img
                                                                                            src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/mail@2x.png"
                                                                                            width="32"
                                                                                            height="32"
                                                                                            alt="E-Mail"
                                                                                            title="E-Mail"
                                                                                            style="display: block; height: auto; border: 0;"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-11" style="height: 25px; line-height: 25px; font-size: 1px;">&#8202;</div>
                                                        <table
                                                            class="paragraph_block block-12"
                                                            width="100%"
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                        >
                                                            <tr>
                                                                <td class="pad" style="padding-bottom: 10px; padding-left: 20px; padding-right: 20px;">
                                                                    <div
                                                                        style="
                                                                            color: #b6b6b6;
                                                                            font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;
                                                                            font-size: 16px;
                                                                            line-height: 120%;
                                                                            text-align: center;
                                                                            mso-line-height-alt: 19.2px;
                                                                        "
                                                                    >
                                                                        <p style="margin: 0;">I am a MERN Stack developer. If you are interested in here me, you can contact me.</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table
                                                            class="paragraph_block block-13"
                                                            width="100%"
                                                            border="0"
                                                            cellpadding="10"
                                                            cellspacing="0"
                                                            role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                        >
                                                            <tr>
                                                                <td class="pad">
                                                                    <div
                                                                        style="
                                                                            color: #c0c0c0;
                                                                            font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;
                                                                            font-size: 14px;
                                                                            line-height: 120%;
                                                                            text-align: center;
                                                                            mso-line-height-alt: 16.8px;
                                                                        "
                                                                    >
                                                                        <p style="margin: 0; word-break: break-word;"><span style="color: #ffffff;">© Copyright-2023</span></p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- End -->
    </body>
</html>

    `
  });
};
