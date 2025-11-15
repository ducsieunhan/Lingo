package com.lingo.notificationservice.service;

import com.lingo.notificationservice.dto.request.AccountMessage;
import com.lingo.notificationservice.dto.request.RequestMailDTO;
import com.lingo.notificationservice.utils.Constants;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class EmailService {
  @Autowired
  private JavaMailSender sender;

  @Autowired
  private Configuration config;

  @Async
  public void sendOTPCode(RequestMailDTO request) throws MessagingException {
    Map<String, Object> model = new HashMap<>();
    model.put("email", request.getTo());
    model.put("code", request.getContent());

    this.sendEmail(request.getTo(), Constants.MailContent.MAIL_WELCOME, model, "email-template.ftl");
  }
  public void sendWelcome(String email) throws MessagingException {
    log.info("Sending welcome mail to {}", email);
    Map<String, Object> model = new HashMap<>();
    model.put("email", email);
    model.put("username", email);

    this.sendEmail(email, Constants.MailContent.MAIL_WELCOME, model, "welcome-template.ftl");
  }

  /**
   * Gửi một email thông báo chung, sử dụng template 'notification-template.ftl'.
   * <p>
   * Phương thức này được thiết kế để làm một hàm gửi email linh hoạt,
   * phục vụ cho các loại thông báo nghiệp vụ cụ thể như:
   * <ul>
   * <li><b>LESSON_REMINDER:</b> Gửi email nhắc nhở lịch học sắp tới.</li>
   * <li><b>COURSE_UPDATE:</b> Gửi email thông báo khi có cập nhật
   * (ví dụ: bài giảng mới, thay đổi nội dung) trong một khóa học.</li>
   * </ul>
   * <p>
   * Phương thức này sẽ sử dụng tham số {@code title} làm tiêu đề (subject)
   * của email.
   *
   * @param email Địa chỉ email của người nhận.
   * @param title Tiêu đề (subject) của email. Đây cũng là biến
   * 'title' được sử dụng trong template .ftl.
   * @param message Nội dung chính của thông báo (biến 'message'
   * trong template .ftl).
   * @throws MessagingException Nếu có lỗi xảy ra trong quá trình gửi email.
   */
  public void sendNotification(String email, String title, String message) throws MessagingException {
    log.info("Sending notification mail to {}", email);
    Map<String, Object> model = new HashMap<>();
    model.put("email", email);
    model.put("title", title);
    model.put("message", message);

    this.sendEmail(email, title, model, "notification-template.ftl");
  }

  @Async
  public void sendEmail(String to, String subject, Map<String, Object> model, String template) throws MessagingException {
    long startTime = System.currentTimeMillis();

    MimeMessage message = sender.createMimeMessage();
    try {
      MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
              StandardCharsets.UTF_8.name());
//      helper.addAttachment("logo.png", new ClassPathResource("logo.png"));

      Template t = config.getTemplate(template);
      String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

      helper.setTo(to);
      helper.setText(html, true);
      helper.setSubject(subject);
      sender.send(message);
      log.info("Mail sent successfully to {}", to);
      log.info("Time counting: {}", System.currentTimeMillis() - startTime);

    } catch (MessagingException | IOException | TemplateException e) {
      log.info("Mail sent unsuccessfully to {}", to);
      throw new MessagingException(Constants.ErrorCode.MAIL_UNSUCCESSFUL);
    }
  }
}
