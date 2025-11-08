package com.lingo.account.service;

import com.lingo.account.utils.Constants;
import com.lingo.common_library.exception.OtpException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Random;
import java.util.concurrent.TimeUnit;

public interface OtpService {

  String generateOtp();

  void sendOtp(String email, String OTP);

  boolean verifyOtp(String email, String OTP);

  boolean isOtpPresent(String email);
}

@Service
@Slf4j
@RequiredArgsConstructor
class OtpServiceImpl implements OtpService {

  private final RedisTemplate<String, Object> redisTemplate;

  /**
   * {@inheritDoc}
   */
  @Override
  public String generateOtp() {
    StringBuilder otp = new StringBuilder();
    Random random = new Random();
    for (int i = 0; i < Constants.Value.OTP_LENGTH; i++) {
      otp.append(random.nextInt(10));
    }
    log.info("Generated OTP: {}", otp);
    return otp.toString();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void sendOtp(String email, String OTP) {
    redisTemplate.opsForValue().set(email, OTP, Duration.ofMinutes(Constants.Value.OTP_MINUTES));
    log.info("Storing OTP {} to {} ", OTP, email);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean verifyOtp(String email, String OTP) throws OtpException {
    String otp = (String) redisTemplate.opsForValue().get(email);
    if(otp == null){
      throw new OtpException(Constants.ErrorCode.OTP_EXPIRATION);
    } else if (!otp.equals(OTP)) {
      throw new OtpException(Constants.ErrorCode.OTP_INVALID);
    } else {
      redisTemplate.delete(email);
      log.info("Deleting OTP {} from {} ", OTP, email);
      return true;
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isOtpPresent(String email) {
    return redisTemplate.hasKey(email);
  }
}
