import { AppleFilled, FacebookFilled, GithubFilled, GoogleOutlined, InfoCircleFilled } from "@ant-design/icons"
import { FaInfoCircle } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"

const AuthFooter = () => {

  const location = useLocation();
  const faceAuthUrl = import.meta.env.VITE_FACEBOOK_AUTH_URL;
  const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;
  const gitAuthUrl = import.meta.env.VITE_GITHUB_AUTH_URL;
  return (
    <div>
      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-[#FFFFFF] text-gray-500" id="or-text">Hoặc đăng nhập với</span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <Link to={googleAuthUrl} class="lift-on-hover flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
          <i class="text-red-500 text-xl"><GoogleOutlined /></i>
        </Link>
        <Link to={faceAuthUrl} class="lift-on-hover flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
          <i class=" text-blue-600 text-xl"><FacebookFilled /></i>
        </Link>
        <Link to={gitAuthUrl} class="lift-on-hover flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
          <i class="fab fa-apple text-gray-800 text-xl"><GithubFilled /></i>
        </Link>
      </div>
      {
        location.pathname === "/auth/forget" ?
          <>
            <div class="mt-6 p-4 bg-blue-50 rounded-xl">
              <div class="flex items-center justify-center">
                <div class="">
                  <FaInfoCircle color="#1890ff" />
                </div>
                <div class="ml-3">
                  <p class="text-sm text-blue-800 !mb-0" >
                    Không nhận được email? Kiểm tra thư mục spam hoặc thử lại sau 5 phút.
                  </p>
                </div>
              </div>
            </div>

            <div class="text-center mt-6 space-y-3">
              <p class="text-gray-600">
                <span id="remember-text">Nhớ lại mật khẩu?</span>
                <a href="#" class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-1" id="login-link">Đăng nhập ngay</a>
              </p>
              <p class="text-gray-600">
                <span id="no-account-text">Chưa có tài khoản?</span>
                <a href="#" class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-1" id="register-link">Đăng ký miễn phí</a>
              </p>
            </div>
          </> : <></>
      }

      {
        location.pathname === "/auth/login" ?
          <div class="text-center mt-8 p-4 bg-gray-50 rounded-xl">
            <p class="text-gray-600 !mb-1">
              <span id="no-account-text">Chưa có tài khoản Lingo?</span>
            </p>
            <Link to="/auth/register" class="inline-block text-blue-600 hover:text-blue-800 font-semibold transition-colors text-lg" id="register-link">
              Đăng ký miễn phí ngay
            </Link>
            <p class="text-xs text-gray-500 !mt-2" id="register-benefits">
              Tham gia cộng đồng học tập với hàng triệu người dùng
            </p>
          </div> : <></>
      }

    </div>

  )
}
export default AuthFooter